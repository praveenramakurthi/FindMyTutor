const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword:{
        type: String,
    },
    isTutor: {
        type: Boolean,
        default: false,
    },
    location:{
        type: String,
    },
    qualifications: String,
    subjects: [String],
    ratings: [{
        rating: Number,
        review: String,
    }],
    image:{
        type:"String"
    }
});

module.exports = mongoose.model('User', UserSchema);
