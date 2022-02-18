const express = require('express');
const userControllers = require('../controllers/usersController');
const router = express.Router();

router.post('/register', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.get('/login', userControllers.userLoginSession);
router.post('/logout', userControllers.userLogout)

module.exports = router