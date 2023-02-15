/*
File Name: modulesController.js
Description: This file contains the routes used to assign modules to employees,
    track completed modules, and pull in information on assigned modules for companies.
    The actual addresses of these routes are contained in modulesRoutes.js. 
    These requests are accessed via the '/modules/<function_name>' address.
Last Modified: February 14, 2023
*/

const db = require('../dbConfig');
const logger = require('../logger').log;

/*
Given a company id, this route returns all of the modules not currently assigned by the company.
It is used to build the dropdown menu in LearningManagerAdder.js.
*/
const getUnassignedModules = (req, res) => {
    const companyid = req.query.companyid;
    db.query('SELECT * FROM LearningModules WHERE NOT EXISTS (SELECT lm.* ' +
             'FROM CompanyLearningModules JOIN LearningModules as lm ' +
             'ON CompanyLearningModules.LearningModID = lm.ID ' + 
             'WHERE CompanyLearningModules.CompanyID = ?' +
             'AND CompanyLearningModules.LearningModID = LearningModules.ID)', [companyid], (err,result) => {
    if (err) {
        logger.log('error', { methodName: '/unassignedModules', body: err }, { service: 'user-service' });
    } else {
        logger.log('info', "Retrieved unassigned modules for company " + companyid + ".", { service: 'user-service' });
        res.send(result);
    }});
}

/*
Assigns a learning module to a company if it is not already assigned.
This occurs when an employer clicks submit in LearningManagerAdder.js.
*/
const assignModule = (req,res) => {
    const moduleid = req.body.moduleid;
    const companyid = req.body.companyid;
    const dateDue = new Date();
    dateDue.setDate(dateDue.getDate());
    dateDue.setHours(23, 59);
    dateDue.setSeconds(0);

    db.query('SELECT EXISTS(SELECT * FROM CompanyLearningModules as CLM WHERE CLM.LearningModId = ? ' +
             'and CLM.CompanyID = ?) AS doesExist', [moduleid, companyid], (err,result) => {
        if (err) {
            res.send({success: false, error: err});
            return logger.log('error', { methodName: '/assignModule', body: err }, { service: 'user-service' });
        }
        if (result[0].doesExist === 0) {
            db.query("INSERT INTO CompanyLearningModules (LearningModID, CompanyID, DueDate) VALUES (?,?,?)", [moduleid, companyid, dateDue], (err, result) => {
            if (err) {
                res.send({success: false, error: err});
                return logger.log('error', { methodName: '/assignModule', body: err }, { service: 'user-service' });
            }
            res.send({success: true, added: true, message: "LearningModule was assigned to the company."});
            });
        }
        else {
            res.send({success: true, added: false, message: "LearningModule is already assigned to the company."});
        }
    });
}

/*
Updates the due date for a previously assigned module.
This is done in the LearningManagerDashboard by an employer.
*/
const updateDueDate = (req, res) => {
    const moduleid = req.body.moduleid;
    const companyid = req.body.companyid;
    const dateDue = new Date(req.body.dueDate);
    dateDue.setDate(dateDue.getDate());
    dateDue.setHours(23, 59);

    db.query('UPDATE CompanyLearningModules SET DueDate = ? WHERE CompanyID = ? AND LearningModID = ?', [dateDue, companyid, moduleid], (err,result) => {
        if (err) {
            res.send({success: false, error: err});
            return logger.log('error', { methodName: '/updateDueDate', errorBody: err }, { service: 'user-service' });
        }
        logger.log('info', `Updated assigned module for company: "${companyid}" and module: "${moduleid}" to date: "${dateDue}" Fields: ${result}`, { service: 'user-service' });
        res.send({success: true, message: "Module due date updated."});
    })   
}

/*
Removes a module from currently assigned modules for a company. 
This is done in the LearningManagerDashboard by an employer.
Also removes all completed module records for that learning module
from all users in the company, by querying all users in the company then
going through and deleting all of their completed modules.
*/
const removeModule = (req, res) => {
    const moduleid = req.body.moduleid;
    const companyid = req.body.companyid;

    db.query(('SELECT EXISTS(SELECT * FROM CompanyLearningModules WHERE CompanyLearningModules.LearningModID = ? ' +
              'and CompanyLearningModules.CompanyID = ?) AS doesExist'), [moduleid, companyid], (err, result) => {
        if (err) {
            res.send({success: false, error: err});
            return logger.log('error', { methodName: '/removeModule', errorBody: err }, { service: 'user-service' });
        }
        if (result[0].doesExist) {
            db.query('DELETE FROM CompanyLearningModules WHERE CompanyLearningModules.LearningModID = ? and CompanyLearningModules.CompanyID = ?', [moduleid, companyid], (err, result) => {
                if (err) {
                    res.send({success: false, error: err});
                    return logger.log('error', { methodName: '/removeModule', errorBody: err }, { service: 'user-service' });
                }
                db.query('SELECT AffiliatedUsers.UserID FROM AffiliatedUsers WHERE AffiliatedUsers.CompanyID = ?', [companyid], (err, users) => {
                    if (err) {
                        res.send({success: false, error: err});
                        return logger.log('error', { methodName: '/removeModule', errorBody: err }, { service: 'user-service' });
                    }

                    for (let index in users) {
                        db.query('DELETE FROM CompletedModules WHERE CompletedModules.LearningModID = ? and CompletedModules.UserID = ?', 
                            [moduleid, users[index].UserID], (err, result) => {
                                if (err) {
                                    res.send({success: false, error: err});
                                    return logger.log('error', { methodName: '/removeModule', errorBody: err }, { service: 'user-service' });
                                }
                                logger.log('info', `Attempted deletion of CompletedModules record learningModID: "${moduleid}" and UserID: "${users[index].UserID}." Fields: ${result}`, { service: 'user-service' });    
                            });

                    }
                    res.send({success: true, message: "Successfully removed module from assigned modules.", users: users});
                });
            });
        }
        else
        {
            res.send({success: false, message: "Module is not assigned in database."});
        }
    })
}

module.exports = {
    getUnassignedModules,
    assignModule,
    updateDueDate,
    removeModule
}