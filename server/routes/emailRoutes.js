const express = require('express');
const emailControllers = require('../controllers/emailController');
const router = express.Router();

router.post('/sendEmployeeInvitation', emailControllers.sendEmployeeInvitationEmail);
router.post('/sendEmployerInvitation', emailControllers.sendEmployerInvitationEmail);

module.exports = router;