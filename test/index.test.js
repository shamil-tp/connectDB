const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const connectDB = require('../src/index');

describe('connectDB', () => {
  let originalConnect;
  let originalExit;
  let originalLog;
  let originalError;

  let loggedMessages = [];
  let errorMessages = [];
  let exitCode = null;

  beforeEach(() => {
    // Preserve original functions
    originalConnect = mongoose.connect;
    originalExit = process.exit;
    originalLog = console.log;
    originalError = console.error;

    loggedMessages = [];
    errorMessages = [];
    exitCode = null;

    // Spy on console output
    console.log = (msg) => loggedMessages.push(msg);
    console.error = (msg) => errorMessages.push(msg);

    // Mock process.exit so it doesn't terminate the runner
    process.exit = (code) => {
      exitCode = code;
    };
  });

  afterEach(() => {
    // Restore original functions
    mongoose.connect = originalConnect;
    process.exit = originalExit;
    console.log = originalLog;
    console.error = originalError;
  });

  test('should log connection host on successful connection', async () => {
    // Mock successful connection
    mongoose.connect = async () => ({
      connection: { host: '127.0.0.1' }
    });

    await connectDB();

    assert.strictEqual(loggedMessages.length, 1);
    assert.ok(loggedMessages[0].includes('MongoDB Connected: 127.0.0.1'));
    assert.strictEqual(exitCode, null);
  });

  test('should log error and exit process with code 1 on failure', async () => {
    // Mock failed connection
    mongoose.connect = async () => {
      throw new Error('Connection refused');
    };

    await connectDB();

    assert.strictEqual(errorMessages.length, 1);
    assert.ok(errorMessages[0].includes('Database Connection Error: Connection refused'));
    assert.strictEqual(exitCode, 1);
  });
});