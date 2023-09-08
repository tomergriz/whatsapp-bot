require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./database');  
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', async (req, res) => {
  console.log('Webhook hit:', req.body);

  try {
    const testUser = new User({ phoneNumber: '123456', language: 'en', notes: [], reminders: [] });
    const result = await testUser.save();
    console.log('User saved:', result);
  } catch (err) {
    console.log('Error saving user:', err);
  }

  res.status(200).send('OK/webhook');
});

app.post('*', async (req, res) => {
  console.log('Received POST request:', req.body);  
  res.status(200).send('OK*');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
