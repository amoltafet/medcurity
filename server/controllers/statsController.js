/*
File Name: statsController.js
Description: This file contains the routes used to pull in stats for the 
stats employer page.
Last Modified: February 28, 2023
*/

const db = require('../dbConfig');
const logger = require('../logger').log;

/*
Given a company id, this route returns the recent activity of the employees
in a form used to build a line chart on the stats page.
*/
const getEmployeeActivity = (req, res) => {
    const companyid = req.query.companyid;
    let today = new Date();
    today.setHours(0, 0, 0);
    let first = today.getDate() - today.getDay();
    let last = first + 6;

    const numWeeks = 10;
    let weeks = [];
    
    for (let i = 0; i < numWeeks; i++) {
        let today = new Date();
        today.setHours(0, 0, 0);
        let weekStart = new Date(today.setDate(first));
        let weekEnd = new Date(today.setDate(last));
        weekEnd.setHours(23, 59, 59);
        weeks.push({
            weekStart: weekStart,
            weekEnd: weekEnd,
            count: 0
        });
        
        first = first - 7;
        last = last - 7;
    }
    const firstDate = new Date(weeks.slice(-1)[0].weekStart);
    let cutoff = new Date(weeks[0].weekStart);
    let cutoffIndex = 0;


    db.query('SELECT (date) FROM UserActivity as US JOIN AffiliatedUsers as AU ON AU.UserID = US.userID WHERE date >= ? and companyID = ? ORDER BY date DESC;', [firstDate, companyid], (err,result) => {
    if (err) {
        res.send({success: false, error: err});
        return logger.log('error', { methodName: '/getEmployeeActivity', body: err }, { service: 'user-service' });
    } else {
        logger.log('info', "Retrieved employee activity for company " + companyid + ".", { service: 'user-service' });

        result.forEach((row) => {
            let date = new Date(row.date);

            while (date < cutoff) {
                cutoffIndex += 1;
                cutoff = new Date(weeks[cutoffIndex].weekStart);
            }

            weeks[cutoffIndex].count += 1;
        });

        weeks.forEach((week) => {
            let stringRep = `${week.weekStart.getMonth()}/${week.weekStart.getDate()} - `;
            stringRep += `${week.weekEnd.getMonth()}/${week.weekEnd.getDate()}`;
            week.range = stringRep;

            delete week.weekStart;
            delete week.weekEnd;
        });
        
        res.send({success: true, result: weeks});
    }});
}

/*
Given a company id, this route returns the recent activity of the employees
in a form used to build a pie chart on the stats page. It gets the count of modules 
attempted for each learning module.
*/
const getModuleCounts = (req, res) => {
    const companyid = req.query.companyid;
    let today = new Date();
    today.setHours(0, 0, 0);

    let first = today.getDate() - today.getDay();
    let last = first + 6;

    // num weeks sets how far back to look
    const numWeeks = 10;
    let cutoff = new Date(today.setDate(last));
    cutoff = new Date(cutoff.setDate(-7*numWeeks));

    db.query('SELECT title, COUNT(moduleID) AS count FROM UserActivity as UA JOIN AffiliatedUsers as AU ON AU.UserID = UA.userID JOIN LearningModules as LM ON UA.moduleID = LM.ID WHERE date >= ? and companyID = ? GROUP BY moduleID;', [cutoff, companyid], (err,result) => {
    if (err) {
        res.send({success: false, error: err});
        return logger.log('error', { methodName: '/getModuleCounts', body: err }, { service: 'user-service' });
    } else {
        logger.log('info', "Retrieved module counts for company " + companyid + ".", { service: 'user-service' });
        res.send({success: true, result: result, cutoff: cutoff});
    }});
}

/*
Given a company id, this route returns the recent activity of the employees
in a form used to build a pie chart on the stats page. It gets the count of modules 
attempted for each learning module.
*/
const getModuleStats = (req, res) => {
    const companyid = req.query.companyid;
    let today = new Date();
    today.setHours(0, 0, 0);

    let first = today.getDate() - today.getDay();
    let last = first + 6;

    // num weeks sets how far back to look
    const numWeeks = 10;
    let cutoff = new Date(today.setDate(last));
    cutoff = new Date(cutoff.setDate(-7*numWeeks));

    db.query('SELECT title, AVG(percentage) AS pct, AVG(time) AS time FROM UserActivity as UA JOIN AffiliatedUsers as AU ON AU.UserID = UA.userID JOIN LearningModules as LM ON UA.moduleID = LM.ID WHERE date >= ? and companyID = ? GROUP BY moduleID', [cutoff, companyid], (err,result) => {
    if (err) {
        res.send({success: false, error: err});
        return logger.log('error', { methodName: '/getModuleStats', body: err }, { service: 'user-service' });
    } else {
        logger.log('info', "Retrieved module stats for company " + companyid + ".", { service: 'user-service' });
        res.send({success: true, result: result});
    }});
}

/*
    Given a company id, this route returns the historical module assignments 
    in a form used to build a table on the stats page. It gets the dates assigned and 
    removed and the number of employees that completed the module
*/
const getModuleHistory = (req, res) => {
    const companyid = req.query.companyid;

    db.query('SELECT title, AVG(percentage) AS pct, AVG(time) AS time FROM UserActivity as UA JOIN AffiliatedUsers as AU ON AU.UserID = UA.userID JOIN LearningModules as LM ON UA.moduleID = LM.ID WHERE companyID = ? GROUP BY moduleID', [companyid], (err,result) => {
    if (err) {
        res.send({success: false, error: err});
        return logger.log('error', { methodName: '/getModuleStats', body: err }, { service: 'user-service' });
    } else {
        logger.log('info', "Retrieved module stats for company " + companyid + ".", { service: 'user-service' });
        res.send({success: true, result: result});
    }});
}

/*
Retrieves data from users that belong to public companies
*/
const getPublicLeaderboard = (req, res) => {
    db.query('SELECT Users.userid, Users.username, AU.CompanyID, SUM(Points) AS Points FROM CompletedModules ' +
    'RIGHT JOIN Users ON Users.userid = CompletedModules.UserID ' + 
    'LEFT JOIN AffiliatedUsers AS AU ON AU.UserID = Users.userid ' +
    'JOIN Companies AS CMP ON AU.CompanyID = CMP.companyid WHERE CMP.private = 0 ' +
    'GROUP BY Users.userid', (err,result) => {
    if (err) {
        res.send({success: false, error: err});
        return logger.log('error', { methodName: '/getLeaderboard', body: err }, { service: 'user-service' });
    } else {
        logger.log('info', "Retrieved user information for public leaderboard.", { service: 'user-service' });
        res.send({success: true, result: result});
    }});
}

module.exports = {
    getEmployeeActivity,
    getModuleCounts,
    getModuleStats,
    getModuleHistory,
    getPublicLeaderboard
}