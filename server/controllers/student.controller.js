const express = require('express');
let StudentSchema = require('../models/student.model');

var studentController = function () {
    /**
     * Insert method insert data into the AssignmentExam table
     */
    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var student = new StudentSchema({
                name : data.name,
                regNumber: data.regNumber,
                password: data.password,
                email:data.email,
                admissionYear:data.admissionYear,
                gpa: data.gpa,
                courses:data.courses
            });

            student.save().then(() => {
                resolve({
                    status: 200,
                    message: 'Added a student successfully'
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
            StudentSchema.find().exec().then((data) => {
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
     * getOne method to retrieve data of specified Student based on the email
     */

    this.getByEmail = (email) => {
        return new Promise(function (resolve, reject) {
            StudentSchema.find({
                email : email
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

    this.getByCourse = (courseId) => {
        return new Promise(function (resolve, reject) {
            StudentSchema.find().exec().then((allStudents) => {

                let StudentsObjectsList = [];

                for (let student of allStudents){

                    for(let course of student.courses){

                         if(course === courseId){
                             StudentsObjectsList.push(student._id);
                         }

                    }

                }

                resolve({
                    status: 200,
                    data: StudentsObjectsList
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
     * getOne method to retrieve data of specified Student based on the email and password
     */

    this.getByEmailPassword = (email,password) => {
        return new Promise(function (resolve, reject) {
            StudentSchema.find({$and:[{
                    email: email,
                    password: password
                }]}).exec().then((data) => {
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
     * Delete an existing student
     */
    this.deleteOne = (id) => {
        return new Promise(function (resolve, reject) {
            StudentSchema.remove({
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

    this.update = (email, data) => {
        return new Promise((resolve, reject) => {
            StudentSchema.update({email: email}, data).then(() => {
                resolve({status: 200, message: "updated Other User"});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    };

};
/**
 * studentController() method is exported for the studentRouter class's use
 */
module.exports = new studentController();