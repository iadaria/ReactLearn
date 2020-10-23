const express = require('express');
const Transaction = require('../models/Transaction');
const {
    getTransactions } = require('../controllers/transaction');
const advancedResults = require('../middleware/advancedResults') ;

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
    .get(protect, advancedResults(Transaction), getTransactions);

module.exports = router;