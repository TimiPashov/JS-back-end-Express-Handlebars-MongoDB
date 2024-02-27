const { createPost } = require('../services/postService');
const { parseError } = require('../utils/parser');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create', {
        title: 'Create Page',
        user: req.user

    })
});

createController.post('/', async (req, res) => {
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
        req.body.owner = req.user._id;
        await createPost(req.body);
        res.redirect('/catalog');
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            user: req.user,
            errors
        });
    }
})

module.exports = createController;