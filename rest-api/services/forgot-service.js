const { Response } = require("../utils/response-class");
const { Status } = require("../utils/status-class");
const User = require("../models/user-scheme");
const bcrypt = require('bcrypt');
const { sendMail } = require("../utils/email-utils");
const { generateRandomPassword } = require("../utils/random-password-utils");


const sendNewPasswordEmail = async (params) => {
    const newPassword = generateRandomPassword(10);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    try {
        console.log(params.email);
        const result = await User.updateOne({ email: params.email }, { password: hashedPassword });
        console.log(params.result);
        sendMail(params.email, newPassword);
        return new Status(200, new Response(true, null, "Email sent."));
    } catch (error) {
        console.log(error);
        return new Status(500, new Response(false, null, "There was an internal error."));
    }
}
module.exports = { sendNewPasswordEmail };