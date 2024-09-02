const { process_params } = require("express/lib/router");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
