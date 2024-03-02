const { getById, deleteGame, editGame, buyGame } = require('../services/gameService');
const { parseError } = require('../utils/parser');

const editController = require('express').Router();

editController.get('/:id', async (req, res) => {
    const game = await getById(req.params.id);

    if (!req.user) {
        res.redirect('/auth/login')
    } else if (game.owner != req.user._id) {
        res.render('error', {
            title: 'Error Page',
            user: req.user
        })
    }
    const platform = game.platform;
    res.render('edit', {
        title: 'Edit Page',
        platform: platform,
        user: req.user,
        game
    });
});

editController.get('/delete/:id', async (req, res) => {
    await deleteGame(req.params.id);
    res.redirect('/catalog');
});

editController.get('/buy/:id', async (req, res) => {
    const game = await getById(req.params.id);
    try {
        if (req.user && req.user._id != game.owner) {
            if (req.user && game.boughtBy.some(u => u == req.user._id)) {
                throw new Error('You have already bought this game')
            }
            await buyGame(req.params.id, req.user._id);
            res.redirect(`/details/${req.params.id}`);
        } else if (req.user && req.user._id == game.owner) {
            throw new Error('Cannot buy your own game');
        } else {
            res.redirect('/auth/login');
        }
    } catch (error) {
        const errors = parseError(error);
        res.render('details', {
            title: 'Details Page',
            user: req.user,
            game,
            errors
        })
    }

});

editController.post('/:id', async (req, res) => {
    console.log(req.body)
    try {
        if (req.body.name == '' ||
            req.body.img == '' ||
            req.body.price == '' ||
            req.body.description == '' ||
            req.body.genre == '' ||
            req.body.platform == ''
        ) {
            throw new Error('All fields required')
        }
        await editGame(req.params.id, req.body);
        res.redirect('/catalog');
    } catch (error) {
        const game = await getById(req.params.id);
        const errors = parseError(error);
        res.render('edit', {
            title: 'Edit Page',
            platform: game.platform,
            user: req.user,
            game,
            errors
        });
    }
});



module.exports = editController;