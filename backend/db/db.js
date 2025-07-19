// backend/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/portfolioDB'); // no options needed
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
