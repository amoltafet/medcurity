const express = require('express');
const emailControllers = require('../controllers/emailController');
const router = express.Router();

router.post('/sendEmployeeInvitation', emailControllers.sendEmployeeInvitationEmail);
router.post('/sendEmployerInvitation', emailControllers.sendEmployerInvitationEmail);
router.post('/addPasswordResetToken', emailControllers.addPasswordResetToken);
router.post('/getDetailsFromPasswordResetToken', emailControllers.getDetailsFromPasswordResetToken);

module.exports = router;