const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
//const doctorRoutes = require('./routes/doctorRoutes'); 
require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/doctors',require('./routes/doctoeRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
