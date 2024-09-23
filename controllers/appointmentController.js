const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
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
};

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id }).populate('doctor');
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
