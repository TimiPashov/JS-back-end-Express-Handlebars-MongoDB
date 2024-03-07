const { Schema, model } = require('mongoose');

const USER_PATTERN = /^[a-zA-Z0-9]+$/i;

// TODO add proper validation as assignement
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long'],
        match: [USER_PATTERN, 'Username must contain only english letter or numbers']
    },
    hashedPassword: { type: String, required: true },
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User', userSchema);

module.exports = User;