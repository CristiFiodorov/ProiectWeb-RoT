const bcrypt = require('bcrypt');

const { validateEmailFormat, validateUsernameFormat, validatePasswordFormat, validateEmailNotUsed, validateUsernameNotUsed } = require('../utils/auth-validators');
const User = require('../models/user-scheme');

const { Status } = require('../utils/status-class');
const { Response } = require('../utils/response-class');

async function checkAsyncValidation(asyncValidation, param, errorKey, errorList) {
    try {
        await asyncValidation(param);
    } catch (err) {
        errorList.push({ [errorKey]: err.message });
    }
}

function checkSyncValidation(syncValidation, param, errorKey, errorList) {
    try {
        syncValidation(param);
    } catch (err) {
        errorList.push({ [errorKey]: err.message });
    }
}

async function registerUserIfValid(user) {
    let errorList = [];
    checkSyncValidation(validatePasswordFormat, user.password, "passwordNotValid", errorList);
    checkSyncValidation(validateEmailFormat, user.email, "emailNotValid", errorList);
    await checkAsyncValidation(validateEmailNotUsed, user.email, "emailAlreadyUsed", errorList);
    checkSyncValidation(validateUsernameFormat, user.username, "usernameNotValid", errorList);
    await checkAsyncValidation(validateUsernameNotUsed, user.username, "usernameAlreadyUsed", errorList);

    if (errorList.length > 0) {
        return new Status(400, new Response(false, errorList, "Invalid registration data."));
    }

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new User({
            username: user.username,
            password: hashedPassword,
            email: user.email,
            isAdmin: false
        });
        await newUser.save();
        return new Status(201, new Response(true, null, "User successfully registered."));
    } catch (err) {
        return new Status(500, new Response(false, null, err.message));
    }

}

module.exports = {
    registerUserIfValid
}