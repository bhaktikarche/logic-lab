import db from "../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUsers.length) {
      return res.status(409).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ 
      msg: "User registered successfully",
      userId: result.insertId 
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!users.length) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};