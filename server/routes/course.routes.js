const courseController = require('../controllers/course.controller');
const express = require('express');
var router = express.Router();

/**
 * Post request call the insert method in courseController class to insert a new course
 */

router.route('/').post(function (req, res) {
    courseController.insert(req.body).then(function (data) {
        res.status(data.status).send({
            message: data.message
        });
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/').get(function (req, res) {
    courseController.get().then(function (data) {
        res.status(data.status).send(data.data
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/:courseId').get(function (req, res) {
    courseController.getOne(req.params.courseId).then(function (data) {
        res.status(data.status).send(
            data.data
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/:id').delete(function (req, res) {
    courseController.deleteOne(req.params.id).then(function (data) {
        res.status(data.status).send(
            {
                data: data.message
            }
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/:courseId').put(function (req, res) {
    courseController.update(req.params.courseId, req.body).then(function (data) {
        res.status(data.status).send(
            {
                data: data.message
            }
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

module.exports = router;

