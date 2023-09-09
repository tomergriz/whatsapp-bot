const mongoose = require('mongoose');

const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/whatsappBotDB';

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Mongoose Connection Error:', err));