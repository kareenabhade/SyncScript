const mongoose = require("mongoose");

 const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kareenabhade16:kareena00@cluster0.lhg2h.mongodb.net/", 
      {
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
  }
};


module.exports = connectDB;
