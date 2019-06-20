const express = require('express');
let CourseSchema = require('../models/course.model');

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



            course.save().then(() => {
                resolve({
                    status: 200,
                    message: 'Added a course successfully'
                })
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

    this.update = (courseId,data) => {
        var courseId = JSON.stringify(data.courseId);
        var name = JSON.stringify(data.name);
        var courseInstructor = JSON.stringify(data.courseInstructor);


        return new Promise(function (resolve, reject) {
            CourseSchema.find({
                courseId: courseId
            }).exec().then((course) => {

                if(!course){

                    course.name = courseId;
                    course.courseId = name;
                    course.courseInstructor = courseInstructor;

                    course.save().then( (data) => resolve({
                        status: 200,
                        data: data
                    })).catch((err) => reject({
                        status: 500,
                        message: 'Error : ' + err
                    }));

                }

            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            })
        })
    }

};
/**
 * courseController() method is exported for the courseRouter class's use
 */
module.exports = new courseController();