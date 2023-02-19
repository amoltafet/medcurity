/*
File Name: queryRoutes.js
Description: This file contains the routes for direct queries to the database,
as well as file handling routes.
Last Modified: February 13, 2023
*/

const express = require('express');
const queryControllers = require('../controllers/queryController');
const router = express.Router();

const BannerUploader = require('../fileUploaders/bannerUploader');
const ProfileUploader = require('../fileUploaders/profileUploader');
const bannerUploader = new BannerUploader();
const profileUploader = new ProfileUploader();

router.get('/getQuery', queryControllers.getQuery);
router.get('/getCompany', queryControllers.getQuery);
router.get('/getModuleInfo', queryControllers.queryModuleInfo);
router.post('/postModuleBanner', bannerUploader.upload.single('bannerImage'), queryControllers.queryUploadBanner);
router.post('/postProfilePicture', profileUploader.upload.single('profileImage'));
router.get('/getModuleBanner', queryControllers.queryModuleBanner);
router.get('/getProfilePicture', queryControllers.queryProfilePicture);
router.get('/getBadgeImage', queryControllers.queryBadgeImage);
router.get('/getModuleQuestions', queryControllers.queryModuleQuestions);
router.get('/getMatchingAnswers', queryControllers.queryMatchingAnswers);
router.get('/getModuleDirectoryInfo', queryControllers.queryModuleDirectoryInfo);
router.get('/getDirectoryModulesInfo', queryControllers.queryDirectoryModulesInfo);
router.get('/getAllUserRequiredModules', queryControllers.queryAllUserRequiredModules);
router.post('/addModule', queryControllers.addModule);

module.exports = router;