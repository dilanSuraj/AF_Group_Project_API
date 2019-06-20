const notificationController = require('../controllers/notification.controller');
const express = require('express');
var router = express.Router();

/**
 * Post request call the insert method in notificationController class to insert a new notification
 */

router.route('/').post(function (req, res) {
    notificationController.insert(req.body).then(function (data) {
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
    notificationController.get().then(function (data) {
        res.status(data.status).send(data.data
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/:notificationCode').get(function (req, res) {
    notificationController.getOne(req.params.notificationCode).then(function (data) {
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
    notificationController.deleteOne(req.params.id).then(function (data) {
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

router.route('/:notificationCode').put(function (req, res) {
    notificationController.update(req.params.notificationCode, req.body).then(function (data) {
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

