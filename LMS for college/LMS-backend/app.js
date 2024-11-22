const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser'); // import lib

// Import Controllers
const { getBooks, addBook } = require('./controllers/bookController');
const { getMembers, addMember } = require('./controllers/memberController');
const { getTransactions, addTransaction } = require('./controllers/transactionController');
const { registerUser, loginUser } = require('./controllers/authController'); // Authentication controllers

// Import Middleware
const protect = require('./middleware/authMiddleware'); // Authentication middleware

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/books', getBooks);       // Fetch all books
app.post('/api/books', protect, addBook); // Add a new book (protected)

app.get('/api/members', getMembers);   // Fetch all members
app.post('/api/members', addMember);   // Add a new member

app.get('/api/transactions', getTransactions);  // Fetch all transactions
app.post('/api/transactions', addTransaction); // Add a new transaction

// Authentication Routes
app.post('/api/auth/register', registerUser);  // Register new user (Member)
app.post('/api/auth/login', loginUser);        // Login user (Generate token)

// Example of a protected route (requires token)
app.get('/api/protected', protect, (req, res) => {
  res.send('This is a protected route');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend connected @${PORT} port`);
});
