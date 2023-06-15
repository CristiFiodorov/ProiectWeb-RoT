/**
 * Checks if the password contains at least 8 characters, one uppercase, one lowercase and one number  
 */
function validatePasswordFormat(password) {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!re.test(password)) {
        throw new Error('Parola trebuie să conțină cel puțin 8 caractere, o literă mare, o literă mică și o cifră');
    }
}

/**
 * Checks if the email corresponds to a standard email address and is not yet used by another user
 */
function validateEmailFormat(email) {
    var re = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!email || email.length > 254 || !re.test(email)) {
        throw new Error('Adresa de email nu este una validă');
    }

    // if some part (separated by the @) is longer than 64 characters
    const parts = email.split("@");
    if (parts[0].length > 64) {
        throw new Error('Adresa de email nu este una validă');
    }

    // if some part (separated by the .) after the @ is longer than 63 characters
    const domainParts = parts[1].split(".");
    if (domainParts.some((part) => { return part.length > 63; })) {
        throw new Error('Adresa de email nu este una validă');
    }
}

/**
 * Checks if the username contains at least 5 characters and is not yet used by another user
 */
function validateUsernameFormat(username) {
    if (username.length < 5) {
        throw new Error('Numele de utilizator trebuie să conțină cel puțin 5 caractere');
    }
}

/**
 * Checks if the username is not yet used by another user by executing a query in the database
 */
async function validateUsernameNotUsed(username) {
    const User = require('../models/user-scheme');
    try {
        const count = await User.countDocuments({ username: username });
        if(count > 0) {
            throw new Error('Un utilizator cu acest nume deja există');
        }
    } catch (err) {
        throw err;
    }
}

/**
 * Checks if the email is not yet used by another user by executing a query in the database
 */
async function validateEmailNotUsed(email) {
    const User = require('../models/user-scheme');
    try {
        const count = await User.countDocuments({ email: email });
        if(count > 0) {
            throw new Error('Emailul este deja utilizat');
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    validatePasswordFormat,
    validateEmailFormat,
    validateUsernameFormat,
    validateUsernameNotUsed,
    validateEmailNotUsed
}