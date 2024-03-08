const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/user.js');

const app = express();
app.use(cors());
app.use(express.json());

const dbUrl = 'mongodb://127.0.0.1:27017/Grassroot';

// mongodb connection
mongoose.connect(dbUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


app.get('/', (req, res) => {
    res.send('Welcome, I am root!');
})

// Create an employee

app.post('/create', async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const user = new UserModel({ name, phone, email });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(400).json({ error: 'Failed to save user' });
    }
});

// Get all users
app.get('/user', async (req, res) => {
    try {
        const employees = await UserModel.find();
        res.send(employees);
    } catch (error) {
        res.status(500).send(error);
    }
});


// localhost port number
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
