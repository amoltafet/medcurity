const bcrypt = require("bcrypt");
const serverConfig = require('../serverConfig.json')
const saltRounds = serverConfig.bcrypt.SALT_ROUNDS;
const db = require('../dbConfig')
const emailValidator = require("email-validator")
const { passwordStrength } = require('check-password-strength')
const logger = require('../logger').log

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

    if (isValidPass.result && isValidEmail.result)
    {
        db.query(`SELECT EXISTS(SELECT email FROM Users WHERE email = '${email}') AS doesExist`, (err,result) => {
            console.log(result[0])

            if (result[0].doesExist == 0)
            {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) console.log(err);
                    db.query("INSERT INTO Users (username, email, password) VALUES (?,?,?)", [username, email, hash], (err, result) => {
                        db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,result) => {
                            req.session.userSession = result;
                            res.send({result: true, message: 'Account registered! Logging in...'})
                        })
                    });
                });
            }
            else
            {
                db.query(`SELECT password, active FROM Users WHERE email = '${email}'`, (err,result) => {
                    if (result[0].active == 0 && result[0].password == null)
                    {
                        bcrypt.hash(password, saltRounds, (err, hash) => {
                            if (err) console.log(err);
                            db.query("UPDATE Users SET password = ?, active = ? WHERE email = ?", [hash, 1, email], (err, result) => {
                                db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,result) => {
                                    req.session.userSession = result;
                                    res.send({result: true, message: 'Empty account filled! Logging in...'})
                                })
                            });
                        });
                    }
                    else
                    {
                        console.log("User already exists, returning false!")
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
            console.log('no match')
            res.send({result: false, message: 'Your retyped password does not match your new password!'})
        }
    }
    else
    {
        // password strength bad
        console.log(validPass.message)
        res.send({result: false, message: validPass.message})
    }
}

/**
 * Queries the database to register an inactive user.
 */
const userRegisterEmpty = (req,res) => 
{
    const email = req.body.email
    const username = email.substring(0, email.indexOf("@"));
    const companyid = req.body.companyid

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err,result) => {
        if (result[0].doesExist == 0)
        {
            db.query("INSERT INTO Users (username, email, active) VALUES (?,?,?)", [username, email, false], (err, result) => {
                db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,user) => {
                    db.query("INSERT INTO AffiliatedUsers (UserID, CompanyID) VALUES (?,?)", [user[0].userid, companyid], (err, result) => {
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
 * Queries the database to register an inactive company admin assigned to a company.
 */
const userRegisterCompanyAdmin = (req,res) => 
{
    const email = req.body.email
    const companyid = req.body.companyid
    const username = email.substring(0, email.indexOf("@"));

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err, result) => {
        if (result[0].doesExist == 0)
        {
            if (err) console.log(err);

            db.query("INSERT INTO Users (username, email, active, companyid) VALUES (?,?,?,?)", [username, email, false, companyid], (err, result) => {
                db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err, user) => {
                    db.query("INSERT INTO CompanyAdmins (UserID, CompanyID) VALUES (?,?)", [user[0].userid, companyid], (err, result) => {
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
const userLogin = (req,res) => 
{
    const email = req.body.email
    const password = req.body.password

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err,userExists) => {
        if (userExists[0]?.doesExist == 1)
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

                                    console.log(userIsCompanyAdmin)

                                    // attach roles to user session
                                    //userData[0].type = (userIsCompanyAdmin.length > 0) ? 'companyAdmin' : 'user'
                                    //if (userData[0].type != 'user') userData[0].type = (userIsWebsiteAdmin.length > 0) ? 'websiteAdmin' : 'companyAdmin'
                                    userData[0].type = 'user'
                                    
                                    if (userIsCompanyAdmin.length > 0)
                                    {
                                        userData[0].type = 'companyAdmin'
                                    }

                                    if (userIsWebsiteAdmin.length > 0)
                                    {
                                        userData[0].type = 'websiteAdmin'
                                    }

                                    userData[0].companyid = userCompanyID[0]?.CompanyID || 0
                                    
                                    userData[0].loggedInAt = Date()
                                    req.session.userSession = userData;
                                    logger.log('info', `Existing user "${email}" logged in.`, { service: 'user-service' })

                                    console.log(userData[0].type)
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
            console.log("User already exists, returning false!")
            res.send({ success: false, message: "Sorry, we can't find an account with this email address. Please try again." })
        }
    })
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
            req.session.userSession = result;
            logger.log('info', `Updated username to "${newUserName}"`);
            res.send({ result: result, success: true, message: "Updated username!" });
        })
    })   
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
    logger.log('info', `companyid "${percentage}"`);

    db.query(`INSERT INTO CompletedModules (UserID, LearningModID, DateCompleted, Points, Percentage)  VALUES (?,?,?,?,?)`, [userid, categoryId, today, points, percentage], (err,result) => {
        if(err) {
            logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
        }
        db.query("INSERT INTO UserPoints (PointsID, UserID, CompanyID) VALUES (?,?,?)", [moduleNum, userid, companyid], (err,result) => {
            if(err) {
                logger.log('error', { methodName: '/moduleCompleted', errorBody: err }, { service: 'user-service' });
            }
            db.query(`SELECT * FROM CompletedModules JOIN UserPoints WHERE userid = '${userid}'`, (err,result) => {
                logger.log('info', `User-${userid} completed Module ${categoryId}, on: ${today} and scored ${points} points.`);
                res.send({success: true, data: result, message: `Completed Module`});
            })
        })
    })   
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
 * Assign a learning module to a company if it is not already assigned
 * TODO assign date
*/
const assignModulesToCompany = (req,res) => 
{
    const learningmodid = req.body.learningModId
    const companyid = req.body.companyid

    db.query(`SELECT EXISTS(SELECT * FROM CompanyLearningModules as CLM ` +
    `WHERE CLM.LearningModId = '${learningmodid}' and CLM.CompanyID = '${companyid}') AS doesExist`, (err,result) => {
        if (result[0].doesExist == 0)
        {
            db.query("INSERT INTO CompanyLearningModules (LearningModID, CompanyID) VALUES (?,?)", [learningmodid, companyid], (err, result) => {
            res.send(true)
            });
        }
        else
        {
            res.send(false)
        }
    })
 }

/**
 * Removes assigned learning module from a company
 * Also removes all completed module records for that learning module
 * from all users in the company
 */
 const removeModuleFromCompany = (req, res) => {
    const learningmodid = req.body.learningModId
    const companyid = req.body.companyid

    db.query((`SELECT EXISTS(SELECT * FROM CompanyLearningModules ` +
        `WHERE CompanyLearningModules.LearningModID = '${learningmodid}' and CompanyLearningModules.CompanyID = '${companyid}') AS doesExist`), (err, result) => {
        if (result[0].doesExist == 1)
        {
            if (err) logger.log('error', { methodName: '/removeModuleFromCompany', errorBody: err }, { service: 'user-service' });

            db.query(`DELETE FROM CompanyLearningModules WHERE CompanyLearningModules.LearningModID = '${learningmodid}' and CompanyLearningModules.CompanyID = '${companyid}'`, (err, result) => {
                logger.log('info', `Deleted CompanyLearningModule with companyID: "${companyid}" and learningModID: "${learningmodid}" Fields: ${result}`, { service: 'user-service' })
                db.query(`SELECT AffiliatedUsers.UserID ` + 
                    `FROM AffiliatedUsers ` +
                    `WHERE AffiliatedUsers.CompanyID = '${companyid}'`, (err, company_users) => {
                        logger.log('info', `Queried User ids affiliated with company: "${companyid}" Fields: ${result}`, { service: 'user-service' })
                    for (index in company_users) {
                        db.query(`DELETE FROM CompletedModules WHERE CompletedModules.LearningModID = ` +
                            `'${learningmodid}' and CompletedModules.UserID = '${company_users[index].UserID}'`, 
                            (err, result) => {
                                if(!err && result.affectedRows > 0) deletionStatus = true;
                                else deletionStatus = false;
                                logger.log('info', `Attempted deletion of CompletedModules record learningModID: "${learningmodid}" and UserID: "${company_users[index].UserID}." Successfully deleted if true: "${deletionStatus}" Fields: ${result}`, { service: 'user-service' })    
                            });

                    }
                    res.send(true)
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
 * Here we update a module to have a new date due
 * To start the process off we need to construct a sql accepted 
 * date string
 */
const updateCompanyModuleDueDate = (req, res) => {
    //today.setDate(today.getDate() - 1);
    const learningmodid = req.body.learningModId
    const companyid = req.body.companyid
    const dateDue = new Date(req.body.dateDue)
    dateDue.setDate(dateDue.getDate())
    dateDue.setHours(23, 59)
        

    db.query(`UPDATE CompanyLearningModules SET DueDate = ? WHERE CompanyID = ? AND LearningModID = ?`, [dateDue, companyid, learningmodid], (err,result) => {
        if (err) {
            logger.log('error', { methodName: '/updateCompanyModuleDueDate', errorBody: err }, { service: 'user-service' });
            res.send(false)
        }
        logger.log('info', `Updated CompanyLearningModule with companyID: "${companyid}" and learningModID: "${learningmodid}" to date: "${dateDue}" Fields: ${result}`, { service: 'user-service' })
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
    userModuleCompleted,
    deleteUser,
    assignModulesToCompany,
    removeModuleFromCompany,
    userModuleCompleted,
    updateCompanyModuleDueDate,
};
