const mongoose = require('mongoose');

require('dotenv').config();
let initialized = false;

const connect = async () => {
  mongoose.set('strictQuery', true);

  if (initialized) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    // Change dbName to 'stayease' here
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'stayease', // <-- Update the database name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    initialized = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};

module.exports = { connect };
