const User = require('../models/userModel');
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.handleWebhook = async (req, res) => {
  console.log('Webhook hit:', req.body);

  try {
    const fromPhoneNumber = req.body.From.slice(9);  
    const messageContent = req.body.Body.toLowerCase(); 

    const user = await User.findOne({ phoneNumber: fromPhoneNumber });
    
    if (!user) {
      const newUser = new User({ phoneNumber: fromPhoneNumber, language: 'en', notes: [], reminders: [] });
      await newUser.save();
      
      client.messages.create({
        body: 'Welcome to WhatsApp Bot! Type "help" to see available commands.',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+972' + fromPhoneNumber
      });
    }
  } catch (err) {
    console.log('Error:', err);
  }

  res.status(200).send('OK');
};
