const bcrypt = require('bcrypt');

const { validateEmailFormat, validateUsernameFormat, validatePasswordFormat, validateEmailNotUsed, validateUsernameNotUsed } = require('../utils/auth-validators');
const User = require('../models/user-scheme');


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
        throw new Error(JSON.stringify(errorList));
    }

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new User({
            username: user.username,
            password: hashedPassword,
            email: user.email,
            isAdmin: false
        });
        return await newUser.save();
    } catch (err) {
        throw new Error(JSON.stringify([{ dbError: err.message }]));
    }
}

module.exports = {
    registerUserIfValid
}