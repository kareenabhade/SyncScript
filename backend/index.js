const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const userPath = require("./routes/user");
const roomPath = require("./routes/room");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Room = require("./models/room");

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
// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   // Listen for events
//   socket.on('create-room', ({ roomId, adminName }) => {
//     socket.join(roomId);
//     console.log(`Room created: ${roomId} by ${adminName}`);
//     io.to(roomId).emit('room-created', { roomId });
//   });

//   socket.on('join-room', ({ roomId, userName }) => {
//     const room = io.sockets.adapter.rooms.get(roomId);
//     if (room) {
//       socket.join(roomId);
//       io.to(roomId).emit('user-joined', { userName });
//       console.log(`${userName} joined room: ${roomId}`);
//     } else {
//       socket.emit('error', { message: 'Room does not exist.' });
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });

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
