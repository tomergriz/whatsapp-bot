const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/whatsappBotDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection Error:", err);
});

mongoose.connection.once("open", () => {
    console.log("MongoDB connected!");
});

const userSchema = new mongoose.Schema({
    phoneNumber: String,
    language: String,
    notes: [String],
    reminders: [Date],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
