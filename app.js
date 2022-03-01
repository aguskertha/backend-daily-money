const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(cors());
require('dotenv').config();
require('./utils/db');
const router =  require('./src/routes');

app.use('/api/', router);

app.get('/', (req,res) => {
    res.json('Hello World')
})

module.exports = app;
