require('dotenv').config();
const logger = require('./logger').log;
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

/**
* Launches an Express server that hosts the website API.
* This Express server is configured with the .env file in the root folder.
*/

const LISTEN_PORT = process.env.LISTEN_PORT || 3002

// only use cookies when in production, because it makes sessions not work on localhost (development)
const cookieSettings = (process.env.ENVIRONMENT == 'production') ? { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 48, sameSite: 'none' } : null

app.use(
  express.json(),
  cookieParser(),
  bodyParser.urlencoded({ extended: true }),
  cors({ origin: true, methods: ["GET", "POST"], credentials: true }),
  session({ resave: false, saveUninitialized: true, secret: process.env.SECRET, cookie: cookieSettings })
);

var usersRouter = require('./routes/usersRoutes');
var queryRouter = require('./routes/queryRoutes');
var testingRouter = require('./routes/testingRoutes');
//var adminRouter = require('./routes/adminRoutes');

app.use('/users', usersRouter);
app.use('/api', queryRouter);
app.use('/testing', testingRouter);
//app.use('/admin', adminRouter)

app.listen(LISTEN_PORT, (err) => {
    
    if (err) // console.log('ERROR: ', err)

    // console.log(`-- ENVIRONMENT: ${process.env.ENVIRONMENT} --`)
    // console.log(`API is running on PORT: ${LISTEN_PORT}`)
    // console.log(`API is accessible at is: ${process.env.BASE_URL}`)
    // console.log(cookieSettings ? 'Cookies are enabled' : 'Cookies are disabled.')

})