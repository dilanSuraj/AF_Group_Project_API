const otherUserController = require('../controllers/otherUser.controller');
const express = require('express');
var router = express.Router();

/**
 * Post request call the insert method in otherUserController class to insert a new otherUser
 */

router.route('/').post(function (req, res) {
    otherUserController.insert(req.body).then(function (data) {
        res.status(data.status).send({
            message: data.message
        });
    }).catch(function (error) {
        res.status(error.status).send({
            message: error.message
        });
    })
});

router.route('/').get(function (req, res) {
    otherUserController.get().then(function (data) {
        res.status(data.status).send(data.data
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/:assignmentExamCode').get(function (req, res) {
    otherUserController.getByEmail(req.params.email).then(function (data) {
        res.status(data.status).send(
            data.data
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/:email/:password').get(function (req, res) {
    otherUserController.getByEmailPassword(req.params.email,req.params.password).then(function (data) {
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
    otherUserController.deleteOne(req.params.id).then(function (data) {
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

router.route('/:email').put(function (req, res) {
    otherUserController.update(req.params.email, req.body).then(function (data) {
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

