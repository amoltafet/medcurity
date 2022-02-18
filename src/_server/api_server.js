// IMPORTANT: To start up the middleware server, open a PowerShell window (or similar) in the /_server folder
// and do the following command: node index.js
// An output message saying "Server is running on 3002" should appear.

// Below are two example queries. When the middleware server is running, if it receives a GET HTTP request 
// (for example, from QuizPage.js via axios), then accept the request and run the query.
// When the query completes, respond to the GET request by sending back the query result.

const express = require('express');
const cors = require('cors')
const API_CONFIG = require('./api_config.json')
const app = express();
//app.use(cors());

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.json())

app.use(cookieParser());
app.use(
  cors({
    origin: [`${API_CONFIG.BASE_URL + API_CONFIG.ORIGIN_PORT}`],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

var the_session =   session({
  resave: true,
  saveUninitialized: true,
  secret: "subscribe",
  cookie: {
    expires: 60 * 60 * 24,
  },
})

app.use(the_session);

var usersRouter = require('./routes/usersRoutes');
var queryRouter = require('./routes/queryRoutes');
//var adminRouter = require('./routes/adminRoutes');

app.use('/users', the_session, usersRouter);
app.use('/api', the_session, queryRouter);
//app.use('/admin', adminRouter)

// Listen for API requests
app.listen(API_CONFIG.API_PORT, (err)=>{
    
    if (err) console.log('ERROR: ', err)

    console.log(`Server is running on ${API_CONFIG.API_PORT}`)
})