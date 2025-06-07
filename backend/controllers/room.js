const Room = require("../models/room");
const User = require("../models/user");

const createRoom = async (req, res) => {
  const { roomName, adminId, roomId } = req.body;
  console.log("roomName",roomName ,"adminId",adminId) 
  try {
    // Check for required fields
    if (!roomName || !adminId || !roomId) {
      return res.status(400).json({ message: "Room Name and Admin ID are required." });
    }

    // Validate admin user
    const admin = await User.findById(adminId);

    const existingRoom = await Room.findOne({ roomId });

    if (existingRoom) {
      return res.status(400).json({ message: "Room ID already exists" });
    }

    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Ensure user is an admin
    if (admin.role !== "admin") {
      admin.role = "admin";
      await admin.save(); // Ensure role is updated in DB
    }

    // Create a new room with admin as the first user
    const room = new Room({
      roomId,
      roomName,
      users: [adminId], // Only store the ObjectId
      sharedCode: { content: "", language: "javascript" },
    });

    await room.save();

    const populatedRoom = await Room.findById(room._id).populate('users', 'name email picture');

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room: populatedRoom,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({
      success: false,
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
      return res.status(200).json({
        success:true,
        message: "User is already in the room" 
      });
    }

    // Add user to room
    room.users.push(userId);
    await room.save();

    const populatedRoom = await Room.findById(room._id).populate('users', 'name email picture');
    res.status(200).json({
      success: true,
      message: "User joined the room successfully",
      room: populatedRoom,
    });
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({
      success: false,
      message: "Failed to join room",
      error: error.message,
    });
  }
}

module.exports = { createRoom, joinRoom }