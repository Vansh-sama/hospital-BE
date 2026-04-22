const Appointment = require("../models/Appointment");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const totalUsers = await User.countDocuments();

    res.json({
      totalAppointments,
      totalUsers,
      totalDoctors: 6 // static (frontend wale doctors)
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardStats };