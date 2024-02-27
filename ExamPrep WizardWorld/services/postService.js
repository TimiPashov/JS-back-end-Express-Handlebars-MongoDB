const Post = require('../models/Post');
const User = require('../models/User');
async function getAll() {
    return Post.find({}).lean()
}

async function getById(id) {
    return Post.findById(id).lean();
}

async function getByOwner(id) {
    return Post.find({ owner: id }).lean();
}

async function createPost(data) {
    return Post.create(data);
}

async function editPost(id, data) {
    console.log(data)
    const existing = await Post.findById(id);
    existing.name = data.name;
    existing.species = data.species;
    existing.skinColor = data.skinColor;
    existing.eyeColor = data.eyeColor;
    existing.img = data.img;
    existing.description = data.description;
    return existing.save();
}

async function deletePost(id){
    return await Post.findByIdAndRemove(id);

}

async function votePost(postId, userId) {
    const existing = await Post.findById(postId);
    existing.votes.push(userId);
    return existing.save();
}

async function getVoters(postId) {
    const post = await Post.findById(postId).lean();
    const voters = post.votes
    const haveVoted = []
    for (const voter of voters) {
        const votedUser = await User.findById(voter);
        haveVoted.push(votedUser.email);
    }
    return haveVoted;
}
module.exports = {
    getAll,
    getById,
    createPost,
    editPost,
    votePost,
    getVoters,
    getByOwner,
    deletePost
}