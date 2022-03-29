const db = require('../dbConfig')
const logger = require('../logger').log
const fs = require('fs')
const path = require('path')

/**
 * Queries the database with any given mySQL query. 
 * Queries are only limited by the privileges of the user specified in the database config.
 */
const getQuery = (req,res) => 
{
    db.query(`${req.query.the_query}`, (err,result) => {
        if (err) logger.log('error', { methodName: '/geQuery', body: err }, { service: 'query-service' })
        logger.log('info', `Custom Query: "${req.query.the_query}"`, { service: 'query-service' })
        return res.send(result)
    })
}

/**
 * Queries learning module content info given a learning module ID (ex. Privacy module has an ID of 1)
 */
const queryModuleInfo = (req,res)=>{
    db.query(`SELECT * FROM LearningModules WHERE ID = ${req.query.id}`, (err,result) => {
        if (err) logger.log('error', { methodName: '/queryModuleInfo', body: err }, { service: 'query-service' })
        logger.log('info', `Queried LearningModuleID with ID: "${req.query.id}" Fields: ${result}`, { service: 'query-service' })
        res.send(result)
    })
}

/**
 * Queries learning module questions info given an ID 
 */
const queryModuleQuestions = (req,res)=>{
    db.query(`SELECT * FROM Questions WHERE module = ${req.query.id}`, (err,result) => {
        if (err) logger.log('error', { methodName: '/queryModuleQuestions', body: err }, { service: 'query-service' })
        logger.log('info', `Queried Questions with ModuleID: "${req.query.id}" Fields: ${result}`, { service: 'query-service' })
        res.send(result)
    })
}

/**
 * Queries learning module directory info given an ID 
 */
const queryModuleDirectoryInfo = (req,res)=>{
    db.query(`SELECT * FROM LearningModulesDirectory WHERE module = ${req.query.id}`, (err,result) => {
        if (err) logger.log('error', { methodName: '/queryModuleDirectoryInfo', body: err }, { service: 'query-service' })
        logger.log('info', `Queried LearningModulesDirectories with ModuleID: "${req.query.id}" Fields: ${result}`, { service: 'query-service' })
        res.send(result)
    })
}

/**
 * Queries info on learning modules associated with a given module directory id
 */
const queryDirectoryModulesInfo = (req,res)=>{
    db.query(`SELECT * FROM LearningModules WHERE DirId = ${req.query.id}`, (err,result) => {
        if (err) logger.log('error', { methodName: '/queryDirectoryModulesInfo', body: err }, { service: 'query-service' })
        logger.log('info', `Queried LearningModules with DirID: "${req.query.id}" Fields: ${result}`, { service: 'query-service' })
        res.send(result)
    })
}

/**
 * Queries the data base for the module banner image (base64)
 */
const queryModuleBanner = (req,res)=>{
    db.query(`SELECT ID, Banner FROM LearningModules WHERE ID = ${req.query.id}`, (err,result) => {
        if (err) logger.log('error', { methodName: '/queryModuleBanner', body: err }, { service: 'query-service' })
        try {
            let image = fs.readFileSync(path.join(__dirname, `../assets/images/banners/${result[0].Banner}`));
            res.send({ bannerImage: new Buffer.from(image).toString('base64') })
        }
        catch (error) {
            let image = fs.readFileSync(path.join(__dirname, `../assets/images/banners/banner-default.png`));
            res.send({ bannerImage: new Buffer.from(image).toString('base64') })
        }
    })
}

/**
 * Logs image handling for uploading banners.
 */
const queryUploadBanner = (req, res) => {
    if (req.file)
    {
        logger.log('info', { methodName: '/postModuleBanner', body: `Uploaded "${req.file.filename}" to "assets/images/banners"` }, { service: 'query-service' })
        res.send(true)
    }
    else
    {
        if (err) logger.log('error', { methodName: '/queryModuleBanner', body: `Failed to upload ${req?.file.filename || 'a banner'}` }, { service: 'query-service' })
        res.send(false)
    }
}

module.exports = 
{
    getQuery,
    queryUploadBanner,
    queryModuleBanner,
    queryModuleInfo,
    queryModuleQuestions,
    queryModuleDirectoryInfo,
    queryDirectoryModulesInfo,
};