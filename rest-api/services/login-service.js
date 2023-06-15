const bcrypt = require('bcrypt');
const User = require('../models/user-scheme');
const { generateAccessToken } = require('./auth-service');

async function loginUserIfValid(loginCreds) {
    const { username, password } = loginCreds;
    if (!username || !password) {
        throw new Error('Toate câmpurile sunt obligatorii');
    }
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error('Nume de utilizator sau parolă incorecte');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        throw new Error('Nume de utilizator sau parolă incorecte');
    }
    if (isPasswordValid) {
        return generateAccessToken(user);
    }
}

module.exports = {
    loginUserIfValid
}