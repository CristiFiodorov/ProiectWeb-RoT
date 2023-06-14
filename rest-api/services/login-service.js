const bcrypt = require('bcrypt');
const User = require('../models/user-scheme');
const { generateAccessToken } = require('./auth-service');

async function loginUserIfValid(loginCreds) {
    const { username, password } = loginCreds;
    if (!username || !password) {
        throw new Error('Parola sau username incorecte');
    }
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error('Username inexistent');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        throw new Error('Parola introdusa este incorecta');
    }
    if (isPasswordValid) {
        return generateAccessToken(user);
    }
}

module.exports = {
    loginUserIfValid
}