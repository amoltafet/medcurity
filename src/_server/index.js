const express = require('express');
const db = require('./config')
const cors = require('cors')
const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json())

// IMPORTANT: To start up the middleware server, open a PowerShell window (or similar) in the /_server folder
// and do the following command: node index.js
// An output message saying "Server is running on 3002" should appear.

// Below are two example queries. When the middleware server is running, if it receives a GET HTTP request 
// (for example, from QuizPage.js via axios), then accept the request and run the query.
// When the query completes, respond to the GET request by sending back the query result.

// Route to get all questions by category
app.get("/api/getCategoryQuestions", (req,res)=>{
    db.query(`SELECT * FROM Questions WHERE category = '${req.query.filter}'`, (err,result) =>
    {
        if(err) console.log(err)
        res.send(result)
    }
        );   
});

// Route to get number of questions in category
app.get("/api/getCategoryLength", (req,res)=>{
    db.query(`SELECT COUNT(*) AS catalength FROM Questions WHERE category = '${req.query.filter}'`, (err,result) =>
    {
        if(err) console.log(err)
        res.send(result)
    }
        );   
});

// Listen for GET/POST requests on port 3002
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})