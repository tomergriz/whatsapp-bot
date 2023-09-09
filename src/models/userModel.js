const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: String,
    language: String,
    notes: [{ content: String, timestamp: Date }],
    reminders: [Date],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
