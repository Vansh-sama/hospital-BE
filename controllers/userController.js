const User = require("../models/User");

// ✅ REGISTER
const registerUser = async (req, res) => {
  try {
    console.log("👉 REGISTER API HIT");
    console.log("📦 Request Body:", req.body);

    const { name, email, password } = req.body;

    // check missing fields
    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "All fields required" });
    }

    console.log("🔍 Checking if user exists...");

    const userExist = await User.findOne({ email });
    console.log("👤 Existing User:", userExist);

    if (userExist) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("📝 Creating new user...");

    const user = await User.create({ name, email, password });

    console.log("✅ User Created:", user);

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.log("🔥 REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error", error });
  }
};




// 🔐 LOGIN
const loginUser = async (req, res) => {
  try {
    console.log("👉 LOGIN API HIT");
    console.log("📦 Request Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing login fields");
      return res.status(400).json({ message: "All fields required" });
    }

    console.log("🔍 Finding user...");

    const user = await User.findOne({ email });
    console.log("👤 User Found:", user);

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "User not found" });
    }

    console.log("🔐 Checking password...");

    if (user.password !== password) {
      console.log("❌ Invalid password");
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("✅ Login success");

    res.json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role 
      }
    });

  } catch (error) {
    console.log("🔥 LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };