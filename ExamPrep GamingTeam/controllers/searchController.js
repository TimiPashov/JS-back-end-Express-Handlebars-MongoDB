const { getAll, searchByTwoCriteria } = require('../services/gameService');

const searchController = require('express').Router();

searchController.get('/', async (req, res) => {
    console.log(req.query)
    let games;
    if (req.query.searchName && req.query.searchPlatform) {
        games = await searchByTwoCriteria(req.query.searchName, req.query.searchPlatform);
    } else if (req.query.searchName && !req.query.searchPlatform) {
        games = await getAll(req.query.searchName);
    } else if (!req.query.searchName && req.query.searchPlatform) {
        games = await getAll(req.query.searchPlatform);
    }else{
        games = await getAll();
    }

    res.render('search', {
        title: 'Search Page',
        user: req.user,
        games,
        searchName: req.query.searchName,
        searchPlatform: req.query.searchPlatform
    });
});



module.exports = searchController;