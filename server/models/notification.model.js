const mongoose =  require('mongoose');

const NotificationSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
            required: 'Notification description field cannot be empty'
        },
        course :{
            type: mongoose.Schema.ObjectId,
            ref: 'Course'
        },
        studentreceiverlist:[{
            type: mongoose.Schema.ObjectId,
            ref: 'Student'
        }],
        superuserreceiverlist:[{
            type: mongoose.Schema.ObjectId,
            ref: 'OtherUser'
        }],
        role:{
            type: String
        }
    }
);

module.exports = mongoose.model('Notification',NotificationSchema);
