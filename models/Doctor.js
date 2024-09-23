const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    availability: { type: [String], required: true }  // Array of available times
});

module.exports = mongoose.model('Doctor', DoctorSchema);
