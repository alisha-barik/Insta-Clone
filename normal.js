authController.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import otpStore from "../models/utils/otpStore.js";

// ============================
// Nodemailer Transporter
// ============================
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};



// ============================
// Send Signup Mails
// ============================
const sendSignupMails = async (name, email) => {
  try {
    const transporter = createTransporter();

    const userMailOptions = {
      from: process.env.EMAIL_USER,  // OTP jaisa hi rakho
      to: email,
      subject: "Welcome to Bean Scene ☕",
      text: `
Hello ${name},

Welcome to Bean Scene Coffee!  
Your account has been created successfully.  

Enjoy browsing our coffees and placing orders anytime!  

Warm Regards,  
Bean Scene Team ☕
      `,
    };

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New User Signup Alert 📢",
      text: `
📢 New User Registered!

👤 Name: ${name}  
📧 Email: ${email}  

Check the admin dashboard for more details.
      `,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    console.log("✅ Signup mails sent successfully!");
  } catch (err) {
    console.error("❌ Signup mail error:", err);
  }
};


// ============================
// Controller: Send OTP
// ============================
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Generate OTP (6 digit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in memory (5 min expiry)
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    const transporter = createTransporter();
    const mailOptions = {
      from: `"Bean Scene Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Bean Scene Signup",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP Send Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};


// ============================
// Controller: Verify OTP
// ============================
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore[email];

    if (!record) return res.status(400).json({ message: "OTP not found" });
    if (record.expiresAt < Date.now())
      return res.status(400).json({ message: "OTP expired" });
    if (record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    delete otpStore[email]; // OTP used, remove
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verify Error:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};


// ============================
// Controller: Signup
// ============================
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign role
    const role = email === process.env.ADMIN_EMAIL ? "admin" : "customer";

    // Create user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    // Generate token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // Send mails (await important hai yaha)
    await sendSignupMails(name, email);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Failed to signup" });
  }
};




// ============================
// Controller: Login
// ============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT (3 days expiry)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Failed to login" });
  }
};