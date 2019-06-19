const mongoose =  require('mongoose');

const StudentExamSchema = new mongoose.Schema(
    {

        examId: {
            type: mongoose.Schema.ObjectId,
            ref: 'AssignmentExam'
        },
        studentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Student'
        },
        marks: {
            type: Number

        }
    }
);

module.exports = mongoose.model('StudentExam',StudentExamSchema);