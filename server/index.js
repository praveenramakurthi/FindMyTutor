const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const connectDB = mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/users', require('./routes/users'));
app.use('/api', require('./routes/tutors'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectDB;
    console.log(`Server running on port ${PORT}`)
});
