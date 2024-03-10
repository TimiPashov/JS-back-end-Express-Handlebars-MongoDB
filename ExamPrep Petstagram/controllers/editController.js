const { getById, deleteData, editData, commentData } = require('../services/dataService');
const { parseError } = require('../utils/parser');

const editController = require('express').Router();

editController.get('/:id', async (req, res) => {
    const data = await getById(req.params.id);
    if (!req.user) {
        res.redirect('/auth/login')
    } else if (data.owner != req.user._id) {
        res.render('error', {
            title: 'Error Page',
            user: req.user,
        })
    }
    res.render('edit', {
        title: 'Edit Page',
        user: req.user,
        data
    });
});

editController.get('/delete/:id', async (req, res) => {
    const data = await getById(req.params.id);
    console.log(data);
    if (!req.user) {
        res.redirect('/auth/login')
    } else if (data.owner != req.user._id) {
        res.render('error', {
            title: 'Error Page',
            user: req.user,
        })
    }else{
        await deleteData(req.params.id);
        res.redirect('/catalog');
    }
});

editController.post('/comment/:id', async (req, res) => {
    const data = await getById(req.params.id);
    const comment = {
        userId: req.user._id,
        comment: req.body.comment
    }
    try {
        if (req.user && req.user._id == data.owner) {
            throw new Error('Cannot comment your own post');
        } else if (!req.user) {
            res.redirect('/auth/login');
        }else{
            await commentData(req.params.id, comment);
            res.redirect(`/details/${req.params.id}`);
        }
    } catch (error) {
        const errors = parseError(error);
        res.render('details', {
            title: 'Details Page',
            user: req.user,
            data,
            errors
        })
    }

});

editController.post('/:id', async (req, res) => {
    try {

        if (req.body.name == '' ||
            req.body.img == '' ||
            req.body.age == '' ||
            req.body.description == '' ||
            req.body.location == ''
        ) {
            throw new Error('All fields required')
        }
        await editData(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        const errors = parseError(error);
        res.render('edit', {
            title: 'Edit Page',
            user: req.user,
            data: req.body,
            errors
        });
    }
});



module.exports = editController;