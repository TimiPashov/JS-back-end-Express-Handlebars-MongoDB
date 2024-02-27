const errorController = require('express').Router();

errorController.get('/', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        user: req.user
    });
});

module.exports = errorController;