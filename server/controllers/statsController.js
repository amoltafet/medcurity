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
            first: first, 
            last: last,
            count: 0
        });
        
        first = first - 7;
        last = last - 7;
    }
    const firstDate = new Date(weeks.slice(-1)[0].weekStart);
    let cutoff = new Date(weeks[3].weekEnd);


    db.query('SELECT (date) FROM UserActivity as US JOIN AffiliatedUsers as AU ON AU.UserID = US.userID WHERE date >= ? and companyID = ? ORDER BY date DESC;', [firstDate, companyid], (err,result) => {
    if (err) {
        logger.log('error', { methodName: '/getEmployeeActivity', body: err }, { service: 'user-service' });
    } else {
        logger.log('info', "Retrieved employee activity for company " + companyid + ".", { service: 'user-service' });
        

        result.forEach((row) => {
            let date = new Date(row.date);

            if (date >= cutoff) {
                row.time = true;
            }
        });
        
        res.send({result: result, cutoff: cutoff, firstDate: firstDate, weeks: weeks});
    }});
}


module.exports = {
    getEmployeeActivity
}