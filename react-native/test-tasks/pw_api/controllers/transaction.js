const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

// List of logged uer transactions
// @desc    Get all bootcamps
// @route   GET /api/protected/transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res, next) => {
    const { success, count, data } = res.advancedResults;
    const result = {
        success,
        count,
        data: {
            trans_token: data.map(({ _id, recipient, amount, balance, createdAt }) => ({
                id: _id,
                date: createdAt,
                username: recipient,
                amount,
                balance
            }))
        }
    }
    res.status(200).json(result);
});

exports.createTransaction = asyncHandler(async (req, res, next) => {
    const { name, amount } = req.body;
    
    // Check for user
    const recipient = await User.findOne({ username: name }).select('+password');

    if(!recipient) {
        return next(new ErrorResponse('User not found', 400));
    }

    if(recipient.balance < amount) {
        return next(new ErrorResponse('Balance exceeded', 400));
    }

    const transaction = await Transaction.create({
        sender: req.user,
        recipient:  recipient,
        amount
    });
    await transaction.save();

    res.status(200).json({
        success: true,
        data: {
            trans_token: {
                id: transaction._id,
                date: transaction.createdAt,
                username: recipient.username,
                amount: transaction.amount,
                balance: transaction.balance
            }
        }
    });

});