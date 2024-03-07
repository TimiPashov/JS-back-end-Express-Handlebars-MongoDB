const { createCourse, getCourseById, editCourse, deleteCourse, enrollCourse } = require('../services/courseService');
const { parseError } = require('../utils/parser');

const courseController = require('express').Router();

courseController.get('/create', (req, res) => {
    res.render('create', {
        title: ' Create Page',
        user: req.user

    });
});

courseController.get('/details/:id', async (req, res) => {
    if (req.user) {
        const course = await getCourseById(req.params.id)
        const isOwner = req.user._id == course.owner ? true : false;
        const isEnrolled = course.enrolled.some(e => e == req.user._id);
        console.log(isEnrolled)
        console.log(course);
        res.render('details', {
            title: 'Details Page',
            user: req.user,
            course,
            isOwner,
            isEnrolled
        });
    } else {
        res.redirect('/auth/login');
    }
});

courseController.get('/edit/:id', async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);
        if (req.user && req.user._id == course.owner) {
            res.render('edit', {
                title: 'Edit Page',
                user: req.user,
                course
            });
        } else {
            throw new Error('Not Owner!')
        }
    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            errors,
            user: req.user
        });
    }
});

courseController.get('/delete/:id', async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);
        if (req.user && req.user._id == course.owner) {
            await deleteCourse(req.params.id);
            res.redirect('/');

        } else {
            throw new Error('Not Owner');
        }
    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            errors,
            user: req.user
        });
    }
});

courseController.get('/enroll/:id', async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);
        const isOwner = req.user._id == course.owner ? true : false;
        const isEnrolled = course.enrolled.some(e => e == req.user._id);
        if (isOwner) {
            throw new Error('Cannot enroll your own course!');
        }
        if (isEnrolled) {
            throw new Error('You are already enrolled!');
        }
        await enrollCourse(req.params.id, req.user._id);
        res.redirect(`/course/details/${req.params.id}`)
    } catch (error) {
        const course = await getCourseById(req.params.id);
        const isOwner = req.user._id == course.owner ? true : false;
        const isEnrolled = course.enrolled.some(e => e == req.user._id);
        const errors = parseError(error);
        res.render('details',{
            title: 'Details Page',
            errors,
            course,
            user: req.user,
            isOwner,
            isEnrolled
        })
    }


});

courseController.post('/edit/:id', async (req, res) => {
    try {
        const course = req.body;
        if (Object.values(course).some(v => !v)) {
            throw new Error('All fields required');
        };
        await editCourse(req.params.id, course);
        res.redirect(`/course/details/${req.params.id}`);
    } catch (error) {
        const errors = parseError(error);
        res.render('edit', {
            title: 'Edit Page',
            errors,
            user: req.user,
            course: req.body
        });
    }
});

courseController.post('/create', async (req, res) => {
    try {
        const course = req.body;
        course.owner = req.user._id;


        if (Object.values(course).some(v => !v)) {
            throw new Error('All fields required');
        };
        await createCourse(course);
        res.redirect('/');
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            course: req.body,
            user: req.user
        });
    }
});


module.exports = courseController;