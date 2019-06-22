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

    this.update = (email,data) => {
        var name = JSON.stringify(data.name);
        var regNumber = JSON.stringify(data.regNumber);
        var password = JSON.stringify(data.password);
        var email = JSON.stringify(data.email);
        var gpa = JSON.stringify(data.gpa);
        var courses = JSON.stringify(data.courses);
        var admissionYear = JSON.stringify(data.admissionYear);



        return new Promise(function (resolve, reject) {
            StudentSchema.find({
                email: email
            }).exec().then((student) => {

                if(!student){

                    student.name = name;
                    student.regNumber = regNumber;
                    student.password = password;
                    student.email = email;
                    student.gpa = gpa;
                    student.courses = courses;
                    student.admissionYear = admissionYear;

                    student.save().then( (data) => resolve({
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
 * studentController() method is exported for the studentRouter class's use
 */
module.exports = new studentController();