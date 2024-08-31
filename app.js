const express = require("express");
const connectDB = require("./config/database");
const eventRoutes = require("./routes/eventRoutes");
const morgan = require("morgan");

const app = express();
connectDB();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", eventRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
