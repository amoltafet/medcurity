const express = require('express');
const queryControllers = require('../controllers/queryController');
const router = express.Router();

router.get('/getQuery', queryControllers.getQuery);
router.get('/getModuleInfo', queryControllers.queryModuleInfo);
router.get('/getModuleQuestions', queryControllers.queryModuleQuestions);
router.get('/getModuleDirectoryInfo', queryControllers.queryModuleDirectoryInfo);
router.get('/getDirectoryModulesInfo', queryControllers.queryDirectoryModulesInfo);

module.exports = router