const { getRss } = require("../services/rss-service");
const { sendTextResponse } = require("../utils/response-utils");

async function getRssText(req, res, params) {
    const { statusCode, response } = await getRss(params.number);
    sendTextResponse(res, statusCode, response.data);
}

module.exports = {getRssText}