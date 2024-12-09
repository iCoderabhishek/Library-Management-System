const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the admin controller
const { registerAdmin } = require('./controllers/adminController');




// Import Controllers
const { getBooks, addBook } = require('./controllers/bookController');
const { getMembers, addMember } = require('./controllers/memberController');
const { getTransactions, addTransaction } = require('./controllers/transactionController');
const { registerUser, loginUser } = require('./controllers/authController');

// Import Middleware
const protect = require('./middleware/authMiddleware');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/books', getBooks); // Fetch all books
app.post('/api/books', protect, addBook); // Add a new book (protected)

app.get('/api/members', getMembers); // Fetch all members
app.post('/api/members', addMember); // Add a new member

app.get('/api/transactions', getTransactions); // Fetch all transactions
app.post('/api/transactions', addTransaction); // Add a new transaction

// Authentication Routes
app.post('/api/auth/register', registerUser); // Register new user (Member)
app.post('/api/auth/login', loginUser); // Login user (Generate token)

// Admin Registration Route
app.post('/api/admin/register', registerAdmin);

// Admin Login Route
app.post('/api/admin/login', adminLogin); // Route for admin login


// Example of a protected route (requires token)
app.get('/api/protected', protect, (req, res) => {
  res.send('This is a protected route');
});

// Fallback Route (for 404s)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000; // Ensure this port matches the frontend API calls
app.listen(5000, () => {
  console.log(`Backend connected @ port ${PORT}`);
});
