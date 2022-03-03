const express = require('express');
const userControllers = require('../controllers/usersController');
const router = express.Router();

router.post('/register', userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.get('/login', userControllers.userLoginSession);
router.post('/logout', userControllers.userLogout);
router.post('/settings', userControllers.userUpdate);
router.post('/quizResults', userControllers.userSetPoints);

module.exports = router