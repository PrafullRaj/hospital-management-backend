const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],  // Ensure name is required with a custom error message
    },
    email: {
        type: String,
        required: [true, 'Email is required'],  // Ensure email is required with a custom error message
        unique: true,  // Ensure email is unique
        match: [/.+\@.+\..+/, 'Please enter a valid email address']  // Validate email format
    },
    password: {
        type: String,
        required: [true, 'Password is required'],  // Ensure password is required
        minlength: [6, 'Password must be at least 6 characters long']  // Enforce minimum password length
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],  // Restrict role to predefined values
        default: 'patient'  // Default role is patient
    },
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
    // If the password hasn't been modified, skip hashing
    if (!this.isModified('password')) {
        return next();
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);
