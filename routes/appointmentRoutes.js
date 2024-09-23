const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');  // Import Appointment model
const auth = require('../middleware/authMiddleware');  // Ensure authMiddleware is also imported
const mongoose = require('mongoose');

// Route to book an appointment
router.post('/book', auth, async (req, res) => {
    const { doctor, date } = req.body;

    try {
        const appointment = new Appointment({
            user: req.user.id,
            doctor,
            date
        });
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route to generate a UPI payment link for an appointment
router.get('/pay/:appointmentId', auth, async (req, res) => {
    const { appointmentId } = req.params;

    // Validate that the appointmentId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
        return res.status(400).json({ msg: 'Invalid appointment ID' });
    }

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }

        const paymentLink = `upi://pay?pa=praphulraj007@okicici&pn=HospitalManagement&am=500&cu=INR&tid=${appointment._id}`;
        res.json({ paymentLink });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route to update payment status to "completed"
router.put('/pay/:appointmentId/success', auth, async (req, res) => {
    const { appointmentId } = req.params;

    // Validate that the appointmentId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
        return res.status(400).json({ msg: 'Invalid appointment ID' });
    }

    try {
        // Find the appointment by ID
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }

        // Update payment status to "completed"
        appointment.paymentStatus = 'completed';
        await appointment.save();

        res.json({ msg: 'Payment successful', appointment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
