const { getById } = require('../services/gameService');

const detailsController = require('express').Router();

detailsController.get('/:id', async (req, res) => {
    const game = await getById(req.params.id);
    let isOwner = false;
    let hasBought = false;
    if (req.user && game.owner == req.user._id) {
        isOwner = true;
    }
    if (req.user) {
        hasBought = game.boughtBy.some(u => u == req.user._id);
    }
    console.log(hasBought)
    res.render('details', {
        title: 'Details Page',
        user: req.user,
        game,
        isOwner,
        hasBought
    });
});



module.exports = detailsController;