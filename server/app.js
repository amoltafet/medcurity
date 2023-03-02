require('dotenv').config();
const logger = require('./logger').log;
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const cookieSettings = (process.env.COOKIES === 'enabled') ? { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 48, sameSite: 'none' } : null;

app.use(
  express.json(),
  cookieParser(),
  bodyParser.urlencoded({ extended: true }),
  cors({ origin: true, methods: ["GET", "POST"], credentials: true }),
  session({ secret: 'krunal', resave: false, saveUninitialized: true, }),
);

var usersRouter = require('./routes/usersRoutes');
var queryRouter = require('./routes/queryRoutes');
var testingRouter = require('./routes/testingRoutes');
var modulesRouter = require('./routes/modulesRoutes');
var statsRouter = require('./routes/statsRoutes');

app.use('/users', usersRouter);
app.use('/api', queryRouter);
app.use('/testing', testingRouter);
app.use('/modules', modulesRouter);
app.use('/stats', statsRouter);

app.get('/', function (req, res) {
  res.send('Hello World!  Use Azure! This is the base url for deployment purposes only. (This is the default route) Test 1');
});

console.log('-- Launched with node --')
const LISTEN_PORT = process.env.LISTEN_PORT || 3002

app.listen(LISTEN_PORT, (err) => {
    console.log('API CONNECTION INFO:')
    console.log('\t- HTTP API Server running on PORT: ' + LISTEN_PORT);
    console.log(`\t- API is accessible at is: http://localhost:${LISTEN_PORT}`);
    console.log(cookieSettings ? '\t- Cookies are enabled' : '\t- Cookies are disabled.')
    console.log(err ? err : '')
  }).on('error', (err) => {
    console.log(err);
  }
  );

/**
 * Checks if the certificates are present in a given directory
 */
 function checkCerts(filesList, certNames) {
  return certNames.every(val => filesList.includes(val));
}
