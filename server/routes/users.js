const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer=require('multer');
const router = express.Router();
const authenticateToken = require('../middleware/authenticatetoken');
// Register route
router.post('/register', async (req, res) => {
    const { email, password, confirmPassword, isTutor } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password, confirmPassword, isTutor });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email or password not matched' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Email or password not matched' });
        }

        const payload = { _id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Omit password from user object before sending it in the response
        const userResponse = { ...user.toJSON(), password: undefined, confirmPassword: undefined };

        return res.status(200).json({ token, user: userResponse });
    } catch (err) {
        console.error('Error logging in:', err);
        return res.status(500).json({ error: 'An error occurred while logging in.' });
    }
});


// // Multer configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/profiles'); // Directory to save uploaded files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Unique file name
//     }
// });

// const upload = multer({ storage: storage });

// // Update user profile route with image upload
// router.patch('/profile', upload.single('image'), async (req, res) => {
//     const { name, email, location } = req.body;
//     // let imageUrl = '';

//     try {
//         // Find user by email (assuming email is unique)
//         let user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         // Update user profile fields
//         user.name = name;
//         user.email = email;
//         user.location = location;

//         if (req.file) {
//             const imageUrl = '/uploads/profiles/' + req.file.filename; // Path to uploaded file
//             user.image = imageUrl; // Save image URL or path in user document
//         }

//         // Save updated user data
//         await user.save();

//         res.json({ msg: 'Profile updated successfully', user, image: imageUrl });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// PATCH route for updating user profile
// Example of handling errors in your Express route
router.patch('/profile', authenticateToken, async (req, res) => {
    const { email, ...updatedData } = req.body;

    try {
        const user = await User.findOneAndUpdate({ email }, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error updating profile' });
    }
});





module.exports = router;
