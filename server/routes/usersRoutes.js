const express = require('express');
const userControllers = require('../controllers/usersController');
const router = express.Router();

/**
* Handles HTTP requests relating to user data/sessions by forwarding them to 
* their respective user controllers.
*/

router.post('/register', userControllers.userRegister);
router.post('/registerEmpty', userControllers.userRegisterEmpty);
router.post('/registerCompanyAdmin', userControllers.userRegisterCompanyAdmin);
router.post('/login', userControllers.userLogin);
router.get('/login', userControllers.userLoginSession);
router.post('/logout', userControllers.userLogout);
router.post('/settings', userControllers.userUpdate);
router.post('/quiz', userControllers.userPoints);
router.post('/moduleCompleted', userControllers.userModuleCompleted);


module.exports = router