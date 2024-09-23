const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Route to add a doctor
router.post('/add', async (req, res) => {
    const { name, specialization, availability } = req.body;

    try {
        const doctor = new Doctor({
            name,
            specialization,
            availability
        });
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
