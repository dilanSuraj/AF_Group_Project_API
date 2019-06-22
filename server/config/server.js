const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 4000;

//Middleware by calling 'use'
app.use(cors());
app.use(bodyParser.json());

const courseRouteHandler = require('../routes/course.routes');
const assignmentExamRouteHandler = require('../routes/assignment.exam.routes');
const notificationRouteHandler = require('../routes/notification.routes');
const otherUserRouteHandler = require('../routes/otherUser.routes');
const studentRouteHandler = require('../routes/student.routes');
const studentExamRouteHandler = require('../routes/student.exam.routes');


mongoose.connect('mongodb+srv://estudentinfoapp:estudentinfoapp@unidb-af1bs.mongodb.net/test?retryWrites=true&w=majority');

//Get the mongodb connection
const connection = mongoose.connection;

//execute if the mongodb connection is open
connection.once('open', function () {
    console.log('Mongo DB connection established successfully')
});

//Base URL
app.use('/api/courses',courseRouteHandler);
app.use('/api/assignmentexams',assignmentExamRouteHandler);
app.use('/api/notifications',notificationRouteHandler);
app.use('/api/otherusers',otherUserRouteHandler);
app.use('/api/students',studentRouteHandler);
app.use('/api/studentexams',studentExamRouteHandler);


//Start the server
app.listen(PORT, function () {
    console.log('Server is listening to the port ',PORT);
});