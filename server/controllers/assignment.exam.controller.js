const express = require('express');
let AssignmentExamSchema = require('../models/assignment.exam.model');
const notificationController = require('../controllers/notification.controller');
const studentController = require('../controllers/student.controller');



var assignmentExamController = function () {
    /**
     * Insert method insert data into the AssignmentExam table
     */
    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var assignmentExam = new AssignmentExamSchema({
                assignmentExamCode : data.assignmentExamCode,
                description: data.description,
                courseCode: data.courseCode,
                typeOfExam:data.typeOfExam,
                marks:data.marks,
                deadlineDate: data.deadlineDate
            });



            assignmentExam.save().then((addedExam) => {

                let studentList = [];
                studentController.getByCourse(addedExam.courseCode).then((students) =>{
                    studentList = students.data;
                    console.log("Students  "+studentList);
                }).catch((err)=>[
                    console.log("Error "+err)
                ]);


                let notification = {

                    description: "New Exam "+data.name+" has created",
                    course: addedExam.courseCode,
                    studentreceiverlist:studentList,
                    superuserreceiverlist:null,
                    role:"STUDENT"

                };
                notificationController.insert(notification).then((data) =>{
                        resolve({
                            status: 200,
                            message: 'Sent a notification and added an exam successfully'+ data
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
            AssignmentExamSchema.find().exec().then((data) => {
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
     * getOne method to retrieve data of specified AssignmentExam based on the assignmentExam code
     */

    this.getOne = (assignmentExamCode) => {
        return new Promise(function (resolve, reject) {
            AssignmentExamSchema.find({
                assignmentExamCode : assignmentExamCode
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
     * Delete an existing assignmentExam
     */
    this.deleteOne = (id) => {
        return new Promise(function (resolve, reject) {
            AssignmentExamSchema.remove({
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

    this.update = (assignmentExamCode, data) => {
        return new Promise((resolve, reject) => {
            AssignmentExamSchema.update({assignmentExamCode: assignmentExamCode}, data).then(() => {
                resolve({status: 200, message: "updated the Assignment"});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    }

};
/**
 * assignmentExamController() method is exported for the assignmentExamRouter class's use
 */
module.exports = new assignmentExamController();