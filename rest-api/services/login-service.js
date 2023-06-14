const bcrypt = require('bcrypt');
const User = require('../models/user-scheme');
const { generateAccessToken } = require('./auth-service');

async function loginUserIfValid(loginCreds) {
    const { username, password } = loginCreds;
    if (!username || !password) {
        throw new Error('Invalid username or password');
    }
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error('Username not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        return generateAccessToken(user);
    }
}

module.exports = {
    loginUserIfValid
}