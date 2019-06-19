import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
            required: 'Notification description field cannot be empty'
        },
        notificationCode: {
            type: String,
            trim: true,
            required: 'Notification code field cannot be empty'
        },
        receiverList: {
            studentList:[{
                          type: mongoose.Schema.ObjectId,
                          ref: 'Student'
                        }],
            OtherUserList:[{
                type: mongoose.Schema.ObjectId,
                ref: 'OtherUser'
            }]

        }
    }
);

module.exports = mongoose.model('Notification',NotificationSchema);
