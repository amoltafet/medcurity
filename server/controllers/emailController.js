const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const transporterConfig = require('../nodemailerTransporterConfig.json');
const bcrypt = require("bcrypt");
const serverConfig = require('../serverConfig.json')
const saltRounds = serverConfig.bcrypt.SALT_ROUNDS;
const db = require('../dbConfig');

const invitationEmailTemplate = fs.readFileSync('../src/Email/emailInvitation.html', 'utf-8');

const sendEmployeeInvitationEmail = (req, res) => {
    const transporter = nodemailer.createTransport(transporterConfig);

    const mailOptions = {
        from: "medtestsender@fastmail.com",
        to: req.body.email,
        subject: "Invitation to join Medcurity Learn",
        html: invitationEmailTemplate,
        attachments: [{
            filename: "Medcurity_Logo.png",
            path: __dirname + "/../../public/Medcurity_Logo.png",
            cid: "MedcurityLogo"
        }, {
            filename: "bee.png",
            path: __dirname + "/../../public/bee.png",
            cid: "DesignedWithBee"
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
    
};

const sendEmployerInvitationEmail = (req, res) => {
    const transporter = nodemailer.createTransport(transporterConfig);

    const mailOptions = {
        from: "medtestsender@fastmail.com",
        to: req.body.email,
        subject: "Invitation to join Medcurity Learn",
        html: invitationEmailTemplate,
        attachments: [{
            filename: "Medcurity_Logo.png",
            path: __dirname + "/../../public/Medcurity_Logo.png",
            cid: "MedcurityLogo"
        }, {
            filename: "bee.png",
            path: __dirname + "/../../public/bee.png",
            cid: "DesignedWithBee"
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
    
};

/**
 * Adds a new password reset token to the database.
 */
const addPasswordResetToken = (req, res) =>
{
    const userid = req.body.userid
	const email = req.body.email
    const resetToken = require('crypto').randomBytes(32).toString('hex');
	const oldDateObj = new Date()
	const expiration = new Date(oldDateObj.getTime() + 15*60000) // expires 15 minutes from now

	bcrypt.hash(resetToken, saltRounds, (err, hash) => {
		db.query("INSERT INTO passwordresettokens (userid, token, expirationdate) VALUES (?,?,?)", [userid, hash, expiration], (err, result) => {
			if (!err) {
				
			}
		})
	})
    
}

module.exports =
{
    sendEmployeeInvitationEmail,
	sendEmployerInvitationEmail,
	addPasswordResetToken
};