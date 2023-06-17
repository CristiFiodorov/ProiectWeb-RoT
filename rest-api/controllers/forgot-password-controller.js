const { sendNewPasswordEmail } = require("../services/forgot-service");
const { sendJsonResponse } = require('../utils/response-utils');

async function forgotPassword(req,res,params){
    const {statusCode, response} = await sendNewPasswordEmail(params);
    sendJsonResponse(res, statusCode, JSON.stringify(response));
}

module.exports = {forgotPassword};