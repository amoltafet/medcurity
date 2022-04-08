const express = require('express');
const queryControllers = require('../controllers/queryController');
const router = express.Router();

const BannerUploader = require('../fileUploaders/bannerUploader')
const ProfileUploader = require('../fileUploaders/profileUploader')
const bannerUploader = new BannerUploader()
const profileUploader = new ProfileUploader()

/**
* Handles HTTP requests relating to database queries by forwarding them to 
* their respective query controllers.
*/

router.get('/getQuery', queryControllers.getQuery);
router.get('/getModuleInfo', queryControllers.queryModuleInfo);
router.post('/postModuleBanner', bannerUploader.upload.single('bannerImage'), queryControllers.queryUploadBanner);
router.post('/postProfilePicture', profileUploader.upload.single('profileImage'), queryControllers.queryUploadProfile);
router.get('/getModuleBanner', queryControllers.queryModuleBanner);
router.get('/getProfilePicture', queryControllers.queryProfilePicture);
router.get('/getModuleQuestions', queryControllers.queryModuleQuestions);
router.get('/getModuleDirectoryInfo', queryControllers.queryModuleDirectoryInfo);
router.get('/getDirectoryModulesInfo', queryControllers.queryDirectoryModulesInfo);
router.get('/getAllUserRequiredModules', queryControllers.queryAllUserRequiredModules);
router.post('/addModule', queryControllers.addModule);

module.exports = router