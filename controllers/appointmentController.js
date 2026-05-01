const Appointment = require("../models/Appointment");

// ✅ CREATE APPOINTMENT
const createAppointment = async (req, res) => {
  try {
    console.log("📦 Appointment Data:", req.body);

    const { name, email, phone, age, gender, address, doctor, date, time, problem } = req.body;

    // validation
    if (!name || !email || !phone || !age || !gender || !address || !doctor || !date || !time) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ✅ CORRECT: use req.body values
    const appointment = await Appointment.create({
      name,
      email,
      phone,
      age,
      gender,
      address,
      doctor,
      date,
      time,
      problem
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET ALL
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ DELETE
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createAppointment, getAppointments, deleteAppointment };