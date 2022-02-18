const bcrypt = require("bcrypt");
const api_config = require('../api_config.json')
const saltRounds = api_config.SALT_ROUNDS;
const db = require('../db_config')

const userRegister = (req,res) => 
{
    const email = req.body.email
    const password = req.body.password
    const username = email.substring(0, email.indexOf("@"));
    console.log('REGISTERED WITH CREDENTIALS:', req.body.email, req.body.password, username)

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err,result) => {
        if (result[0].doesExist == 0)
        {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) console.log(err);
                db.query("INSERT INTO Users (username, email, password) VALUES (?,?,?)", [username, email, hash], (err, result) => {
                    db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,result) => {
                        req.session.userSession = result;
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
    console.log('LOGGED IN WITH CREDENTIALS:', req.body.email, req.body.password)

    db.query(`SELECT EXISTS(SELECT * FROM Users WHERE email = '${email}') AS doesExist`, (err,result) => {
        console.log('EXISTS', result)
        if (result[0].doesExist == 1)
        {
            db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err,result) => {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) 
                    {
                        req.session.userSession = result;
                        console.log('userLogin -> req.session', req.session);
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
    console.log('userLoginSession -> req.session', req.session)
    if (req.session.userSession)
    {
        console.log('SESSION CREATED:', req.session.userSession)
        res.send({ loggedIn: true, user: req.session.userSession });
    } 
    else 
    {
        res.send({ loggedIn: false });
    }
}

const userLogout = (req, res) =>
{
    console.log('userLoginSession -> req.session', req.session)
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
