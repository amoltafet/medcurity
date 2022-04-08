const db = require('../dbConfig')
const logger = require('../logger').log

/**
 * Reset user stats for testing the leaderboard.
 */
 const resetUserStats = (req, res) => {
    const userid = req.body.userid;

    db.query(`UPDATE Users SET category1 = '0', category2 = '0', category3 = '0', category4 = '0', category5 = '0', category6 = '0', percentage1 = '0', percentage2 = '0', percentage3 = '0', percentage4 = '0', percentage5 = '0', percentage6 = '0' WHERE userid = '${userid}'`, (err,result) => {
        logger.log('info', `Cleared categoryies & percents for user-"${userid}": "${result}"`);
        db.query(`DELETE FROM AssignedLearningModules WHERE UserID = '${userid}'`, (err,result) => {
            logger.log('info', `Deleted Assigned Learning Modules for user-"${userid}": "${result}"`);
            db.query(`DELETE FROM CompletedModules WHERE UserID = '${userid}'`, (err,result) => {
                logger.log('info', `Deleted Completed Modules for user-"${userid}" : "${result}"`);
                db.query(`SELECT * FROM Users WHERE userid = "${userid}"`, (err,result) => {
                    logger.log('info', `Deleted Completed Modules for user-"${userid}" : "${result}"`);
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
        logger.log('info', `New Assigned Learning Module: "${result}"`);
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
    
    var today = new Date();
    today.setDate((today.getDate() - dateDue)-1);
  
    logger.log('info', `userid: "${userid}"`);
    logger.log('info', `Completed Modulenum: "${moduleNum}"`);
    logger.log('info', `new assigned date: "${today}"`);

    db.query("INSERT INTO CompletedModules (DateCompleted, LearningModID, UserID) VALUES (?,?,?)", [today, moduleNum, userid], (err,result) => {
        logger.log('info', `New Completed Learning Module: "${result}"`);
        db.query(`SELECT * FROM CompletedModules WHERE UserID = '${userid}'`, (err,result) => {
            res.send({result:result, success: true, message: `Users Completed Modules: `});
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
        logger.log('info', `Added test company to current user!: "${result}"`);
        db.query(`SELECT * FROM AffiliatedUsers WHERE UserID = '${userid}'`, (err,result) => {
            res.send({result:result, success: true, message: `Users Completed Modules: `});
        })
    })
}

module.exports = 
{
    resetUserStats,
    assignModulesTest,
    addFakeCompletedModules,
    addAssociatedCompany,
};