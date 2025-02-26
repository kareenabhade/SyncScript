const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
    },
  ],
  sharedCode: {
    content: {
      type: String,
      default: "", 
    },
    language: {
      type: String,
      default: "javascript", 
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
