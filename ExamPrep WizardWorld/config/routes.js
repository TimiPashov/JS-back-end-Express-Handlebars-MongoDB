const express = require('express');

const homeController = require("../controllers/homeController");
const authController = require('../controllers/authController');
const createController = require('../controllers/createController');
const catalogController = require('../controllers/catalogController');
const profileController = require('../controllers/profileController');
const detailsController = require('../controllers/detailsController');
const editController = require('../controllers/editController');
const errorController = require('../controllers/errorController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/create', createController);
    app.use('/catalog', catalogController);
    app.use('/profile', profileController);
    app.use('/details', detailsController);
    app.use('/edit', editController);
    app.use('*', errorController);

}