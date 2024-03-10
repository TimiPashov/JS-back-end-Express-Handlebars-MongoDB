const { Schema, model } = require('mongoose');



// TODO add proper validation as assignement
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength:[3, 'Username must be at least 3 characters long'] },
    email: {type: String, required: true, unique: true, minlength:[10, 'Email must e at least 10 characters long'] },
    hashedPassword: { type: String, required: true, },
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;