const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const transporterConfig = require('../nodemailerTransporterConfig.json');

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

module.exports =
{
    sendEmployeeInvitationEmail,
	sendEmployerInvitationEmail
};