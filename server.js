const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://instagram:instagram@cluster0.oy88e.mongodb.net/martial?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define the schema for storing form data
const businessSchema = new mongoose.Schema({
    businessName: String,
    studioLocation: String,
    operationDuration: String,
    ownership: String,
    squareFootage: String,
});

// Create the model based on the schema
const Business = mongoose.model('Business', businessSchema);

// Handle form submission
app.post('/api/submit-form', (req, res) => {
    // Debugging output to log received form data
    console.log('Form Data Received:', req.body);
    
    // Create a new business document with the received data
    const { businessName, studioLocation, operationDuration, ownership, squareFootage } = req.body;

    const newBusiness = new Business({
        businessName,
        studioLocation,
        operationDuration,
        ownership,
        squareFootage,
    });

    // Save to MongoDB
    newBusiness.save()
        .then(() => {
            res.json({ success: true, message: 'Data saved successfully' });
        })
        .catch((error) => {
            console.error('Error saving form data:', error);
            res.json({ success: false, message: 'Error saving data, please try again' });
        });
});

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});