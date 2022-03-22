const express = require('express');
const testingControllers = require('../controllers/testingController');
const router = express.Router();

/**
* Handles HTTP requests relating to user data/sessions by forwarding them to 
* their respective user controllers.
*/

router.post('/resetUser', testingControllers.resetUserStats);
router.post('/assignModules', testingControllers.assignModulesTest);

module.exports = router