require('dotenv').config();
const logger = require('./logger').log;
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

/**
* Launches an Express server that hosts the website API.
* This Express server is configured with the .env file in the root folder.
*
* NOTE: This Express server (app.js) must be launched from the server folder so
* it can use the correct .env file.
* 
* Command to launch with passenger, use: passenger start --app-type node --startup-file app.js --port 3002
* Command to launch with node: use:      node app.js
*/

const app = express();
const cookieSettings = (process.env.COOKIES === 'enabled') ? { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 48, sameSite: 'none' } : null


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
var modulesRouter = require('./routes/modulesRoutes');

app.use('/users', usersRouter);
app.use('/api', queryRouter);
app.use('/testing', testingRouter);
app.use('/modules', modulesRouter)

/**
 * If the server is launched with Passenger:
 * 1. Add the certs that are present in the project root
 * 2. Make the server listen on the port specified by the Passenger command
 * 
 * Otherwise, make the server listen on the port specified in the server/.env file.
 */

if (typeof(PhusionPassenger) !== 'undefined')
{
  console.log('-- Launched with Phusion Passenger --')
  console.log('\t- Phusion Passenger detected! Adding certs...')

  if (!checkCerts(fs.readdirSync('../'), [process.env.CERT_KEYNAME, process.env.CERT_CERTNAME]))
  {
    //console.log(`\t- Could not find '${process.env.CERT_KEYNAME}' and '${process.env.CERT_CERTNAME}' in the project root!`)
    throw new Error(`\t- Could not find '${process.env.CERT_KEYNAME}' and '${process.env.CERT_CERTNAME}' in the project root!`);
  }
  
  const httpsServer = https.createServer({
    key: fs.readFileSync(`../${process.env.CERT_KEYNAME}}`),
    cert: fs.readFileSync(`../${process.env.CERT_CERTNAME}`),
  }, app);

  console.log('\t- Successfully added certs!')

  const LISTEN_PORT = 'passenger' || 3002

  httpsServer.listen(LISTEN_PORT, () => {
    console.log('API CONNECTION INFO:')
    console.log('\t- HTTP API Server running via Phusion Passenger');
    console.log(cookieSettings ? '\t- Cookies are enabled' : '\t- Cookies are disabled.')
  });
}
else
{
  console.log('-- Launched with node --')
  const LISTEN_PORT = process.env.LISTEN_PORT || 3002

  app.listen(LISTEN_PORT, '0.0.0.0', (err) => {
    console.log('API CONNECTION INFO:')
    console.log('\t- HTTP API Server running on PORT: ' + LISTEN_PORT);
    console.log(`\t- API is accessible at is: http://localhost:${LISTEN_PORT}`)
    console.log(cookieSettings ? '\t- Cookies are enabled' : '\t- Cookies are disabled.')
  }).on('error', (err) => {
    console.log(err);
  }
  );
}

/**
 * Checks if the certificates are present in a given directory
 */
 function checkCerts(filesList, certNames) {
  return certNames.every(val => filesList.includes(val));
}

/*app.listen(LISTEN_PORT, (err) => {
    
    if (err) console.log('API ERROR --> ', err)

    //console.log(`-- ENVIRONMENT: ${process.env.NODE_ENV || "Not set, please define NODE_ENV"} --`)
    console.log((typeof(PhusionPassenger) !== 'undefined') ? '-- Running with Phusion Passenger --' : '-- Running on node --')
    console.log('API CONNECTION INFO:')
    console.log(`\tAPI is running on PORT: ${LISTEN_PORT}`)
    console.log(`\tAPI is accessible at is: http://localhost:${LISTEN_PORT}`)
    console.log('API SETTINGS:')
    console.log(cookieSettings ? '\tCookies are enabled' : '\tCookies are disabled.')

})*/