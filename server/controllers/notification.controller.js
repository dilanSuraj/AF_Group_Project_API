const express = require('express');
let NotificationSchema = require('../models/notification.model');

var notificationController = function () {
    /**
     * Insert method insert data into the notification table
     */
    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var notification = new NotificationSchema({
                description : data.description,
                course:data.course,
                studentreceiverlist: data.studentreceiverlist,
                superuserreceiverlist: data.superuserreceiverlist,
                role:data.role
            });



            notification.save().then(() => {
                resolve({
                    status: 200,
                    message: 'Added a notification successfully'
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
            NotificationSchema.find().exec().then((data) => {
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
     * getOne method to retrieve data of specified notification based on the notification code
     */

    this.getOne = (receiver,role) => {
        return new Promise(function (resolve, reject) {
            NotificationSchema.find({$and:[{
                    receiver: receiver,
                    role: role
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

};
/**
 * notificationController() method is exported for the notificationRouter class's use
 */
module.exports = new notificationController();