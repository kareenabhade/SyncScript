
const mongoose = require("mongoose")
const Room = require("../models/room");
const User = require("../models/user");

const createUser = async(req, res)=>{
 try {
    const { name, email, picture } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !picture) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and picture are required fields",
      });
    }

    // Check if the user already exists based on email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
        user: existingUser,
      });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      picture,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error in /api/user/create:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }

}


const getAllUsers = async (req, res) => {
  try {
    const { roomId } = req.params;
    console.log("Room ID received:", roomId);

    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required." });
    }

    // Use findOne to get the first room matching the roomId
    const room = await Room.findOne({ roomId: roomId }).populate('users');

    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    res.status(200).json({ users: room.users });
  } catch (error) {
    console.error("Error fetching users:", error.stack);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};



module.exports = {createUser, getAllUsers}