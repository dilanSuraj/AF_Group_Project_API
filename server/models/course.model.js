const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Course name field cannot be empty'
        },
        courseId: {
            type: String,
            required: 'Course Id field cannot be empty'
        },
        courseInstructor:{
            type: mongoose.Schema.ObjectId,
            ref: 'OtherUser'
        },
        isCourseAccepted:{
            type: Boolean
        }


    }
);

module.exports = mongoose.model('Course',CourseSchema);
