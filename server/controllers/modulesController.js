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
        logger.log('info', "Retrieved unassigned modules for company " + companyid + "...", { service: 'user-service' });
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

    db.query('SELECT EXISTS(SELECT * FROM CompanyLearningModules as CLM WHERE CLM.LearningModId = ? ' +
             'and CLM.CompanyID = ?) AS doesExist', [moduleid, companyid], (err,result) => {
        if (err) {
            res.send({success: false, error: err});
            return logger.log('error', { methodName: '/assignModule', body: err }, { service: 'user-service' });
        }
        if (result[0].doesExist === 0) {
            db.query("INSERT INTO CompanyLearningModules (LearningModID, CompanyID) VALUES (?,?)", [moduleid, companyid], (err, result) => {
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
    })
 }

module.exports = {
    getUnassignedModules,
    assignModule
}