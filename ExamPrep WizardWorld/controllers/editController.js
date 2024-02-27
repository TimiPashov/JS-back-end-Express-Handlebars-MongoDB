const { votePost, getById, editPost, deletePost } = require('../services/postService');
const { parseError } = require('../utils/parser');

const editController = require('express').Router();

editController.get('/:id', async (req, res) => {
    const post = await getById(req.params.id);
    res.render('edit', {
        title: 'Edit Page',
        user: req.user,
        post
    });
});

editController.get('/delete/:id', async (req, res) => {
    await deletePost(req.params.id);
    res.redirect('/catalog');
});

editController.post('/:id', async (req, res) => {
    try {
        if (req.body.name == '' ||
            req.body.species == '' ||
            req.body.skinColor == '' ||
            req.body.eyeColor == '' ||
            req.body.img == '' ||
            req.body.description == ''
        ) {
            throw new Error('All fields required')
        }
        await editPost(req.params.id, req.body);
        res.redirect('/catalog');
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            user: req.user,
            errors,
            post: req.body
        });
    }
});

editController.get('/vote/:id', async (req, res) => {
    await votePost(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`)
})

module.exports = editController;