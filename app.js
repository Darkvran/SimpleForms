const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const keys = require('./config/keys');

const app = express ();

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB подключен.'))
    .catch(error => console.log(error));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);


module.exports = app;