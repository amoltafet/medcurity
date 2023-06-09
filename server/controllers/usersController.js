/* eslint-disable no-undef */
const bcrypt = require("bcrypt");
const serverConfig = require('../serverConfig.json')
const saltRounds = serverConfig.bcrypt.SALT_ROUNDS;
const db = require('../dbConfig');
const emailValidator = require("email-validator");
const { passwordStrength } = require('check-password-strength');
const logger = require('../logger').log;
const notifications = require('./notificationsController');

/**
 * Queries the database to register a new user. Passwords are hashed + salted using bcrypt.
 */
const userRegister = (req,res) => 
{   
    const email = req.body.email
    const password = req.body.password
    const username = email.substring(0, email.indexOf("@"));

    let isValidPass  = checkPassword(password)
    let isValidEmail = checkEmail(email)

    console.log('VALIDATION RESULTS: ', isValidEmail, isValidPass)

    if (isValidPass.result && isValidEmail.result)
    {
        db.query(`SELECT EXISTS(SELECT email FROM Users WHERE email = '${email}') AS doesExist`, (err,result) => {
            if (result[0].doesExist === 0)
            {
                console.log('FROM USER DOESNT EXIST: ', err)
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) console.log(err);
                    db.query("INSERT INTO Users (username, email, password) VALUES (?,?,?)", [username, email, hash], (err, result) => {
                        db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,result) => {
                            let id = result[0].userid;
                            notifications.sendNotification(id, "Welcome to Medcurity!", "welcome");
                            req.session.userSession = result;
                            res.send({result: true, message: 'Account registered! Logging in...'})
                        })
                    });
                });
            }
            else
            {
                console.log('FROM USER IS INACTIVE: ', err)
                db.query(`SELECT password, active FROM Users WHERE email = '${email}'`, (err,result) => {
                    if (result[0].active == 0 && result[0].password == null)
                    {
                        bcrypt.hash(password, saltRounds, (err, hash) => {
                            if (err) console.log(err);
                            db.query("UPDATE Users SET password = ?, active = ? WHERE email = ?", [hash, 1, email], (err, result) => {
                                db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,result) => {
                                    let id = result[0].userid;
                                    notifications.sendNotification(id, "Welcome to Medcurity!", "welcome");
                                    req.session.userSession = result;
                                    res.send({result: true, message: 'Empty account filled! Logging in...'});
                                })
                            });
                        });
                    }
                    else
                    {
                        // console.log("User already exists, returning false!")
                        res.send(false)
                    }
                });
            }
        })
    }
    else
    {
        res.send({result: false, message: [isValidEmail.message, isValidPass.message]})
    }
}

/**
 * Queries the database to update a user's password.
 */
const userChangePassword = async (req,res) => 
{    
    const userid          = req.body.userid
    const newPassword     = req.body.newPassword
    const retypedPassword = req.body.retypedPassword

    let validPass = checkPassword(newPassword)
    let passwordsMatch = (newPassword === retypedPassword)
    
    if (validPass.result)
    {
        if (passwordsMatch)
        {
            updateUserPassword(userid, newPassword)
            res.send({result: true, message: 'You changed your password successfully!'})
        }
        else
        {
            // retyped pass does not match new pass
            // console.log('no match')
            res.send({result: false, message: 'Your retyped password does not match your new password!'})
        }
    }
    else
    {
        // password strength bad
        // console.log(validPass.message)
        res.send({result: false, message: validPass.message})
    }
}

const userResetPassword = async (req,res) =>
{
    const userid = req.body.userid
    const newPassword = req.body.newPassword

    updateUserPassword(userid, newPassword)
}

/**
 * Queries the database to register an inactive user.
 */
const userRegisterEmpty = (req,res) => 
{
    const email = req.body.email
    const username = email.substring(0, email.indexOf("@"));
    const companyid = req.body.companyid

    let isValidEmail = checkEmail(email)
    if (isValidEmail.result)
    {
        db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err,result) => {
            if (result[0].doesExist == 0)
            {
                db.query("INSERT INTO Users (username, email, active) VALUES (?,?,?)", [username, email, false], (err, result) => {
                    db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,user) => {
                        db.query("INSERT INTO AffiliatedUsers (UserID, CompanyID) VALUES (?,?)", [user[0].userid, companyid], (err, result) => {
                            res.send({ result: true, message: `Added`})
                            
                        });
                    });
                });
            }
            else
            {
                res.send({ result: false, message: `User already exists`})
            }
        })
    }
    else
    {
        res.send(isValidEmail)
    }

}


/**
 * Queries the database to register an inactive company admin assigned to a company.
 */
const userRegisterCompanyAdmin = (req,res) => 
{
    const email = req.body.email
    const companyid = req.body.companyid
    const username = email.substring(0, email.indexOf("@"));

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err1, result) => {
        console.log(err1)
        if (result[0].doesExist == 0)
        {
            //if (err) console.log(err);

            db.query("INSERT INTO Users (username, email, active, companyid) VALUES (?,?,?,?)", [username, email, false, companyid], (err2, result) => {
                db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err3, user) => {
                    db.query("INSERT INTO CompanyAdmins (UserID, CompanyID) VALUES (?,?)", [user[0].userid, companyid], (err4, result) => {
                        console.log(err1, err2, err3, err4)
                        res.send(true)
                    });
                });
            });
        }
        else
        {
            res.send(false)
        }
    })
}

/**
 * Handles user login and creates a session for the user. Session data contains their user data from the database.
 */
const userLogin = (req, res) => 
{
    const email = req.body.email
    const password = req.body.password

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err, userExists) => {
        
        if (userExists[0]?.doesExist === 1)
        {
            db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,userData) => {
                db.query(`SELECT Users.userid, AffiliatedUsers.CompanyID FROM Users INNER JOIN AffiliatedUsers ON Users.userid=AffiliatedUsers.UserID WHERE Users.userid = '${userData[0].userid}'`, (err,userCompanyID) => {
                    db.query(`SELECT Users.userid, CompanyAdmins.CompanyID FROM Users INNER JOIN CompanyAdmins ON Users.userid=CompanyAdmins.UserID WHERE Users.userid = '${userData[0].userid}'`, (err,userIsCompanyAdmin) => {
                        db.query(`SELECT Users.userid FROM Users INNER JOIN WebsiteAdmins ON Users.userid=WebsiteAdmins.UserID WHERE Users.userid = '${userData[0].userid}'`, (err,userIsWebsiteAdmin) => {
                            bcrypt.compare(password, userData[0].password, (error, response) => {
                                if (response) 
                                {
                                    // do not attach the password to the user session
                                    delete userData[0].password

                                    // attach roles to user session
                                    //userData[0].type = (userIsCompanyAdmin.length > 0) ? 'companyAdmin' : 'user'
                                    //if (userData[0].type != 'user') userData[0].type = (userIsWebsiteAdmin.length > 0) ? 'websiteAdmin' : 'companyAdmin'
                                    userData[0].type = 'user'
                                    
                                    if (userIsCompanyAdmin.length > 0)
                                    {
                                        userData[0].type = 'companyAdmin';
                                        userData[0].companyAdminID = userIsCompanyAdmin[0].CompanyID;
                                    }

                                    if (userIsWebsiteAdmin.length > 0)
                                    {
                                        userData[0].type = 'websiteAdmin'
                                    }

                                    userData[0].companyid = userCompanyID[0]?.CompanyID || 0;
                                    
                                    userData[0].loggedInAt = Date()
                                    req.session.userSession = userData;
                                    logger.log('info', `Existing user "${email}" logged in.`, { service: 'user-service' })

                                    res.send({ result: userData, success: true, message: "Logging in!" });
                                } 
                                else 
                                {
                                    res.send({ success: false, message: "Wrong username/password combination!" });
                                }
                            });
                        })
                    })
                })
            })
        }
        else
        {
            // console.log("User already exists, returning false!")
            res.send({ success: false, message: "Sorry, we can't find an account with this email address. Please try again." })
        }
    }
     
    )
};

/**
 * Retreives the user's session data.
 */
const userLoginSession = (req, res) =>
{
    if (req.session.userSession)
    {
        logger.log('info', `Created user session for "${req.session.userSession[0].username}"`, { service: 'user-service' })
        res.send({ loggedIn: true, user: req.session.userSession });
    } 
    else 
    {
        res.send({ loggedIn: false });
    }
}

/**
 * Handles logging out the user and deletes their session.
 */
const userLogout = (req, res) =>
{   
    if (req?.session?.userSession)
    {
        logger.log('info', `Successfully logged out user "${req.session.userSession[0].username}"`, { service: 'user-service' })
        req.session.destroy()
        res.send({ success: true, message: "Logging out!" });
    } 
    else 
    {
        logger.log('info', `Failed logging out a user. User most likely logged out without a session.`, { service: 'user-service' })
        res.send({ success: false, message: "Could not log out..." });
        res.end()
    }
}

/**
 * Updates the users settings - only username for now.
 */
const userChangeUsername = (req, res) => {
    const newUserName = req.body.username;
    const userId = req.body.id;

    logger.log('info', `username "${newUserName}"`);
    logger.log('info', `id "${userId}"`);
    db.query(`UPDATE Users SET username = "${newUserName}" WHERE userid = "${userId}"`, (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/userChangeUsername', body: `Failed to change user-${userId}'s username: ${err}.` }, { service: 'query-service' });
        }
        db.query(`SELECT * FROM Users WHERE userid = '${userId}'`, (err,result) => {
            req.session.userSession[0].username = result[0].username;
            logger.log('info', `Updated username to "${newUserName}"`);
            res.send({ result: result, success: true, message: "Updated username!" });
        })
    })   
}

const userChangeCompanyName = (req, res) => {
    const newCompanyName = req.body.name;
    const companyId = req.body.id;

    console.log(newCompanyName);
    console.log(companyId);

    logger.log('info', `company name "${newCompanyName}"`);
    logger.log('info', `id "${companyId}"`);
    db.query(`UPDATE companies SET name = "${newCompanyName}" WHERE companyID = "${companyId}"`, (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/userChangeCompanyName', body: `Failed to change company-${companyId}'s name: ${err}.` }, { service: 'query-service' });
        }
        db.query(`SELECT * FROM Companies WHERE CompanyID = '${companyId}'`, (err,result) => {
            logger.log('info', `Updated company name to "${newCompanyName}"`);
            res.send({ result: result, success: true, message: "Updated company name!" });
        })
    })
}

const userChangeCompanyBio = (req, res) => {
    const newCompanyBio = req.body.bio;
    const companyId = req.body.id;

    console.log(newCompanyBio);
    console.log(companyId);

    logger.log('info', `company bio "${newCompanyBio}"`);
    logger.log('info', `id "${companyId}"`);
    db.query(`UPDATE companies SET description = "${newCompanyBio}" WHERE companyID = "${companyId}"`, (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/userChangeCompanyBio', body: `Failed to change company-${companyId}'s bio: ${err}.` }, { service: 'query-service' });
        }
        db.query(`SELECT * FROM Companies WHERE CompanyID = '${companyId}'`, (err,result) => {
            logger.log('info', `Updated company bio to "${newCompanyBio}"`);
            res.send({ result: result, success: true, message: "Updated company bio!" });
        })
    })
}

const toggleCompanyPrivacy = (req, res) => {
    const privacy = req.body.privacy;
    const companyId = req.body.id;

    db.query('UPDATE companies SET private = ? WHERE companyID = ?', [privacy, companyId], (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/toggleCompanyPrivacy', body: `Failed to change company-${companyId}'s privacy: ${err}.` }, { service: 'query-service' });
            res.send({success: false, error: err });
        }
        else {
            logger.log('info', `Updated company privacy`);
            res.send({ result: result, success: true, message: "Updated company privacy!" });
        }
    });
}

/**
 * Store a learning module as completed.
 */
const userModuleCompleted = (req, res) => {
    var today = new Date();
    today.setDate(today.getDate());
    const categoryId = req.body.categoryId;
    const userid = req.body.userid;   
    const points = req.body.points;
    const percentage = req.body.percentage;
    const moduleNum = req.body.modulenum;
    const companyid = req.body.companyid;

    logger.log('info', `points "${points}"`);
    logger.log('info', `percentage "${percentage}"`);
    logger.log('info', `module num "${moduleNum}"`);
    logger.log('info', `companyid "${companyid}"`);

    db.query('SELECT * FROM CompletedModules CMPLT JOIN CompanyModulesHistory HIST ON LearningModID = moduleid WHERE UserID = ? AND moduleid = ? AND dateRemoved IS NULL AND DateCompleted >= dateAssigned', 
        [userid, moduleNum], (err,result) => {
        if(err) {
            res.send({success: false, error: err});
            return logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
        }
        // redoing module assignment
        else if (result.length > 0) {
            let storedPercent = result[0].Percentage;
            let storedPoints = result[0].Points;

            if (percentage > storedPercent) {
                storedPercent = percentage;
            }

            if (points > storedPoints) {
                storedPoints = points;
            }

            db.query('UPDATE CompletedModules SET Points = ?, Percentage = ? WHERE UserID = ? AND LearningModID = ?', [storedPoints, storedPercent, userid, moduleNum], (err,result) => {
                if (err) {
                    res.send({success: false, error: err});
                    return logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
                }

                res.send({success: true, message: "Additional attempt completed. Information updated...", found: result});
                return logger.log('info', 'Module has already been completed, this is storing the second attempt.');
            });
        }
        // first module completion for assignment
        else {
            db.query(`INSERT INTO CompletedModules (UserID, LearningModID, DateCompleted, Points, Percentage)  VALUES (?,?,?,?,?)`, [userid, categoryId, today, points, percentage], (err,result) => {
                if (err) {
                    res.send({success: false, error: err});
                    return logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
                }
                db.query(`INSERT INTO CompletedModulesHistory (userid, moduleid, companyid, dateCompleted)  VALUES (?,?,?,?)`, [userid, moduleNum, companyid, today], (err,result) => {
                    if (err) {
                        res.send({success: false, error: err});
                        return logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
                    }
                    db.query(`SELECT * FROM CompletedModules WHERE CompletedModules.userid = '${userid}'`, (err,result) => {
                        if (err) {
                            res.send({success: false, error: err});
                            return logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
                        }
                        logger.log('info', `User-${userid} completed Module ${categoryId}, on: ${today} and scored ${points} points.`);
                        res.send({success: true, data: result, message: `Completed Module`});
                    });
                });
            }); 
        }
    });  
}

// /**
//  * Store a learning module as completed.
//  */
// const userModuleCompleted = (req, res) => {
//     var today = new Date();
//     today.setDate(today.getDate());
//     const categoryId = req.body.categoryId;
//     const userid = req.body.userid;   
//     const points = req.body.points;
//     const percentage = req.body.percentage;
//     const moduleNum = req.body.modulenum;
//     const companyid = req.body.companyid;

//     logger.log('info', `points "${points}"`);
//     logger.log('info', `percentage "${percentage}"`);
//     logger.log('info', `module num "${moduleNum}"`);
//     logger.log('info', `companyid "${companyid}"`);

//     db.query(`INSERT INTO CompletedModules (UserID, LearningModID, DateCompleted, Points, Percentage)  VALUES (?,?,?,?,?)`, [userid, categoryId, today, points, percentage], (err,result) => {
//         if(err) {
//             logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
//         }
//         db.query("INSERT INTO UserPoints (PointsID, UserID, CompanyID) VALUES (?,?,?)", [moduleNum, userid, companyid], (err,result) => {
//             if(err) {
//                 logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
//             }
//             db.query(`INSERT INTO CompletedModulesHistory (userid, moduleid, companyid, dateCompleted)  VALUES (?,?,?,?)`, [userid, moduleNum, companyid, today], (err,result) => {
//                 if(err) {
//                     logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
//                 }
//                 db.query(`SELECT * FROM CompletedModules JOIN UserPoints WHERE userid = '${userid}'`, (err,result) => {
//                     if(err) {
//                         logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
//                     }
//                     logger.log('info', `User-${userid} completed Module ${categoryId}, on: ${today} and scored ${points} points.`);
//                     res.send({success: true, data: result, message: `Completed Module`});
//                 });
//             });
//         })
//     })   
// }

/**
 * Store learning module activity for a user
 */
const moduleActivity = (req, res) => {
    var today = new Date();
    today.setDate(today.getDate());
    const userid = req.body.userid;
    const module = req.body.module;   
    const points = req.body.points;
    const percentage = req.body.percentage;
    const time = req.body.time;

    logger.log('info', `Storing learning module activity for user ${userid}...`);

    db.query(`INSERT INTO userActivity (userID, moduleID, date, points, percentage, time)  VALUES (?,?,?,?,?,?)`, [userid, module, today, points, percentage, time], (err,result) => {
        if(err) {
            logger.log('error', { methodName: '/moduleActivity', errorBody: err }, { service: 'user-service' });
            res.send({success: false, message: `Failed to store activity...`});
        }
        else {
            logger.log('info', "Learning module activity for user " + userid + " successfully stored...");
            res.send({success: true, message: `Activity stored successfully...`});
        }
    });   
}

const getRecentActivity = (req, res) => {
    const userid = req.query.userid;

    db.query(`SELECT date FROM userActivity WHERE userid = ${userid} ORDER BY date DESC`, (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/getLastActivity', body: err }, { service: 'user-service' });
        }
        else {
            logger.log('info', "Retrieved latest activity from user " + userid + "...", { service: 'user-service' });
            res.send(result)
        }
    });
}

/**
 * Stores a module badge as earned
 */
 const userModuleBadgeEarned = (req, res) => {
    const userid = req.body.userid;   
    const moduleNum = req.body.modulenum;
    const moduleID = parseInt(moduleNum);
    const moduleName = req.body.moduleName;

    db.query(`SELECT (id) FROM Badges WHERE moduleID = ?`, [moduleID], (err,result) => {
        if(err) {
            logger.log('error', { methodName: '/moduleBadgeEarned', errorBody: err }, { service: 'user-service' });
            return res.send({success: false, message: `Earned badge not stored`});
        }
        else if (result.length > 0)
        {
            let badgeId = result[0]['id'];
            db.query(`INSERT INTO EarnedBadges (userID, badgeID) VALUES (?,?)`, [userid, badgeId], (err,result) => {
                if(err) {
                    if (err.errno === 1062) {
                        res.send({success: true, message: `Badge has already been earned by user.`});
                    }
                    else {
                        logger.log('error', { methodName: '/moduleBadgeEarned', errorBody: err }, { service: 'user-service' });
                        res.send({success: false, message: `Earned badge not stored`, err: err});
                    }
                }
                else {
                    let notificationMessage = `You earned the ${moduleName} Badge!`;
                    notifications.sendNotification(userid, notificationMessage, 'badge');
                    res.send({success: true, message: `Badge Earned`});
                }
            });
        }
        else
        {
            res.send({success: false, message: `No badge with that moduleID stored.`});
        }
    });   
}

/**
 * Stores a named badge as earned
 */
const namedBadgeEarned = (req, res) => {
    const userid = req.body.userid;   
    const badgeName = req.body.badgeName;

    db.query(`SELECT (id) FROM Badges WHERE name = ?`, [badgeName], (err,result) => {
        if(err) {
            logger.log('error', { methodName: '/namedBadgeEarned', errorBody: err }, { service: 'user-service' });
            return res.send({success: false, message: `Earned badge not stored`});
        }
        else if (result.length > 0)
        {
            let badgeId = result[0]['id'];
            db.query(`INSERT INTO EarnedBadges (userID, badgeID) VALUES (?,?)`, [userid, badgeId], (err,result) => {
                if(err) {
                    if (err.errno === 1062) {
                        res.send({success: true, message: `Badge has already been earned by user.`});
                    }
                    else {
                        logger.log('error', { methodName: '/namedBadgeEarned', errorBody: err }, { service: 'user-service' });
                        res.send({success: false, message: `Earned badge not stored`, err: err});
                    }
                }
                else {
                    let notificationMessage = `You earned the ${badgeName}!`;
                    notifications.sendNotification(userid, notificationMessage, 'badge');
                    res.send({success: true, message: `Badge Earned`});
                }
            });
        }
        else
        {
            res.send({success: false, message: `No badge with that name stored.`});
        }
    });   
}

/**
 * Removes a user from the site
 * Involves removing the user from Users table, AffiliatedUsers,
 * CompanyAdmins, CompletedModules
 */
const deleteUser = (req,res) => 
{
    const userid = req.body.userid

    db.query((`SELECT EXISTS(SELECT * FROM Users ` +
        `WHERE Users.userid = '${userid}') AS doesExist`), (err, result) => {
        if (result[0].doesExist == 1)
        {
            if (err) console.log(err);

            db.query(`DELETE FROM AffiliatedUsers WHERE AffiliatedUsers.UserID = '${userid}'`, (err, result) => {});
            db.query(`DELETE FROM Users WHERE Users.userid = '${userid}'`, (err, result) => {});
            db.query(`DELETE FROM CompanyAdmins WHERE CompanyAdmins.UserID = '${userid}'`, (err, result) => {});
            db.query(`DELETE FROM CompletedModules WHERE CompletedModules.UserID = '${userid}'`, (err, result) => {});
            res.send(true)
        }
        else
        {
            res.send(false)
        }
    })
}



    

/**
 * Reset user stats for the leaderboard and learning modules. 
 * Does this by finding all users affiliated with a company. 
 * Then deletes all of a user's progress in completedModules and Points
 */
 const resetUserStats = (req, res) => {
    const companyid = req.body.companyId;

    db.query(`SELECT AffiliatedUsers.UserID ` + 
        `FROM AffiliatedUsers ` +
        `WHERE AffiliatedUsers.CompanyID = '${companyid}'`, (err, company_users) => {
        logger.log('info', `Queried User ids affiliated with company: "${companyid}"`, { service: 'user-service' })
        for (index in company_users) {
            const userid = company_users[index].UserID
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
                        logger.log('info', `Reset user stats to zero for user: "${result}"`);
                    })
                })
            })
        }
        res.send(true)
    })
}

/**
 * Changes the users profile picture.
 * Below are helper functions!
 */

const checkEmail = (emailString) => 
{
  if (emailValidator.validate(emailString))
  {
    return { result: true, message: null}
  }
  else
  {
    return { result: false, message: `That's not a valid email address!`}
  }
}

const checkPassword = (passwordString) => 
{
  if (passwordStrength(passwordString).contains.length === 4)
  {
    if (passwordStrength(passwordString).id > 1)
    {
      return { result: true, message: null}
    }
    else
    {
      return { result: false, message: `Your password is too weak! Please enter a stronger password.` }
    }
  }
  else
  {
    return { result: false, message: `Your password must contain the following: lowercase letter, uppercase letter, symbol, number` }
  }
}

const updateUserPassword = async (userid, newPassword) => {
    let hash = await bcrypt.hash(newPassword, saltRounds)
    db.query(`UPDATE Users SET password = ? WHERE userid = ?`, [hash, userid], (err, result) => { 
        //TODO Logging
    })
}

const getHighScores = (req, res) => {
    const userid = req.query.userid;
    db.query(`SELECT moduleID, title, MAX(points) AS highscore FROM useractivity JOIN learningmodules on useractivity.moduleID = learningmodules.id WHERE userID = ${userid} GROUP BY moduleID`, (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/getHighScores', body: err }, { service: 'user-service' });
            res.send({success: false});
        }
        else {
            logger.log('info', "Retrieved latest activity from user " + userid + " for calculating high scores...", { service: 'user-service' });
            res.send({success: true, result: result});
        }
    });
}

const getNotifications = (req, res) => {
    const userid = req.query.userid;
    db.query(`SELECT message, type, seen, timesent FROM Notifications WHERE userID = ${userid} ORDER BY timesent DESC`, (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/notifications', body: err }, { service: 'user-service' });
            res.send({success: false});
        }
        else {
            logger.log('info', "Retrieved notifications for user " + userid + "...", { service: 'user-service' });
            res.send({success: true, result: result});
        }
    });
}

const readNotifications = (req, res) => {
    const userid = req.body.userid;
    db.query(`UPDATE Notifications SET seen = true WHERE userID = ${userid}`, (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/readNotifications', body: err }, { service: 'user-service' });
            res.send({success: false});
        }
        else {
            logger.log('info', "Marked notifications as read for user " + userid + "...", { service: 'user-service' });
            res.send({success: true, result: result});
        }
    });
}

module.exports = 
{
    userLogin,
    userRegister,
    userRegisterEmpty,
    userRegisterCompanyAdmin,
    userLoginSession,
    userLogout,
    userChangeUsername,
    userChangePassword,
    userResetPassword,
    userChangeCompanyName,
    userChangeCompanyBio,
    toggleCompanyPrivacy,
    userModuleCompleted,
    deleteUser,
    resetUserStats,
    userModuleBadgeEarned,
    namedBadgeEarned,
    moduleActivity,
    getRecentActivity,
    getHighScores,
    getNotifications,
    readNotifications
};