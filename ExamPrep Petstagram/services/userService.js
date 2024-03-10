const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validator = require('validator');
const JWT_SECRET = 'd1wr13t1ef';

async function getUser(id){
    return User.findById(id).lean();
}

async function register(email, username, password) {
    if (!validator.isEmail(email)) {
        throw new Error('Invalid Email');
    }
    if (password.length < 4) {
        throw new Error('Password must be at least 4 characters long');
    }
    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email is taken');
    }
    const existingUser = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existingUser) {
        throw new Error('Username is taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
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

function createSession({ _id, username, email }) {
    const payload = {
        _id,
        username,
        email
    };
    return jwt.sign(payload, JWT_SECRET);

}

module.exports = {
    register,
    login,
    verifyToken,
    getUser
}