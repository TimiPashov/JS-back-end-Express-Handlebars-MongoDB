const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'd1wr13t1ef';

async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        hashedPassword
    });

    // TODO see assingment if register redirects to correct page
    return createSession(user);

}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect username or password');
    }
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (hasMatch == false) {
        throw new Error('Incorrect username or password');
    }
    return createSession(user);

}

function verifyToken(token) {
     return jwt.verify(token, JWT_SECRET);
}

function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    };
    return jwt.sign(payload, JWT_SECRET);

}

module.exports = {
    register,
    login,
    verifyToken
}