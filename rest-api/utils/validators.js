/**
 * Checks if the password contains at least 8 characters, one uppercase, one lowercase and one number  
 */
function validatePassword(password) {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!re.test(password)) {
        throw 'Password is not valid. It must contain at least 8 characters, one uppercase letter, one lowercase letter and one number';
    }
}

/**
 * Checks if the email corresponds to a standard email address and is not yet used by another user
 */
function validateEmail(email) {
    var re = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!email || email.length > 254 || !re.test(email)) {
        throw 'Email introduced does not correspond to a valid email address';
    }

    // if some part (separated by the @) is longer than 64 characters
    const parts = email.split("@");
    if (parts[0].length > 64) {
        throw 'Email introduced does not correspond to a valid email address. The username part is longer than 64 characters';
    }

    // if some part (separated by the .) after the @ is longer than 63 characters
    const domainParts = parts[1].split(".");
    if (domainParts.some((part) => { return part.length > 63; })) {
        throw 'Email introduced does not correspond to a valid email address. One of domain parts are longer than 63 characters';
    }
}

/**
 * Checks if the username contains at least 5 characters and is not yet used by another user
 */
function validateUsername(username) {
    if (username.length < 5) {
        throw 'Username is not valid. It must contain at least 5 characters';
    }
}

module.exports = {
    validatePassword,
    validateEmail,
    validateUsername
}