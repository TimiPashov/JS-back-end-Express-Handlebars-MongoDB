const { getByOwner } = require('../services/dataService');
const profileController = require('express').Router();


profileController.get('/', async (req, res) => {
    const data = await getByOwner(req.user._id)
    res.render('profile', {
        title: 'Profile Page',
        user: req.user,
        data
    });
});



module.exports = profileController;