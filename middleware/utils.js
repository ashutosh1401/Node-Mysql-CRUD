const jwt = require('jsonwebtoken')

const getToken = (user) => {
    return jwt.sign(
        {
            UserId: user.UserId,
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "48h"
        }
    )
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        const finToken = token.slice(7, token.length)
        jwt.verify(finToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ error: "Invalid Token" })
            }
            req.user = decode
            next()
            return;
        })
    }
    else {
        return res.status(401).send({ error: "User is not authenticated" })
    }
}

module.exports = {
    getToken,
    isAuth
}