// Returns query based on input
const db = require('../db_config')
const logger = require('../logger').log

const getQuery = (req,res) => 
{
    console.log('queryController: getQuery')
    db.query(`${req.query.the_query}`, (err,result) => {
        if (err) console.log(err)
        logger.log('info', `Custom Query: "${req.query.the_query}"`, { service: 'query-service' })
        res.send(result)
    })
}

// Returns learning module content info given an ID (ex. Privacy module has an ID of 1)
const queryModuleInfo = (req,res)=>{
    db.query(`SELECT * FROM LearningModules WHERE ID = ${req.query.id}`, (err,result) => {
        if (err) console.log(err)
        logger.log('info', `Queried LearningModuleID with ID: "${req.query.id}" Fields: ${result}`, { service: 'query-service' })
        res.send(result)
    })
}

// Returns learning module questions info given an ID 
const queryModuleQuestions = (req,res)=>{
    db.query(`SELECT * FROM Questions WHERE module = ${req.query.id}`, (err,result) => {
        if (err) console.log(err)
        logger.log('info', `Queried Questions with ModuleID: "${req.query.id}" Fields: ${result}`, { service: 'query-service' })
        res.send(result)
    })
}

// Returns learning module directory info given an ID 
const queryModuleDirectoryInfo = (req,res)=>{
    db.query(`SELECT * FROM LearningModulesDirectory WHERE module = ${req.query.id}`, (err,result) => {
        if (err) console.log(err)
        logger.log('info', `Queried LearningModulesDirectories with ModuleID: "${req.query.id}" Fields: ${result}`, { service: 'query-service' })
        res.send(result)
    })
}

// Returns info on learning modules associated with a given module directory id
const queryDirectoryModulesInfo = (req,res)=>{
    db.query(`SELECT * FROM LearningModules WHERE DirId = ${req.query.id}`, (err,result) => {
        if (err) console.log(err)
        logger.log('info', `Queried LearningModules with DirID: "${req.query.id}" Fields: ${result}`, { service: 'query-service' })
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
