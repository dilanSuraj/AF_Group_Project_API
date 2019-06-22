const studentController = require('../controllers/student.controller');
const courseController = require('../controllers/course.controller');
const express = require('express');
var router = express.Router();

/**
 * Post request call the insert method in studentController class to insert a new student
 */

router.route('/').post(function (req, res) {
    studentController.insert(req.body).then(function (data) {
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
    studentController.get().then(function (data) {
        res.status(data.status).send(data.data
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

// router.route('/:email').get(function (req, res) {
//     studentController.getByEmail(req.params.email).then(function (data) {
//         console.log(data.data);
//         res.status(data.status).send(data);
//     }).catch(error => {
//         res.status(error.status).send({
//             message: error.message
//         })
//     })
// });

router.route('/:assignmentExamCode').get(function (req, res) {
    studentController.getByEmail(req.params.email).then(function (data) {
        res.status(data.status).send(
            data.data
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/unenrolled/:email').get(function (req, res) {
    studentController.getByEmail(req.params.email).then(function (data) {
        let enrolledCourses = data.data[0].courses;

        courseController.getAcceptedCourses().then(function (data) {


            let acceptedCourses = data.data;

            let unenrolledCourses = [];

            for(let acceptedCourse of acceptedCourses ){

                console.log(acceptedCourse._id);
                if(enrolledCourses.indexOf(acceptedCourse._id) > 0){

                    unenrolledCourses.push(acceptedCourse);
                }

            }


            res.status(data.status).send(
                unenrolledCourses
            );

        }).catch(function (err) {
            res.status(err.status).send({
                message: err.message
            })
        });
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/:email/:password').get(function (req, res) {
    studentController.getByEmailPassword(req.params.email,req.params.password).then(function (data) {
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
    studentController.deleteOne(req.params.id).then(function (data) {
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
    studentController.update(req.params.email, req.body).then(function (data) {
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

