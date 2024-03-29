const mongoose =  require('mongoose');

const AssignmentExamSchema = new mongoose.Schema(
    {
        assignmentExamCode: {
            type: String,
            required: 'Cannot be empty'
        },
        description: {
            type: String,
            trim: true,
            required: 'Description field cannot be empty'
        },
        courseCode: {
            type: mongoose.Schema.ObjectId,
            ref: 'Course'
        },
        typeOfExam: {
            type: String,
            trim: true,
            enum: ['CA','FINAL']
        },
        marks: {
             type: Number
        },
        deadlineDate: {
            type: String
        }
    }
);


module.exports = mongoose.model('AssignmentExam', AssignmentExamSchema);
