const Appointment = require("../models/Appointment");

// ✅ CREATE APPOINTMENT
const createAppointment = async (req, res) => {
  try {
    console.log("📦 Appointment Data:", req.body);

    const { name, email, phone, doctor, date, time, problem } = req.body;

    if (!name || !email || !phone || !doctor || !date || !time) {
      return res.status(400).json({ message: "All fields required" });
    }

    const appointment = await Appointment.create({
      name,
      email,
      phone,
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
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

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