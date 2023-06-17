const nodemailer = require('nodemailer');
const sendMail = (receiverEmail, password) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'petrisorvmy607@gmail.com',
            pass: 'yizanzjexvtqmyfr'
        }
    });

    const mailOptions = {
        from: 'petrisorvmy607@gmail.com',
        to: `${receiverEmail}`,
        subject: 'RoT New password',
        text: `This is your new password: ${password}.`
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = { sendMail };
