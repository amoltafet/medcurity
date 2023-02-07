const db = require('../dbConfig');
const logger = require('../logger').log;

/**
 * Stores a module badge as earned
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

module.exports = 
{
    sendNotification
};