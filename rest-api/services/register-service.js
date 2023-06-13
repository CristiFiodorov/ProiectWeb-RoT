const bcrypt = require('bcrypt');

const { validateUsername, validatePassword, validateEmail } = require('../utils/validators');
const User = require('../models/user-scheme');

async function registerUserIfValid(user) {
    validatePassword(user.password);
    validateEmail(user.email);
    validateUsername(user.username);
    
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