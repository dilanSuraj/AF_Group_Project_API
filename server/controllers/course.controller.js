const express = require('express');
let CourseSchema = require('../models/course.model');
const notificationController = require('../controllers/notification.controller');

var courseController = function () {
    /**
     * Insert method insert data into the course table
     */
    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var course = new CourseSchema({
                name : data.name,
                courseId: data.courseId,
                courseInstructor: data.courseInstructor
            });



            course.save().then((addedCourse) => {

                let notification = {

                    description: "New Course "+data.name+" has created",
                    course: addedCourse._id,
                    studentreceiverlist:null,
                    superuserreceiverlist:null,
                    role:"INSTRUCTOR"

                };
                notificationController.insert(notification).then((data) =>{
                    resolve({
                        status: 200,
                        message: 'Sent a notification and added course successfully'+ data
                    })
                    }

                ).catch((err) =>{
                    reject({
                        status: 500,
                        message: 'Error : ' + err
                    })
                });


            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            });
        }).catch(err=>{
            return(console.log(err));
        });
    };
    /**
     * get method to retrieve all data
     */

    this.get = () => {
        return new Promise(function (resolve, reject) {
            CourseSchema.find().exec().then((data) => {
                resolve({
                    status: 200,
                    data: data
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            })
        })
    };

    this.getAcceptedCourses = () => {
        return new Promise(function (resolve, reject) {
            CourseSchema.find({
                isCourseAccepted: true
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    data: data
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            })
        })
    };

    /**
     * getOne method to retrieve data of specified course based on the course code
     */

    this.getOne = (courseId) => {
        return new Promise(function (resolve, reject) {
            CourseSchema.find({
                    courseId: courseId
                }).exec().then((data) => {
                resolve({
                    status: 200,
                    data: data
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            })
        })
    };

    /**
     * Delete an existing course
     */
    this.deleteOne = (id) => {
        return new Promise(function (resolve, reject) {
            CourseSchema.remove({
                _id: id
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    message: 'Deleted'
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            })
        })
    };
    /**
     * User can update their profile
     */

    this.update = (courseId, data) => {
        return new Promise((resolve, reject) => {
            CourseSchema.update({_id: courseId}, data).then(() => {
                resolve({status: 200, message: "updated the course"});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    };



};
/**
 * courseController() method is exported for the courseRouter class's use
 */
module.exports = new courseController();