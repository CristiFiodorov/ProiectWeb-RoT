const {findSignsByCategory, findSignById, findNextSignsByCategory, findPrevSignsByCategory} = require('../services/sign-service');
const { sendJsonResponse } = require('../utils/response-utils');

async function getSignsByCategory(req, res) {
    const signs = await findSignsByCategory("648b0cc06918d6c89a908ac0");
    sendJsonResponse(res, 200, JSON.stringify(signs));
}

async function getSignById(req, res) {
    const sign = await findSignById("648b0cc06918d6c89a908af4");
    sendJsonResponse(res, 200, JSON.stringify(sign));
}

async function getNextSignByCategory(req, res) {
    const nextSign = await findNextSignsByCategory("648b0cc06918d6c89a908af4", "648b0cc06918d6c89a908ac0");
    sendJsonResponse(res, 200, JSON.stringify(nextSign));
}

async function getPrevSignByCategory(req, res) {
    const prevSign = await findPrevSignsByCategory("648b0cc06918d6c89a908af4", "648b0cc06918d6c89a908ac0");
    sendJsonResponse(res, 200, JSON.stringify(prevSign));
}


module.exports = {getSignsByCategory, getSignById, getNextSignByCategory, getPrevSignByCategory};