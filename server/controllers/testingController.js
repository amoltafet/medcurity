const db = require('../dbConfig')
const logger = require('../logger').log

/**
 * Reset user stats for testing the leaderboard.
 */
 const resetUserStats = (req, res) => {
    const userid = req.body.userid;

    db.query(`UPDATE Users SET category1 = '0', category2 = '0', category3 = '0', category4 = '0', category5 = '0', category6 = '0', percentage1 = '0', percentage2 = '0', percentage3 = '0', percentage4 = '0', percentage5 = '0', percentage6 = '0' WHERE userid = '${userid}'`, (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/resetUserStats', body: `Failed to clear user-${userid} points: ${err}` }, { service: 'query-service' })
        } else {
            logger.log('info', `Cleared categoryies & percents for user-"${userid}": "${result}"`);
        }
        db.query(`DELETE FROM CompletedModules WHERE UserID = '${userid}'`, (err,result) => {
            if (err) {
                logger.log('error', { methodName: '/resetUserStats', body: `Failed to clear user-${userid} completed modules: ${err}.` }, { service: 'query-service' })
            } else {
                logger.log('info', `Deleted Completed Modules for user-"${userid}" : "${result}"`);
            }
            db.query(`DELETE FROM UserPoints WHERE UserID = '${userid}'`, (err,result) => {
                if (err) {
                    logger.log('error', { methodName: '/resetUserStats', body: `Failed to clear user-${userid} pointss: ${err}.` }, { service: 'query-service' })
                } else {
                    logger.log('info', `Deleted points for user-"${userid}" : "${result}"`);
                }
                db.query(`SELECT * FROM Users WHERE userid = "${userid}"`, (err,result) => {
                    req.session.userSession = result;
                    res.send({result:result, success: true, message: `Reset User stats to zero.`});
                })
            })
        })
    })
}

/**
 * Assigns user specific module & due date.
 * NOTE: AssignedLearningModules no longer exists. 
 * Instead assign a learning module to a company and/or delete a user's 
 * completed progress on the module
 * 
 */
const assignModulesTest = (req, res) => {   
    const companyid = req.body.companyid;
    const moduleNum = req.body.modulenum;
    const dateDue = req.body.daysaway;
    
    var today = new Date();
    today.setDate((today.getDate() + dateDue)-1);
  
    logger.log('info', `companyid: "${companyid}"`);
    logger.log('info', `Modulenum: "${moduleNum}"`);
    logger.log('info', `assigned module date: "${today}"`);

    db.query("INSERT INTO CompanyLearningModules (LearningModID, CompanyID, DueDate)  VALUES (?,?,?)", [moduleNum, companyid, today], (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/assignModulesTest', body: `Failed assign to module ${moduleNum} to company-${companyid}: ${err}.` }, { service: 'query-service' })
        } else {
            logger.log('info', `New Assigned Learning Module: "${result}"`);
        }
        db.query(`SELECT * FROM CompanyLearningModules WHERE CompanyID = '${companyid}'`, (err,result) => {
            res.send({result:result, success: true, message: `Users Assigned Temp Modules: `});
        })
    })
} 

/**
 * Adds a completed module with a specified date.
 */
const addFakeCompletedModules = (req, res) => {
    const userid = req.body.userid;
    const moduleNum = req.body.modulenum;
    const dateDue = req.body.daysaway;
    const points = req.body.points;
    const percentage = req.body.percentage;
    const companyid = req.body.companyid;
    
    var today = new Date();
    today.setDate((today.getDate() - dateDue));
  
    logger.log('info', `userid: "${userid}"`);
    logger.log('info', `Completed Modulenum: "${moduleNum}"`);
    logger.log('info', `new assigned date: "${today}"`);
    logger.log('info', `new points: "${points}"`);


    db.query("INSERT INTO CompletedModules (DateCompleted, LearningModID, UserID, Points, Percentage) VALUES (?,?,?,?,?)", [today, moduleNum, userid, points, percentage], (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/addFakeCompletedModules', body: `Failed to add fake completed module ${moduleNum} to user-${userid}: ${err}.` }, { service: 'query-service' })
        } else {
            logger.log('info', `New Completed Learning Module: "${result}"`);
        }

        db.query("INSERT INTO UserPoints (PointsID, UserID, CompanyID) VALUES (?,?,?)", [moduleNum, userid, companyid], (err,result) => {
            if (err) {
                logger.log('error', { methodName: '/addFakeCompletedModules', body: `Failed add points to Points table: ${err}.` }, { service: 'query-service' })
            } else {
                logger.log('info', `New add Points: "${result}"`);
            }
            db.query(`SELECT * FROM Users JOIN CompletedModules WHERE UserID = '${userid}'`, (err,result) => {
                res.send({result:result, success: true, message: `Users Completed Modules: `});
            })
        })
    })
}

/**
 * Associated a company to the current user.
 */
const addAssociatedCompany = (req, res) => {
    const userid = req.body.userid;
    const companyid = req.body.companyid;
    
    var today = new Date();
  
    logger.log('info', `userid: "${userid}"`);
    logger.log('info', `companyid: "${companyid}"`);
    logger.log('info', `today: "${today}"`);

    db.query("INSERT INTO AffiliatedUsers (UserID, CompanyID, DateJoined) VALUES (?,?,?)", [userid, companyid, today], (err,result) => {
     
        if (err) {
            logger.log('error', { methodName: '/addAssociatedCompany', body: `Failed to assign user-${userid} to company-${companyid}: ${err}.` }, { service: 'query-service' })
        }
        else {   
            logger.log('info', `Added test company to current user!: "${result}"`);
        }
        db.query(`SELECT * FROM AffiliatedUsers WHERE UserID = '${userid}'`, (err,result) => {
            res.send({result:result, success: true, message: `Users Completed Modules: `});
        })
    })
}

/**
 * Makes the current user account an admin type.
 */
 const makeUserAdmin = (req, res) => {
    const userid = req.body.userid;
    const companyid = req.body.companyid;
  
    logger.log('info', `userid: "${userid}"`);
    logger.log('info', `companyid: "${companyid}"`);

    db.query("INSERT INTO CompanyAdmins (UserID, CompanyID) VALUES (?,?)", [userid, companyid], (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/makeUserAdmin', body: `Failed to make user-${userid} an admin: ${err}.` }, { service: 'query-service' });
        } else {
            logger.log('info', `Made user admin!: "${result}"`);
        }
        db.query(`SELECT * FROM CompanyAdmins WHERE UserID = '${userid}'`, (err,result) => {
            res.send({result:result, success: true, message: `Company Admins: `});
        })
    })
}

module.exports = 
{
    resetUserStats,
    assignModulesTest,
    addFakeCompletedModules,
    addAssociatedCompany,
    makeUserAdmin,
};