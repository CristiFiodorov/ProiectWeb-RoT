const {findSignsByCategory} = require('../services/sign-service');
const { sendJsonResponse } = require('../utils/response-utils');

async function getSignsByCategory(req, res) {
    const signs = await findSignsByCategory("6488dd7b7eca7e5d0ed02d6e");
    sendJsonResponse(res, 200, JSON.stringify(signs));
}

module.exports = {getSignsByCategory};