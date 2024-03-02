const { Schema, model, Types } = require('mongoose');


const URL_PATTERN = /^https?:\/\/.+$/i;
// TODO add proper validation as assignement
const gameSchema = new Schema({
    name: { type: String, required: true, minlength:[4, 'Name must be at least 4 characters long'] },
    img: {
        type: String, required: true, validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid URL'
        }
    },
    price: { type: Number, required: true, min:[1, 'Price must be a positive number'] },
    description: { type: String, required: true, minlength:[10, 'Description must be at least 10 characters long'] },
    platform: { type: String, required: true },
    genre: { type: String, required: true, minlength:[2, 'Genre must be at least 2 characters long'] },
    boughtBy: { type: [Types.ObjectId], ref: 'User' },
    owner: { type: Types.ObjectId, ref: 'User' }
});

gameSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const Game = model('Game', gameSchema);

module.exports = Game;