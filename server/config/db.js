
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`Database Host: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);

  } catch (error) {
    console.error('\n❌ MongoDB Connection Failed');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Code:', error.code || 'Not provided');

    if (error.cause) {
      console.error('Underlying Cause:', error.cause);
    }

   if (error.reason?.servers) {
  for (const [address, server] of error.reason.servers) {
    console.error('\nServer:', address);
    console.error('Network Error:', server.error?.message);
    console.error('Cause:', server.error?.cause?.message);
  }
}

    process.exit(1);
  }
};

module.exports = connectDB;

