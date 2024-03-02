const { getAll } = require('../services/gameService');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {
    const games = await getAll();
    res.render('catalog', {
        title: 'Catalog Page',
        user: req.user,
        games
    });
});



module.exports = catalogController;