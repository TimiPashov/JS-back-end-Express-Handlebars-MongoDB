const express = require('express');

const homeController = require("../controllers/homeController");
const authController = require('../controllers/authController');
const catalogController = require('../controllers/catalogController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const editController = require('../controllers/editController');
const searchController = require('../controllers/searchController');
const errorController = require('../controllers/errorController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/create', createController);
    app.use('/details', detailsController);
    app.use('/edit', editController);
    app.use('/search', searchController);
    app.use('*', errorController);
}