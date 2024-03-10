const { createData } = require('../services/dataService');
const { parseError } = require('../utils/parser');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        res.render('create', {
            title: 'Create Page',
            user: req.user
        });
    }
});

createController.post('/', async (req, res) => {
    try {
        if (req.body.name == '' ||
            req.body.img == '' ||
            req.body.age == '' ||
            req.body.description == '' ||
            req.body.location == ''
        ) {
            throw new Error('All fields required')
        }
        req.body.owner = req.user._id;
        await createData(req.body);
        res.redirect('/catalog');
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            user: req.user,
            errors,
            body: req.body
        });
    }
});



module.exports = createController;