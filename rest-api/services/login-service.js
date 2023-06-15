const { generateAccessToken } = require('./auth-service');

const { checkIfUsernameAndPasswordPresent } = require('../utils/auth-validators');
const { checkUserCredentials } = require('../utils/auth-validators');

const { Status } = require('../utils/Status-class');
const { Response } = require('../utils/Response-class');

async function loginUserIfValid(loginCreds) {
    try {
        checkIfUsernameAndPasswordPresent(loginCreds.username, loginCreds.password);
        const user = await checkUserCredentials(loginCreds.username, loginCreds.password);
        const token = generateAccessToken(user);
        return new Status(200, new Response(true, { "accessToken": token }, "User successfully logged in and the token was returned."));
    } catch(err) {
        return new Status(404, new Response(false, null, err.message));
    }
}

module.exports = {
    loginUserIfValid
}