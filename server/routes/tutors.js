
const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');

router.post('/addtutor', async (req, res) => {
    const { name, email, phone, subjects, qualifications, experience, image, pincode } = req.body;

    try {
        const existingTutor = await Tutor.findOne({ email });
        if (existingTutor) {
            return res.status(400).json({ msg: 'Tutor with this email already exists' });
        }

        const newTutor = new Tutor({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            subjects: req.body.subjects,
            qualifications: req.body.qualifications,
            experience: req.body.experience,
            image: req.body.image,
            location: req.body.location,
            pincode: req.body.pincode
        });

        const tutor = await newTutor.save();
        res.json(tutor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/tutors', async (req, res) => {
    try {
        const tutors = await Tutor.find();
        res.json(tutors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;