const {findSignCategories} = require('../services/signcategories-service');
const { sendJsonResponse } = require('../utils/response-utils');

async function getSignCategories(req, res) {
    const signCategories = await findSignCategories();
    sendJsonResponse(res, 200, JSON.stringify(signCategories));
}


module.exports = {getSignCategories};