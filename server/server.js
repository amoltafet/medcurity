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

const LISTEN_PORT = serverConfig.server.LISTEN_PORT
const ORIGIN_PORT = serverConfig.server.ORIGIN_PORT
const BASE_URL = serverConfig.server.BASE_URL
const FULL_URL = BASE_URL + ORIGIN_PORT
const METHODS = serverConfig.server.METHODS
const SECRET = serverConfig.server.SECRET
const STATIC_PATH = '/client/build'

app.use(
  express.json(),
  cookieParser(),
  bodyParser.urlencoded({ extended: true }),
  cors({ origin: [`${FULL_URL}`], methods: METHODS, credentials: true }),
  session({ resave: true, saveUninitialized: true, secret: SECRET })
);

var usersRouter = require('./routes/usersRoutes');
var queryRouter = require('./routes/queryRoutes');
//var adminRouter = require('./routes/adminRoutes');

app.use('/users', usersRouter);
app.use('/api', queryRouter);
//app.use('/admin', adminRouter)

// Serve static files from the React app, must be uncommented for production
app.use(express.static(path.join(__dirname, STATIC_PATH)));

app.listen(LISTEN_PORT, (err) => {
    
    if (err) console.log('ERROR: ', err)

    console.log(`API is running on ${LISTEN_PORT}`)
    console.log(`Server is running on ${FULL_URL}`)
    logger.log('info', `Server is running on "PORT: ${ORIGIN_PORT}"`, { service: 'api-service' })

})