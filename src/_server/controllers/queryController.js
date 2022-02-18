// Returns query based on input
const db = require('../db_config')

const getQuery = (req,res) => 
{
    console.log('queryController: getQuery')
    db.query(`${req.query.the_query}`, (err,result) => {
        console.log(req.body.id)
        if (err) console.log(err)
        console.log(`LISTEN SERVER: GOT RESULTS FROM "${req.body.the_query}" QUERY`)
        console.log(result)
        res.send(result)
    })
}

// Returns learning module content info given an ID (ex. Privacy module has an ID of 1)
const queryModuleInfo = (req,res)=>{
    db.query(`SELECT * FROM LearningModules WHERE ID = ${req.query.id}`, (err,result) => {
        console.log(req.query.id)
        if (err) console.log(err)
        console.log(`LISTEN SERVER: GOT INFO FROM "${req.query.id}" MODULE`)
        console.log(result)
        res.send(result)
    })
}

// Returns learning module questions info given an ID 
const queryModuleQuestions = (req,res)=>{
    db.query(`SELECT * FROM Questions WHERE module = ${req.query.id}`, (err,result) => {
        console.log(req.query.id)
        if (err) console.log(err)
        console.log(`LISTEN SERVER: GOT QUESTIONS FROM "${req.query.id}" MODULE`)
        console.log(result)
        res.send(result)
    })
}

// Returns learning module directory info given an ID 
const queryModuleDirectoryInfo = (req,res)=>{
    db.query(`SELECT * FROM LearningModulesDirectory WHERE module = ${req.query.id}`, (err,result) => {
        console.log(req.query.id)
        if (err) console.log(err)
        console.log(`LISTEN SERVER: GOT QUESTIONS FROM "${req.query.id}" MODULE`)
        console.log(result)
        res.send(result)
    })
}

// Returns info on learning modules associated with a given module directory id
const queryDirectoryModulesInfo = (req,res)=>{
    db.query(`SELECT * FROM LearningModules WHERE DirId = ${req.query.id}`, (err,result) => {
        console.log(req.query.id)
        if (err) console.log(err)
        console.log(`LISTEN SERVER: GOT QUESTIONS FROM "${req.query.id}" MODULE`)
        console.log(result)
        res.send(result)
    })
}

module.exports = 
{
    getQuery,
    queryModuleInfo,
    queryModuleQuestions,
    queryModuleDirectoryInfo,
    queryDirectoryModulesInfo,
};
