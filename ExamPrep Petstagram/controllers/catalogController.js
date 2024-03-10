const { getAll } = require('../services/dataService');
const { getUser } = require('../services/userService');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {
    const data = await getAll();
    for (const item of data) {
        const user = await getUser(item.owner);
        item.ownerName = user.username;
    }
    console.log(data);
    res.render('catalog', {
        title: 'Catalog Page',
        user: req.user,
        data
    });
});



module.exports = catalogController;