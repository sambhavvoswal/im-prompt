import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'server/.env' });

console.log('Testing connection to:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Success!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed:', err.message);
    process.exit(1);
  });
