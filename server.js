const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();   

// middleware
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// DB connect
const connectDB = require("./database/db");
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});