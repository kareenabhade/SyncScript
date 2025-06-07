const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const userPath = require("./routes/user");
const roomPath = require("./routes/room");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Room = require("./models/room");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
connectDB();
// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// HTTP Server for Socket.IO
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: ["GET", "POST"], // Specify allowed methods
  },
});

// Socket.IO Connection Event
// Socket.IO Events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle room joining
 socket.on('join-room', async ({ roomId, userId }) => {
  try {
    const room = await Room.findOne({ roomId }).populate('users', 'name email picture');
    if (room) {
      socket.join(roomId);
      
      // Emit to all clients in the room
      io.to(roomId).emit('user-joined', {
        message: 'New user joined the room',
        room: room
      });
    }
  } catch (error) {
    console.error('Error joining room:', error);
    socket.emit('error', { message: 'Failed to join room' });
  }
});

  socket.on('leave-room', async ({ roomId, userId }) => {
  try {
    // Remove user from room in database
    const room = await Room.findOneAndUpdate(
      { roomId },
      { $pull: { users: userId } },
      { new: true }
    ).populate('users', 'name email picture');

    console.log("room ", room)

    if (room) {
      socket.leave(roomId);
      // Notify others in the room
      io.to(roomId).emit('user-left', {
        message: 'A user left the room',
        room: room
      });
    }
  } catch (error) {
    console.error('Error handling user leave:', error);
  }
  });
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

});

// Test Route
app.get("/", (req, res) => {
  res.send({ message: "Hello from server!" });
});

// API Routes
app.use("/api/user", userPath);
app.use("/api/room", roomPath);

// Start Servers
const API_PORT = 7000;
const SOCKET_PORT = 5000;

// Start Express (API) Server
app.listen(API_PORT, () => {
  console.log(`API Server is running at port ${API_PORT}`);
});

// Start Socket.IO Server
httpServer.listen(SOCKET_PORT, () => {
  console.log(`Socket.IO Server is running at port ${SOCKET_PORT}`);
});
