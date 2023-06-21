/* eslint-disable no-underscore-dangle */
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

// DB CONNECTION
mongoose
  .connect(
    'mongodb+srv://admin:andreslanzi123@database.og1zd4q.mongodb.net/test'
  )
  .then(() => console.log('db connected'));

app.use(cors());
app.use(express.static('public'));

// Routing
require('./routes')(app);

app.listen(5005, () => console.log('SERVER WORKING'));

module.exports = app;
