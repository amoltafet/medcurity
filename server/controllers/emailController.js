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
        from: "automated@medcurity.com",
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
        from: "automated@medcurity.com",
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
    const userid = req.body.userid;
	const email = req.body.email;
    const resetToken = require('crypto').randomBytes(32).toString('hex');
	const oldDateObj = new Date();
	const expiration = new Date(oldDateObj.getTime() + 15*60000); // expires 15 minutes from now

	// FIX ENCRYPTION
	// bcrypt.hash(resetToken, saltRounds, (err, hash) => {
	// 	db.query("INSERT INTO passwordresettokens (userid, token, expirationdate) VALUES (?,?,?)", [userid, hash, expiration], (err, result) => {
	// 		if (!err) {
	// 			sendPasswordResetEmail(email, resetToken);
	// 		}
	// 	});
	// });

	db.query("INSERT INTO passwordresettokens (userid, token, expirationdate) VALUES (?,?,?)", [userid, resetToken, expiration], (err, result) => {
		if (!err) {
			sendPasswordResetEmail(email, resetToken);
		}
	});

};

/**
 * Gathers information according to the URL parameter password reset token 
 */
const getDetailsFromPasswordResetToken = (req, res) =>
{
	const resetToken = req.body.token;

	// FIX ENCRYPTION
	// db.query("SELECT userid, email, token, expirationdate FROM passwordresettokens JOIN users USING (userid)", (err, result) => {
	// 	for (row in result) {
	// 		bcrypt.compare(resetToken, row.token, (error, response) => {
	// 			if (response) {
	// 				const useridDetail = row.userid;
	// 				const emailDetail = row.email;
	// 				const expirationdateDetail = row.expirationdate;
	// 				res.send({success: true, useridDetail: useridDetail, emailDetail: emailDetail, expirationdateDetail: expirationdateDetail});
	// 			}
	// 		});
	// 	}
	// 	res.send({success: false});
	// });

	db.query("SELECT userid, email, expirationdate FROM passwordresettokens JOIN users USING (userid) WHERE token = ?", [resetToken], (err, result) => {
		res.send(result);
	});
};

function sendPasswordResetEmail(email, resetToken) {
	const transporter = nodemailer.createTransport(transporterConfig);

    const mailOptions = {
        from: "automated@medcurity.com",
        to: email,
        subject: "Link to change your Medcurity Learn password",
        html: `
		<p>If you requested to reset your password, please click the link below. It expires in 15 minutes.</p>
		<a href="localhost:3000/resetPassword?token=${resetToken}">Reset Your Password</a>
		`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
};

module.exports =
{
    sendEmployeeInvitationEmail,
	sendEmployerInvitationEmail,
	addPasswordResetToken,
	getDetailsFromPasswordResetToken
};