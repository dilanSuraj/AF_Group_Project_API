const express = require('express');
let StudentExamSchema = require('../models/student.exam.model');

var studentExamController = function () {
    /**
     * Insert method insert data into the StudentExam table
     */
    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var studentExam = new StudentExamSchema({
                examId : data.examId,
                studentId: data.studentId,
                marks:data.marks
            });



            studentExam.save().then(() => {
                resolve({
                    status: 200,
                    message: 'Added a studentExam successfully'
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
            StudentExamSchema.find().then((data) => {
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
     * getOne method to retrieve data of specified StudentExam based on the Exam code
     */

    this.getOne = (examId) => {
        return new Promise(function (resolve, reject) {
            StudentExamSchema.find({
                examId : examId
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
     * Delete an existing StudentExam
     */
    this.deleteOne = (id) => {
        return new Promise(function (resolve, reject) {
            StudentExamSchema.remove({
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


    this.update = (examId, data) => {
        return new Promise((resolve, reject) => {
            StudentExamSchema.update({_id: examId}, data).then(() => {
                resolve({status: 200, message: "updated Student Exam"});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    };


};
/**
 * studentExamController() method is exported for the studentExamRouter class's use
 */
module.exports = new studentExamController();