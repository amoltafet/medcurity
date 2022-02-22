const bcrypt = require("bcrypt");
const api_config = require('../api_config.json')
const saltRounds = api_config.SALT_ROUNDS;
const db = require('../db_config')
const logger = require('../logger').log

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

const userLogout = (req, res) =>
{
    console.log('2896')
    logger.log('info', `Logging out user "${req.session.userSession[0].username}"`, { service: 'user-service' })
    if (req.session.userSession)
    {
        res.session.destroy()
        res.send({ success: true, message: "Logging out!" });
    } 
    else 
    {
        res.end()
        res.send({ success: false, message: "Could not log out..." });
    }
}

module.exports = 
{
    userLogin,
    userRegister,
    userLoginSession,
    userLogout,
};