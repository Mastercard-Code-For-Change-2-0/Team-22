const Donor = require("../models/Donor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register Donor
exports.registerDonor = async (req, res) => {
  try {
    const { name, phone, email, password, address } = req.body;

    // Check if donor already exists (by email or phone)
    const existingDonor = await Donor.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingDonor) {
      const field = existingDonor.email === email ? "email" : "phone";
      return res.status(400).json({
        error: `Donor with this ${field} already exists`,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new donor
    const newDonor = new Donor({
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

    await newDonor.save();

    res.json({
      success: true,
      message: "Donor registered successfully.",
      donorId: newDonor._id,
    });
  } catch (err) {
    console.error("Donor registration error:", err);

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        error: `Donor with this ${field} already exists`,
      });
    }

    res.status(500).json({ error: "Registration failed" });
  }
};

// Login Donor
exports.loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(400).json({ message: "Donor not found" });
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: donor._id }, "pranav@123", { expiresIn: "24h" });

    res.json({
      success: true,
      token,
      donor: {
        id: donor._id,
        name: donor.name,
        email: donor.email,
        phone: donor.phone,
        address: donor.address,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
