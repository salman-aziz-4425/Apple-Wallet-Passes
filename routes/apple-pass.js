const express = require('express');
const passController = require('../controllers/apple-pass');

const router = express.Router();

router.post('/generatePass', passController.generatePass);
router.put('/updatePass', passController.updatePass);
module.exports = router;