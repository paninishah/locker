import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * POST /api/admin/signup
 * (you can ignore UI for now)
 */
router.post("/signup", async (req, res) => {
  try {
    const { committee, email, password } = req.body;

    console.log("SIGNUP BODY:", req.body);

    if (!committee || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const adminExists = await Admin.findOne({
      $or: [{ email }, { committee }],
    });

    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({
      committee,
      email,
      password,
    });

    res.status(201).json({
      _id: admin._id,
      committee: admin.committee,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});


/**
 * POST /api/admin/login
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        committee: admin.committee,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
