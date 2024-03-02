const { register, login } = require('../services/userService');
const { parseError } = require('../utils/parser');

const authController = require('express').Router();


authController.get('/register', (req, res) => {

    // TODO replace with actual assingment view
    res.render('register', {
        title: 'Register Page',
        user: req.user
    })
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.email == '' || req.body.password == '') {
            throw new Error('All fields required');
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords must match');
        }
        const token = await register(req.body.email, req.body.username, req.body.password);
        // TODO check assingment to see if register creates session 
        res.cookie('token', token);
        res.redirect('/'); // TODO replace with redirect by assingment
    } catch (error) {
        // TODO add error pareser
        const errors = parseError(error);
        // TODO add error display to actual template
        res.render('register', {
            title: 'Register Page',
            errors,
            user: req.user
        });
    };
});

authController.get('/login', (req, res) => {
    // TODO replace with actual assingment view 
    res.render('login', {
        title: "Login Page",
        user: req.user
    });

});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); // TODO replace with redirect by assingment
    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            errors,
            user: req.user
        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = authController;