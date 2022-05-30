const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const limitRate = require ('../middleware/limit-rate');


router.post('/signup', limitRate, userCtrl.signup);
router.post('/login', limitRate, userCtrl.login);

module.exports = router;

