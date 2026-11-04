# @shamil-tp/connectdb

[![npm version](https://img.shields.io/npm/v/@shamil-tp/connectdb.svg)](https://www.npmjs.com/package/@shamil-tp/connectdb)
[![npm downloads](https://img.shields.io/npm/dm/@shamil-tp/connectdb.svg)](https://www.npmjs.com/package/@shamil-tp/connectdb)
[![license](https://img.shields.io/npm/l/@shamil-tp/connectdb.svg)](https://github.com/shamil-tp/connectDB/blob/main/LICENSE)

A lightweight MongoDB connection utility for Node.js using Mongoose.

## Features

- Zero-configuration MongoDB setup for Mongoose.
- Fallback to `process.env.MONGO_URI` or local `mongodb://127.0.0.1:27017/my_database`.
- Supports custom connection URI parameters.
- Clean error handling for test runners and CLI verification.

## Installation

```bash
npm install @shamil-tp/connectdb