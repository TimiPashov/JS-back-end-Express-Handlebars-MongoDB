const { Schema, model, Types } = require('mongoose');

// TODO add proper validation as assignement
const postSchema = new Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    skinColor: { type: String, required: true },
    eyeColor: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    votes: { type: [Types.ObjectId], required: true },
    owner: { type: Types.ObjectId, required: true }
});


const Post = model('Post', postSchema);

module.exports = Post;