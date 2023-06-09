/*
File Name: statsRoutes.js
Description: This file contains the routes to get stats for the stats employer page.
Last Modified: February 28, 2023
*/

const express = require('express');
const statsController = require('../controllers/statsController');
const router = express.Router();

router.get('/getEmployeeActivity', statsController.getEmployeeActivity);
router.get('/getModuleCounts', statsController.getModuleCounts);
router.get('/getModuleStats', statsController.getModuleStats);
router.get('/getModuleHistory', statsController.getModuleHistory);
router.get('/getLeaderboard', statsController.getPublicLeaderboard);

module.exports = router;