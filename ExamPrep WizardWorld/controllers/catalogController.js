const { getAll } = require('../services/postService');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {
    const posts = await getAll();
    res.render('catalog', {
        title: 'Catalog Page',
        user: req.user,
        posts
    });
});

module.exports = catalogController