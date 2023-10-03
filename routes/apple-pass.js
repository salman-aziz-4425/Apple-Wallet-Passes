const express = require('express');
const passController = require('../controllers/apple-pass');

const router = express.Router();

router.post('/generatePass', passController.generatePass);

module.exports = router;