const bcrypt = require('bcrypt');

const { validateEmailFormat, validateUsernameFormat, validatePasswordFormat, validateEmailNotUsed, validateUsernameNotUsed } = require('../utils/auth-validators');
const User = require('../models/user-scheme');

async function registerUserIfValid(user) {
    validatePasswordFormat(user.password);
    validateEmailFormat(user.email);
    await validateEmailNotUsed(user.email);
    validateUsernameFormat(user.username);
    await validateUsernameNotUsed(user.username);

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({
        username: user.username,
        password: hashedPassword,
        email: user.email, 
        isAdmin: false
    });
    
    return await newUser.save();
}

module.exports = {
    registerUserIfValid
}