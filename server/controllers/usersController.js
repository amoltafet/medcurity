const bcrypt = require("bcrypt");
const serverConfig = require('../serverConfig.json')
const saltRounds = serverConfig.bcrypt.SALT_ROUNDS;
const db = require('../dbConfig')
const logger = require('../logger').log

/**
 * Queries the database to register a new user. Passwords are hashed + salted using bcrypt.
 * The following checks occur before user data is sent to the databse:
 *   - if the user already exists
 *   - contains valid email
 *   - contains a strong password
 */
const userRegister = (req,res) => 
{
    const email = req.body.email
    const password = req.body.password
    const username = email.substring(0, email.indexOf("@"));

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err,result) => {
        if (result[0].doesExist == 0)
        {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) console.log(err);
                db.query("INSERT INTO Users (username, email, password) VALUES (?,?,?)", [username, email, hash], (err, result) => {
                    db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,result) => {
                        req.session.userSession = result;
                        logger.log('info', `New user "${email}" registered.`, { service: 'user-service' })
                        res.send(true)
                    })
                });
            });
        }
        else
        {
            console.log("User already exists, returning false!")
            res.send(false)
        }
    })
}

const userRegisterEmpty = (req,res) => 
{
    console.log(req)
    const email = req.body.email
    const username = email.substring(0, email.indexOf("@"));

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err,result) => {
        if (result[0].doesExist == 0)
        {
            if (err) console.log(err);

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
 * handles logging out the user and deletes their session.
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

module.exports = 
{
    userLogin,
    userRegister,
    userRegisterEmpty,
    userLoginSession,
    userLogout,
};
