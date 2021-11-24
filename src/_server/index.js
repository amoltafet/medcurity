const express = require('express');
const db = require('./config')
const cors = require('cors')

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json())

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

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})