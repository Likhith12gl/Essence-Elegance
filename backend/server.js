const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const testimonialRoutes = require('./routes/testimonialRoutes');

require('dotenv').config();

// Check if required environment variables are present
if (!process.env.DB_URL) {
    console.error('Missing DB_URL environment variable');
    process.exit(1);
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if DB connection fails
});

// Testimonial routes
app.use('/testimonials', testimonialRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
