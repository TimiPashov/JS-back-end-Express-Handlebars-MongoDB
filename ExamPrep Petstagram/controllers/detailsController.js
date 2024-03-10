const { getById } = require('../services/dataService');
const { getUser } = require('../services/userService');

const detailsController = require('express').Router();

detailsController.get('/:id', async (req, res) => {
    const data = await getById(req.params.id);
    const ownerName = (await getUser(data.owner)).username;
    const comments = [];
    for (const item of data.comments) {
        comments.push(await transformComment(item));

    }
    console.log(comments)
    let isOwner = false;
    let isNotOwner = true;
    let isNotGuest = true;
    if (!req.user) {
        isNotGuest = false;
    }
    if (req.user && data.owner == req.user._id) {
        isOwner = true;
        isNotOwner = false;
    }
    res.render('details', {
        title: 'Details Page',
        user: req.user,
        data,
        isOwner,
        isNotOwner,
        ownerName,
        comments,
        isNotGuest
    });
});

async function transformComment(comment) {
    const commentOwner = (await getUser(comment.userId)).username;
    const commentContent = comment.comment;
    return { commentOwner, commentContent }
}

module.exports = detailsController;