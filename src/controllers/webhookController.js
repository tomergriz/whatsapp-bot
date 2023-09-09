const User = require("../models/userModel");
const twilio = require("twilio");
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.handleWebhook = async (req, res) => {
    console.log("Webhook hit:", req.body);

    try {
        const fromPhoneNumber = req.body.From.slice(9);
        console.log("Sliced Phone Number: ", fromPhoneNumber);

        const messageContent = req.body.Body.toLowerCase();
        console.log("Received Message Content: ", messageContent);

        const user = await User.findOne({ phoneNumber: fromPhoneNumber });
        console.log("Found user: ", user);

        if (!user) {
            const newUser = new User({ phoneNumber: fromPhoneNumber, language: "en", notes: [], reminders: [] });
            const savedUser = await newUser.save();
            console.log("New user saved: ", savedUser);

            try {
                const sentMessage = await client.messages.create({
                    body: 'Welcome to WhatsApp Bot! Type "help" to see available commands.',
                    from: "whatsapp:+14155238886",
                    to: "whatsapp:+972" + fromPhoneNumber,
                });
                console.log("Welcome message sent: ", sentMessage);
            } catch (twilioError) {
                console.log("Error sending welcome message: ", twilioError);
            }
        } else {
            console.log("User already exists: ", user);

            try {
                const sentMessage = await client.messages.create({
                    body: "This is your reply from the WhatsApp Bot!",
                    from: "whatsapp:+14155238886",
                    to: "whatsapp:" + fromPhoneNumber,
                });
                console.log("Reply message sent: ", sentMessage);
            } catch (twilioError) {
                console.log("Error sending reply message: ", twilioError);
            }
        }
    } catch (mongoError) {
        console.log("MongoDB Error:", mongoError);
    }

    res.status(200).send("OK");
};
