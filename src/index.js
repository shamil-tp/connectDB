const mongoose = require('mongoose');

const connectDB = async (customUri) => {
  try {
    const uri = customUri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/my_database';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    
    // If called directly via CLI/tests, throw error so node:test catches it
    if (process.env.NODE_ENV === 'test') {
      throw error;
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;