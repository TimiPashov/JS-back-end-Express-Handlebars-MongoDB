const { getAllByDate, getRecent } = require('../services/courseService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    if (req.user) {
        const courses = await getAllByDate(req.query.search);
        res.render('homeUser', {
            title: 'Home Page',
            user: req.user,
            courses,
            search: req.query.search
        })
    } else {
        const courses = await getRecent();
        res.render('homeGuest', {
            title: 'Home Page',
            user: req.user,
            courses
        });
    }
});



module.exports = homeController;