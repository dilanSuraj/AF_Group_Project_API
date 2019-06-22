const mongoose =  require('mongoose');


const OtherUserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Name field cannot be empty'
        },
        password: {
            type: String,
            required: 'Password field cannot be empty'
        },
        email: {
            type: String,
            trim: true,
            unique: 'Email already exists',
            match: [/.+\@.+\..+/, 'Please enter a valid email address'],
            required: 'Email is required'
        },
        role: {
          type: String
        },
        JoinedDate: {
            type: Date,
            default: Date.now
        },
        qualifications:{
          type: String
        }
    }
);

module.exports = mongoose.model('OtherUser',OtherUserSchema);
