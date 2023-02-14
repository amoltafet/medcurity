/*
File Name: modulesRoutes.js
Description: This file contains the routes used to assign modules to employees,
    track completed modules, and pull in information on assigned modules for companies.
    The POST/GET request functions are contained in modulesController.js. 
    These requests are accessed via the '/modules/<function_name>' address.
Last Modified: February 13, 2023
*/

const express = require('express');
const modulesController = require('../controllers/modulesController');
const router = express.Router();

router.get('/unassignedModules', modulesController.getUnassignedModules);
router.post('/assignModule', modulesController.assignModule);

module.exports = router;