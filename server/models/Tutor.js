// models/Tutor.js
const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
    name: { type: String,},
    email: { type: String },
    phone: { type: Number,},
    subjects: { type: [String]},
    qualifications: { type: String,},
    experience: { type: Number,},
    image: { type: String,},
    location:{type:String,},
    pincode: { type: Number,},
});

module.exports = mongoose.model('Tutor', TutorSchema);
