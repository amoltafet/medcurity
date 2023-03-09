const nodemailer = require('nodemailer');
const transporterConfig = require('../nodemailerTransporterConfig.json');

const sendEmployeeInvitationEmail = (req, res) => {
    const transporter = nodemailer.createTransport(transporterConfig);

    const mailOptions = {
        from: "medtestsender@fastmail.com",
        to: req.body.email,
        subject: "Success?",
        text: "Success!"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
};

module.exports =
{
    sendEmployeeInvitationEmail
};