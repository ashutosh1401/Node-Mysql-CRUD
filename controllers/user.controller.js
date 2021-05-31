const pool = require('../database')
const bcrypt = require('bcryptjs')
const { getToken } = require('../middleware/utils');
const { isPasswordStrong, isValidEmail } = require('../middleware/verifyInput')

const register = async (req, res) => {
    try {
        const { name, email, password, repassword } = req.body
        // console.log(req.body)
        if (!name || !email || !password || !repassword) {
            return res.status(400).send({ error: "Input missing" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ error: "Email is invalid" })
        }
        if (password != repassword) {
            return res.status(400).send({ error: "password and repassword are not same" });
        }
        if (!isPasswordStrong(password)) {
            return res.status(400).send({ error: "Password is not strong, must contain atleast 1 capital, 1 special char, 1 number" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        const newUser = {
            name: name,
            email: email,
            password: hashedPassword
        }
        console.log(newUser);

        const user = await pool.query("INSERT INTO USERS SET ?", [newUser])
        console.log(user)
        if (user) {
            res.status(201).send("User registered succesfully")
        }

    } catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!isValidEmail(email)) {
            return res.status(400).send({ error: "Email is invalid" })
        }
        const fuser = await pool.query("SELECT * FROM USERS WHERE email=?", [email]);
        JSON.stringify(fuser);
        console.log(fuser);

        //.status(201).send(fuser)
        //console.log(fuser[0].userId)
        if (fuser) {
            const isMatch = await bcrypt.compare(password, fuser[0].password)
            if (isMatch) {
                res.status(201).send({
                    fuser,
                    token: getToken(fuser[0])
                })
            }
        }

    } catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
}

const getUserdetails = async (req, res) => {
    try {
        const { email } = req.user
        const userdet = await pool.query("SELECT userId,name,email FROM USERS WHERE email=?", [email])
        if (userdet) {
            res.status(200).send({
                userdet
            })
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = { register, login, getUserdetails }