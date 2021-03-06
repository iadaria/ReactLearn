const express = require('express');

const {
    sendMessage } = require('../controllers/messages');

const router = express.Router();

router.route('/sendMessage')
    .post(sendMessage);

module.exports = router;