import mongoose from 'mongoose';
import properties from '../config/propertydb';

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

module.exports = mongoose.model('StudentExam',StudentExamSchema,properties.database);