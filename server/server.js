require('dotenv').config();
const logger = require('./logger').log;
const express = require('express');
const cors = require('cors');
const path = require('path');
const serverConfig = require('./serverConfig.json');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

/**
* Launches the express server on the port specified in serverConfig.json.
* Website is accessible through the port this server listens on.
*/

const LISTEN_PORT = process.env.LISTEN_PORT || 3002
const METHODS = serverConfig.server.METHODS
const SECRET = serverConfig.server.SECRET

// only use cookies when in production, because it makes sessions not work on localhost
const cookieSettings = (process.env.ENVIRONMENT == 'production') ? { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 48, sameSite: 'none' } : null

app.use(
  express.json(),
  cookieParser(),
  bodyParser.urlencoded({ extended: true }),
  cors({ origin: true, methods: METHODS, credentials: true }),
  session({ resave: false, saveUninitialized: true, secret: SECRET, cookie: cookieSettings })
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
    
    if (err) console.log('ERROR: ', err)

    console.log(`-- ENVIRONMENT: ${process.env.ENVIRONMENT} --`)
    console.log(`API is running on PORT: ${LISTEN_PORT}`)
    console.log(`BASE_URL is: ${process.env.BASE_URL}`)

})

// Serve static files from the React app, must be uncommented for production deployment
/*app.use(express.static(path.join(__dirname, STATIC_PATH)));
app.use(express.static("client"));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, STATIC_PATH, "index.html"));
});*/