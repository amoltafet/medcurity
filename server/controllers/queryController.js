/*
File Name: queryController.js
Description: This file contains the routes for direct queries to the database,
as well as file handling routes.
Last Modified: February 13, 2023
*/

const db = require('../dbConfig');
const logger = require('../logger').log;
const fs = require('fs');
const path = require('path');

/**
 * Queries the database with any given mySQL query. 
 * Queries are only limited by the privileges of the user specified in the database config.
 */
const getQuery = (req,res) => 
{
    db.query(`${req.query.the_query}`, (err,result) => {
        if (err) logger.log('error', { methodName: '/geQuery', body: err }, { service: 'query-service' })
        logger.log('info', `Custom Query: "${req.query.the_query}"`, { service: 'query-service' } )
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
 * Queries learning module matching question answers info given a module ID
 */
const queryMatchingAnswers = (req,res) =>{
    db.query(`SELECT * FROM MatchingAnswers WHERE module = ${req.query.id}`, (err,result) => {
        if (err) logger.log('error', { methodName: '/queryMatchingAnswers', body: err }, { service: 'query-service' })
        logger.log('info', `Queried MatchingAnswers with ModuleID: "${req.query.id}" Fields: ${result}`, { service: 'query-service' })
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

const addModule = (req, res)=>{
    const title = req.body.title
    const subtitle = req.body.subtitle
    const description = req.body.description
    const banner = req.body.banner

    db.query("INSERT INTO LearningModules (Title, Subtitle, Description, Banner)  VALUES (?,?,?, ?)", [title, subtitle, description, banner], (err,result) => {
        logger.log('info', `New Learning Module: "${result}"`);
        db.query(`SELECT ID FROM LearningModules WHERE Title = '${title}'`, (err,result) => {
            res.send({result:result, success: true, message: `ID for added module: `});
        })
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
 * Queries all learning modules assigned to a given user
 * Param: userid
 */
 const queryAllUserRequiredModules = (req,res)=>{
    db.query(`SELECT * ` +
        `FROM AffiliatedUsers JOIN CompanyLearningModules ` +
        `ON AffiliatedUsers.CompanyID = CompanyLearningModules.CompanyID ` +
        `JOIN LearningModules ON LearningModules.ID = CompanyLearningModules.LearningModID ` +
        `WHERE AffiliatedUsers.UserID = '${req.query.userid}'`, (err,result) => {
        if (err) logger.log('error', { methodName: '/queryAllUserRequiredModules', errorBody: err }, { service: 'query-service' })
        logger.log('info', `Queried CompanyLearning Modules joined with AffiliatedUsers with ID: "${req.query.userid}" Fields: ${result}`, { service: 'query-service' })
        res.send(result)
    })
 }

/**
 * Queries the data base for a user's profile picture (base64)
 */
const queryProfilePicture = (req,res) => {
    const userid = req.query.id;

    try {
        let image = fs.readFileSync(path.join(__dirname, `../assets/images/profiles/${userid}-profile.png`));
        res.send({ profileImage: new Buffer.from(image).toString('base64') });
    }
    catch (error) {
        try {
            let image = fs.readFileSync(path.join(__dirname, `../assets/images/profiles/${userid}-profile.jpg`));
            res.send({ profileImage: new Buffer.from(image).toString('base64') });
        }
        catch (error) {
            try {
                let image = fs.readFileSync(path.join(__dirname, `../assets/images/profiles/${userid}-profile.jpeg`));
                res.send({ profileImage: new Buffer.from(image).toString('base64') })
            }
            catch (error) {
                let image = fs.readFileSync(path.join(__dirname, `../assets/images/profiles/profile-default.png`));
                res.send({ profileImage: new Buffer.from(image).toString('base64') })
            }
        }
    }

    // db.query(`SELECT userid, profilepicture FROM Users WHERE userid = ${req.query.id}`, (err,result) => {
    //     if (err) logger.log('error', { methodName: '/queryProfilePicture', body: err }, { service: 'query-service' })
    //     try {
    //         let image = fs.readFileSync(path.join(__dirname, `../assets/images/profiles/${result[0].profilepicture}`));
    //         res.send({ profileImage: new Buffer.from(image).toString('base64') })
    //     }
    //     catch (error) {
    //         let image = fs.readFileSync(path.join(__dirname, `../assets/images/profiles/profile-default.png`));
    //         res.send({ profileImage: new Buffer.from(image).toString('base64') })
    //     }
    // })
}

/**
 * Queries the data base for a badge's picture (base64)
 */
 const queryBadgeImage = (req,res) => {
    db.query(`SELECT id, icon FROM Badges WHERE id = ${req.query.id}`, (err,result) => {
        if (err) logger.log('error', { methodName: '/queryBadgeImage', body: err }, { service: 'query-service' })
        try {
            let image = fs.readFileSync(path.join(__dirname, `../assets/images/badges/${result[0].icon}`));
            res.send({ badgeImage: new Buffer.from(image).toString('base64') })
        }
        catch (error) {
            let image = fs.readFileSync(path.join(__dirname, `../assets/images/badges/error-badge.png`));
            res.send({ badgeImage: new Buffer.from(image).toString('base64') })
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
        logger.log('error', { methodName: '/queryModuleBanner', body: `Failed to upload ${req?.file?.filename || 'a banner'}` }, { service: 'query-service' })
        res.send(false)
    }
}

/**
 * Logs image handling for uploading profile pictures.
 */
 const queryUploadProfile = (req, res) => {
    if (req.file)
    {
        db.query("UPDATE Users SET profilepicture = ? WHERE userid = ?", [req.file.filename, req.query.userid], (err, result) => { })
        logger.log('info', { methodName: '/postProfilePicture', body: `Uploaded "${req.file.filename}" to "assets/images/profiles"` }, { service: 'query-service' })
        res.send(true)
    }
    else
    {
        logger.log('error', { methodName: '/queryUploadProfile', body: `Failed to upload ${req?.file?.filename || 'a profile picture'}` }, { service: 'query-service' })
        res.send(false)
    }
}

module.exports = 
{
    getQuery,
    queryUploadBanner,
    queryUploadProfile,
    queryModuleBanner,
    queryProfilePicture,
    queryBadgeImage,
    queryModuleInfo,
    queryModuleQuestions,
    queryMatchingAnswers,
    queryModuleDirectoryInfo,
    queryDirectoryModulesInfo,
    queryAllUserRequiredModules,
    addModule,
};