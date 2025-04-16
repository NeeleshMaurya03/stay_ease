const mongoose = require('mongoose');
const { connect } = require('./src/lib/mongodb/mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const testDb = async () => {
  await connect();

  try {
    const user = await User.create({ name: 'Test User', email: 'test@example.com' });
    console.log('✅ User inserted:', user);
  } catch (err) {
    console.error('❌ Error inserting user:', err);
  }
};

testDb();
