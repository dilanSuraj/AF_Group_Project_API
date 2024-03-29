let OtherUserSchema = require('../models/otherUser.model');
var EmailController = require('../controllers/email.controller');

var otherUserController = function () {
    /**
     * Insert method insert data into the OtherUser table
     */
    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var otherUser = new OtherUserSchema({
                name : data.name,
                password: data.password,
                email:data.email,
                role:data.role,
                JoinedDate: data.JoinedDate,
                qualifications:data.qualifications
            });



            otherUser.save().then(() => {

                let userRole = data.role;
                if(userRole === ("INSTRUCTOR")){
                    EmailController.sendMail(otherUser);
                }
                resolve({
                    status: 200,
                    message: 'Added a other user successfully'
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
            OtherUserSchema.find().exec().then((data) => {
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
     * getOne method to retrieve data of specified other user based on the email
     */

    this.getByEmail = (email) => {
        return new Promise(function (resolve, reject) {
            OtherUserSchema.find({
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
     * getOne method to retrieve data of specified other user based on the email and password
     */

    this.getByEmailPassword = (email,password) => {
        return new Promise(function (resolve, reject) {
            OtherUserSchema.find({$and:[{
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
            OtherUserSchema.remove({
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
            OtherUserSchema.update({email: email}, data).then(() => {
                resolve({status: 200, message: "updated Other User"});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    };


};
/**
 * otherUserController() method is exported for the otherUserRouter class's use
 */
module.exports = new otherUserController();