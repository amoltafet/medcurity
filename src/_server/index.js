const express = require('express');
const db = require('./config')
const cors = require('cors')
const app = express();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const PORT = 3002;
app.use(cors());
app.use(express.json())

// IMPORTANT: To start up the middleware server, open a PowerShell window (or similar) in the /_server folder
// and do the following command: node index.js
// An output message saying "Server is running on 3002" should appear.

// Below are two example queries. When the middleware server is running, if it receives a GET HTTP request 
// (for example, from QuizPage.js via axios), then accept the request and run the query.
// When the query completes, respond to the GET request by sending back the query result.

// Returns query based on input
app.get("/api/getQuery", (req,res)=>{
    db.query(`${req.query.the_query}`, (err,result) => {
        console.log(req.query.id)
        if (err) console.log(err)
        console.log(`LISTEN SERVER: GOT RESULTS FROM "${req.query.the_query}" QUERY`)
        console.log(result)
        res.send(result)
    })
});

app.post("/api/register", (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const username = email.substring(0, email.indexOf("@"));
    console.log('REGISTERED WITH CREDENTIALS:', req.body.email, req.body.password, username)

    /*bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) console.log(err);
        db.query("INSERT INTO Users (username, email, password) VALUES (?,?,?)", [username, email, hash], (err, result) => {
            console.log(err);
            res.send(result)
        }
        );
    });*/
});

// Returns learning module content info given an ID (ex. Privacy module has an ID of 1)
app.get("/api/getModuleInfo", (req,res)=>{
    db.query(`SELECT * FROM LearningModules WHERE ID = ${req.query.id}`, (err,result) => {
        console.log(req.query.id)
        if (err) console.log(err)
        console.log(`LISTEN SERVER: GOT INFO FROM "${req.query.id}" MODULE`)
        console.log(result)
        res.send(result)
    })
});

// Returns learning module questions info given an ID 
app.get("/api/getModuleQuestions", (req,res)=>{
    db.query(`SELECT * FROM Questions WHERE module = ${req.query.id}`, (err,result) => {
        console.log(req.query.id)
        if (err) console.log(err)
        console.log(`LISTEN SERVER: GOT QUESTIONS FROM "${req.query.id}" MODULE`)
        console.log(result)
        res.send(result)
    })
});

// Returns learning module directory info given an ID 
app.get("/api/getModuleDirectoryInfo", (req,res)=>{
    db.query(`SELECT * FROM LearningModulesDirectory WHERE module = ${req.query.id}`, (err,result) => {
        console.log(req.query.id)
        if (err) console.log(err)
        console.log(`LISTEN SERVER: GOT QUESTIONS FROM "${req.query.id}" MODULE`)
        console.log(result)
        res.send(result)
    })
});

// Returns info on learning modules associated with a given module directory id
app.get("/api/getDirectoryModulesInfo", (req,res)=>{
    db.query(`SELECT * FROM LearningModules WHERE DirId = ${req.query.id}`, (err,result) => {
        console.log(req.query.id)
        if (err) console.log(err)
        console.log(`LISTEN SERVER: GOT QUESTIONS FROM "${req.query.id}" MODULE`)
        console.log(result)
        res.send(result)
    })
});

// Listen for GET/POST requests on port 3002
app.listen(PORT, (err)=>{
    
    if (err) console.log('ERROR: ', err)

    console.log(`Server is running on ${PORT}`)
})

// EVERYTHING BELOW WILL BE DEFUNCT
// EVERYTHING BELOW WILL BE DEFUNCT
// EVERYTHING BELOW WILL BE DEFUNCT

/*app.get("/api/getCategoryQuestions", (req,res)=>{
    db.query(`SELECT * FROM Questions WHERE category = '${req.query.filter}'`, (err,result) =>
    {
        if(err)
        {
            console.log(err)
            console.log('FAIL: /api/getCategoryQuestions')
        }
        else
        {
            res.send(result)
            console.log('SUCCESS: /api/getCategoryQuestions')
        }
    }
        );
});

// Route to get number of questions in category
app.get("/api/getCategoryLength", (req,res)=>{
    db.query(`SELECT COUNT(*) AS catalength FROM Questions WHERE category = '${req.query.filter}'`, (err,result) =>
    {
        if(err)
        {
            console.log(err)
            console.log('FAIL: /api/getCategoryQuestions')
        }
        else
        {
            res.send(result)
            console.log('SUCCESS: /api/getCategoryLength')
        }
    }
        );   
});*/

// Route to get a specific learning module 
/*app.get("/api/getLearningModule", (req,res)=>{
    db.query(`SELECT * FROM LearningModules WHERE id = '${req.query.filter}'`, (err,result) =>
    {
        if(err)
        {
            console.log(err)
            console.log('FAIL: /api/getLearningModule')
        }
        else
        {
            res.send(result)
            console.log('SUCCESS: /api/getLearningModule')
        }
    }
        );
});*/