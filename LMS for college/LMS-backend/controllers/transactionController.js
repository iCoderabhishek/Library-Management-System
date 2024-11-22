const Transaction = require('../models/transactionModel');

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new transaction
exports.addTransaction = async (req, res) => {
  const { memberId, bookId, borrowDate, returnDate } = req.body;

  const newTransaction = new Transaction({ memberId, bookId, borrowDate, returnDate });

  try {
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
