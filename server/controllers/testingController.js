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
 */
const assignModulesTest = (req, res) => {   
    const userid = req.body.userid;
    const moduleNum = req.body.modulenum;
    const dateDue = req.body.daysaway;
    
    var today = new Date();
    today.setDate(today.getDate() + dateDue);
  
    logger.log('info', `userid: "${userid}"`);
    logger.log('info', `Modulenum: "${moduleNum}"`);
    logger.log('info', `today: "${today}"`);

    db.query("INSERT INTO AssignedLearningModules (UserID, LearningModID, DueDate)  VALUES (?,?,?)", [userid, moduleNum, today], (err,result) => {
        logger.log('info', `New Assigned Learning Module: "${result}"`);
        db.query(`SELECT * FROM AssignedLearningModules WHERE UserID = '${userid}'`, (err,result) => {
            res.send({result:result, success: true, message: `Users Assigned Temp Modules: `});
        })
    })
} 

module.exports = 
{
    resetUserStats,
    assignModulesTest,
};