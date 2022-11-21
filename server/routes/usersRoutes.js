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
router.post('/changeUserName', userControllers.userChangeUsername);
router.post('/changeUserPassword', userControllers.userChangePassword);
router.post('/moduleCompleted', userControllers.userModuleCompleted);
router.post('/badgeEarned', userControllers.userBadgeEarned);
router.post('/deleteUser', userControllers.deleteUser);
router.post('/assignModulesToCompany', userControllers.assignModulesToCompany);
router.post('/removeModuleFromCompany', userControllers.removeModuleFromCompany);
router.post('/moduleActivity', userControllers.moduleActivity);
router.post('/resetUserStats', userControllers.resetUserStats);
router.post('/updateCompanyModuleDueDate', userControllers.updateCompanyModuleDueDate);

module.exports = router