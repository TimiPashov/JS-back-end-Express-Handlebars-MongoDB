const { getByOwner } = require('../services/postService');
const { getUser } = require('../services/userService');

const profileController = require('express').Router();

profileController.get('/', async (req, res) => {
    const user = await getUser(req.user._id);
    const postAuthor = `${user.firstName} ${user.lastName}`
    const posts = (await getByOwner(req.user._id));
    posts.forEach((p) => p.author = postAuthor);
    posts.forEach((p)=> p.votesCount = p.votes.length);
    console.log(posts)
    res.render('profile', {
        title: 'Profile Page',
        user,
        posts,

    });
});

module.exports = profileController;