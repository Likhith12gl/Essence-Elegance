const express = require('express');
const Testimonial = require('../models/Testimonial');
const router = express.Router();

// Get all testimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (error) {
        res.status(500).send('Error fetching testimonials');
    }
});

// Post a new testimonial
router.post('/', async (req, res) => {
    const { name, message } = req.body;
    const newTestimonial = new Testimonial({ name, message });
    
    try {
        await newTestimonial.save();
        res.status(201).json(newTestimonial);
    } catch (error) {
        res.status(400).send('Error saving testimonial');
    }
});

module.exports = router;
