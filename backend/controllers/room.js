const Room = require("../models/room");
const User = require("../models/user");

const createRoom1 = async(req,res)=>{
    const { roomId, users, sharedCode, adminId } = req.body;

  try {
    // Validate admin user
    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Only admins can create a room" });
    }

    // Validate if roomId already exists
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ message: "Room ID already exists" });
    }

    // Create a new room
    const room = new Room({
      roomId,
      users, // Array of user IDs
      sharedCode: sharedCode || { content: "", language: "javascript" },
    });

    await room.save();
    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({
      message: "Failed to create room",
      error: error.message,
    });
  }
}

const createRoom = async (req, res) => {
  const { roomId, adminId } = req.body;

  try {
    // Check for required fields
    if (!roomId || !adminId) {
      return res.status(400).json({ message: "Room ID and Admin ID are required." });
    }

    // Validate admin user
    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Ensure user is an admin
    if (admin.role !== "admin") {
      admin.role = "admin";
      await admin.save(); // Ensure role is updated in DB
    }

    // Check if roomId already exists
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ message: "Room ID already exists." });
    }

    // Create a new room with admin as the first user
    const room = new Room({
      roomId,
      users: [adminId], // Only store the ObjectId
      sharedCode: { content: "", language: "javascript" },
    });

    await room.save();

    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({
      message: "Failed to create room",
      error: error.message,
    });
  }
};



const joinRoom = async (req, res) => {
  const { roomId, userId } = req.body;

  try {
    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate room
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if user is already in the room
    if (room.users.includes(userId)) {
      return res.status(400).json({ message: "User is already in the room" });
    }

    // Add user to room
    room.users.push(userId);
    await room.save();

    res.status(200).json({
      message: "User joined the room successfully",
      room,
    });
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({
      message: "Failed to join room",
      error: error.message,
    });
  }
}

module.exports = { createRoom, joinRoom }