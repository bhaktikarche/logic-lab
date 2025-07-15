const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (result.length) return res.status(409).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const insertSql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(insertSql, [username, email, hashed], (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ msg: "User registered" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, data) => {
    if (err || !data.length) return res.status(401).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, data[0].password);
    if (!isMatch) return res.status(401).json({ msg: "Incorrect password" });

    const token = jwt.sign({ id: data[0].id, email: data[0].email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: data[0].id, username: data[0].username, email: data[0].email } });
  });
};
