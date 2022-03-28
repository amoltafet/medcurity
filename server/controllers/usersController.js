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
 * Queries the database to register an inactive user.
 */
const userRegisterEmpty = (req,res) => 
{

    const email = req.body.email
    const username = email.substring(0, email.indexOf("@"));

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err,result) => {
        if (result[0].doesExist == 0)
        {
            db.query("INSERT INTO Users (username, email, active) VALUES (?,?,?)", [username, email, false], (err, result) => {
                db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,result) => {
                    res.send(true)
                })
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

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err,result) => {
        if (result[0].doesExist == 1)
        {
            db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,result) => {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) 
                    {
                        req.session.userSession = result;
                        logger.log('info', `Existing user "${email}" logged in.`, { service: 'user-service' })
                        res.send({ result: result, success: true, message: "Logging in!" });
                    } 
                    else 
                    {
                        res.send({ success: false, message: "Wrong username/password combination!" });
                    }
                });
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
    if (req.session.userSession)
    {
        logger.log('info', `Successfully logged out user "${req.session.userSession[0].username}"`, { service: 'user-service' })
        req.session.destroy()
        res.send({ success: true, message: "Logging out!" });
    } 
    else 
    {
        logger.log('info', `Failing logged out user. User most likely logged out without a session.`, { service: 'user-service' })
        res.end()
        res.send({ success: false, message: "Could not log out..." });
    }
}

/**
 * Updates the users settings - only username for now.
 */
const changeUserName = (req, res) => {
    const newUserName = req.body.username;
    const userId = req.body.id;

    logger.log('info', ` username  "${newUserName}"`);
    logger.log('info', `id "${userId}"`);
    db.query(`UPDATE Users SET username = "${newUserName}" WHERE userid = "${userId}"`, (err,result) => {
        db.query(`SELECT * FROM Users WHERE userid = '${userId}'`, (err,result) => {
            req.session.userSession = result;
            logger.log('info', `Updated username to "${newUserName}"`);
            res.send({ result: result, success: true, message: "Updated username!" });
        })
    })   
}

/**
 * Updates the users points from the quiz.
 */
const userPoints = (req, res) => {
    const categoryName = req.body.categoryName;
    const points = req.body.points;
    const percentName = req.body.percentName;
    const length = req.body.lengths;
    const userid = req.body.userid;

   

    db.query(`UPDATE Users SET ${categoryName} = '${points}', ${percentName} = "${length}" WHERE userid = '${userid}'`, (err,result) => {
        db.query(`SELECT * FROM Users WHERE userid = '${userid}'`, (err,result) => {
            logger.log('info', `Updated User-"${userid}" points to: "${points}"`);
            req.session.userSession = result;
            res.send({ result: result, success: true, message: `Updated user points to ${points}!` });
        })
    })   
}

/**
 * Moves the assigned module to be a completed module.
 */
const userModuleCompleted = (req, res) => {
    var today = new Date();
    today.setDate(today.getDate() - 1);
    const categoryId = req.body.categoryId;
    const userid = req.body.userid;   

    db.query(`INSERT INTO CompletedModules (UserID, LearningModID, DateCompleted)  VALUES (?,?,?)`, [userid, categoryId, today], (err,result) => {
        db.query(`DELETE FROM AssignedLearningModules WHERE LearningModID = "${categoryId}" AND UserID = "${userid}"`, (err,result) => {
            db.query(`SELECT * FROM Users WHERE userid = '${userid}'`, (err,result) => {
                logger.log('info', `User-'${userid}' completed Module '${categoryId}', on: "${today}"`);
                req.session.userSession = result;
                res.send({success: true, message: `Completed Module & Removed from the Assigned`});
            })
        }) 
    })   
}

/**
 * Changes the users profile picture.
 */
 const changeProfilePicture = (req, res) => {
    const newProfilePicture = req.body.profilepicture;
    const userId = req.body.id;

    logger.log('info', ` profile picture  "${newProfilePicture}"`);
    logger.log('info', `id "${userId}"`);
    db.query(`UPDATE Users SET profilepicture = "${newProfilePicture}" WHERE userid = "${userId}"`, (err,result) => {
        db.query(`SELECT * FROM Users WHERE userid = '${userId}'`, (err,result) => {
            req.session.userSession = result;
            logger.log('info', `Updated profile picture to "${newProfilePicture}"`);
            res.send({ result: result, success: true, message: "Updated profile picture!" });
        })
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
    changeUserName,
    userPoints,
    userModuleCompleted,
    changeProfilePicture,
};
