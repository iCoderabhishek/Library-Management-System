const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');

const registerAdmin = async (req, res) => {
  const { instituteName, name, phoneNumber, email, password, confirmPassword } = req.body;

  // Validate inputs
  if (!instituteName || !name || !phoneNumber || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the admin
    const newAdmin = new Admin({
      instituteName,
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerAdmin };
