const { test, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const connectDB = require('../src/index');

process.env.NODE_ENV = 'test';

// Read from process.env.MONGO_URI or fallback to positional arg
const connectionString = process.env.MONGO_URI || process.argv.find(arg => arg.startsWith('mongodb'));

test('Verify MongoDB connection string', async () => {
  assert.ok(
    connectionString,
    'Missing connection string! Provide via MONGO_URI="mongodb://..." npm test'
  );

  console.log(`Testing connection against: ${connectionString}`);

  const conn = await connectDB(connectionString);
  assert.ok(conn.connection.host, 'Expected active host in connection object');
});

after(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});