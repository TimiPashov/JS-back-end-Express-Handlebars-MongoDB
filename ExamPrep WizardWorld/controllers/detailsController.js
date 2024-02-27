const { getById, getVoters } = require('../services/postService');

const detailsController = require('express').Router();

detailsController.get('/:id', async (req, res) => {
    const post = await getById(req.params.id);

    let voters = await getVoters(req.params.id);
    const votesCount = voters.length;
    voters = voters.join(', ');
    let isOwner = false;
    let hasVoted = false;
    if (req.user) {
        hasVoted = post.votes.some(v => v == req.user._id);

    }
    if (req.user && post.owner == req.user._id) {
        isOwner = true;
    }
    
    res.render('details', {
        title: 'Details Page',
        user: req.user,
        post,
        isOwner,
        hasVoted,
        voters,
        votesCount
    });
});

module.exports = detailsController;