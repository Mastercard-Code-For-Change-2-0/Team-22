const Receiver = require("../models/Receiver");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register Receiver
exports.registerReceiver = async (req, res) => {
  try {
    const { name, phone, email, password, address } = req.body;

    // Check if receiver already exists (by email or phone)
    const existingReceiver = await Receiver.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingReceiver) {
      const field = existingReceiver.email === email ? "email" : "phone";
      return res.status(400).json({
        error: `Receiver with this ${field} already exists`,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new receiver
    const newReceiver = new Receiver({
      name,
      phone,
      email,
      password: hashedPassword,
      address: {
        street: address?.street || "",
        city: address?.city || "",
        state: address?.state || "",
        pincode: address?.pincode || "",
      },
    });

    await newReceiver.save();

    res.json({
      success: true,
      message: "Receiver registered successfully.",
      receiverId: newReceiver._id,
    });
  } catch (err) {
    console.error("Receiver registration error:", err);

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        error: `Receiver with this ${field} already exists`,
      });
    }

    res.status(500).json({ error: "Registration failed" });
  }
};

// Login Receiver
exports.loginReceiver = async (req, res) => {
  try {
    const { email, password } = req.body;

    const receiver = await Receiver.findOne({ email });
    if (!receiver) {
      return res.status(400).json({ message: "Receiver not found" });
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, receiver.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: receiver._id }, "pranav@123", { expiresIn: "24h" });

    res.json({
      success: true,
      token,
      receiver: {
        id: receiver._id,
        name: receiver.name,
        email: receiver.email,
        phone: receiver.phone,
        address: receiver.address,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
