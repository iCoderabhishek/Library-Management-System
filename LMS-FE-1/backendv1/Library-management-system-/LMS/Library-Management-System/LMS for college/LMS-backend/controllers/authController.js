const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Assuming you have a User model
const Admin = require('../models/adminModel'); // Import the Admin model

// Register a new user (for normal users)
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: 'User created' });
};

// Register a new admin
const registerAdmin = async (req, res) => {
  const { instituteName, name, phoneNumber, email, password, confirmPassword } = req.body;

  // Validate passwords
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Check if the admin already exists
  const adminExists = await Admin.findOne({ $or: [{ email }, { phoneNumber }] });
  if (adminExists) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
    instituteName,
    name,
    phoneNumber,
    email,
    password: hashedPassword,
    role: 'admin', // Set the role explicitly
  });

  await newAdmin.save();
  res.status(201).json({ message: 'Admin created' });
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Issue a token
  const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
};

// Login an admin
const adminLogin = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    // Find admin by email or phone number
    const admin = await Admin.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token for admin
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: 'Admin login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { registerUser, loginUser, registerAdmin, adminLogin };
