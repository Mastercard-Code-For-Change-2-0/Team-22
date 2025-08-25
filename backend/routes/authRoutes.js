const express = require('express');
const router = express.Router();
const { registerReceiver , verifyEmailReceiver , loginReceiver} = require('../controllers/authController');

router.post('/register', registerReceiver);
router.post('/login', loginReceiver);



module.exports = router;
