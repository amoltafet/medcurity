/*
File Name: statsRoutes.js
Description: This file contains the routes to get stats for the stats employer page.
Last Modified: February 28, 2023
*/

const express = require('express');
const modulesController = require('../controllers/statsController');
const router = express.Router();

router.get('/getEmployeeActivity', modulesController.getEmployeeActivity);

module.exports = router;