
const mongoose = require("mongoose")
const Room = require("../models/room");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = async(req, res)=>{
 try {
    const { name, email, picture, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !picture || !password) {
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

    // Hash the password
    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      picture,
      password:hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Respond with success
    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email ", email, "password ", password)

    // Check if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required fields",
      });
    } 

    // Find the user by email
    let user = await User.findOne({ email }); 

    if (!user) {
      // If the user doesn't exist, create a new user
      res.status(400).json({
      success: false,
      message: "User not registered",
    });
    } 

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Update the user's token
    user.token = token;

    // Respond with success
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in /api/user/login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

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



module.exports = {createUser, getAllUsers, loginUser}