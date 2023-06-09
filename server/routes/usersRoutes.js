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
router.post('/resetUserPassword', userControllers.userResetPassword);
router.post('/changeCompanyName', userControllers.userChangeCompanyName);
router.post('/changeCompanyBio', userControllers.userChangeCompanyBio);
router.post('/toggleCompanyPrivacy', userControllers.toggleCompanyPrivacy);
router.post('/moduleCompleted', userControllers.userModuleCompleted);
router.post('/moduleBadgeEarned', userControllers.userModuleBadgeEarned);
router.post('/namedBadgeEarned', userControllers.namedBadgeEarned);
router.post('/deleteUser', userControllers.deleteUser);
router.post('/moduleActivity', userControllers.moduleActivity);
router.post('/resetUserStats', userControllers.resetUserStats);
router.get('/recentActivity', userControllers.getRecentActivity);
router.get('/highScores', userControllers.getHighScores);
router.get('/notifications', userControllers.getNotifications);
router.post('/readNotifications', userControllers.readNotifications);


module.exports = router