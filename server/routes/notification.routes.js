const notificationController = require('../controllers/notification.controller');
const express = require('express');
var router = express.Router();



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

router.route('/:receiver/:role').get(function (req, res) {
    notificationController.getOne(req.params.receiver,req.params.role).then(function (data) {
        res.status(data.status).send(
            data.data
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});



module.exports = router;

