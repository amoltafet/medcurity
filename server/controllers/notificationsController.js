const db = require('../dbConfig');
const logger = require('../logger').log;

/**
 * Sends a notification to a user
 */
const sendNotification = (userid, message, type) => {
    const time = new Date();

    db.query(`SELECT (id) FROM Notifications WHERE userID = ${userid} ORDER BY timesent DESC`, (err,result) => {
        if(err) {
            logger.log('error', { methodName: 'sendNotification', errorBody: err }, { service: 'user-service' });
            return;
        }

        if (result.length >= 5) {
            let id = result[4].id;
            db.query(`UPDATE Notifications SET message = ?, type = ?, seen = ?, timesent = ? WHERE id = ?`, 
            [message, type, false, time, id], (err,result) => {
                if(err) {
                    logger.log('error', { methodName: 'sendNotification', errorBody: err }, { service: 'user-service' });
                    return;
                }
            });   
        }

        else {
            db.query(`INSERT INTO Notifications (userid, message, type, seen, timesent) VALUES (?,?,?,?,?)`, 
            [userid, message, type, false, time], (err,result) => {
                if(err) {
                    logger.log('error', { methodName: 'sendNotification', errorBody: err }, { service: 'user-service' });
                    return;
                }
            });   
        }
    });
}

/**
 * Alerts all employees at a company of a new module assignment
 */
const assignmentAlert = (companyid, moduleid) => {

    db.query('SELECT (title) FROM LearningModules WHERE id = ?', [moduleid], (err,result) => {
        if(err) {
            logger.log('error', { methodName: 'assignmentAlert', errorBody: err }, { service: 'user-service' });
            return;
        }

        const moduleName = result[0].title;
        db.query('SELECT AffiliatedUsers.UserID FROM AffiliatedUsers JOIN Users on Users.userid = AffiliatedUsers.UserID WHERE Users.Active = 1 AND AffiliatedUsers.CompanyID = ?;', 
        [companyid], (err,result) => {
            if(err) {
                logger.log('error', { methodName: 'assignmentAlert', errorBody: err }, { service: 'user-service' });
                return;
            }

            const message = "New Assignment: " + moduleName + "!"
            result.forEach(employee => {
                sendNotification(employee.UserID, message, "assignment");
            });
        });   
    });
}

module.exports = 
{
    sendNotification,
    assignmentAlert
};