


const jwt = require("jsonwebtoken")
const AuthCheckForEjs = (req, res, next) => {
    if (req.cookies && req.cookies.Token) {
        jwt.verify(req.cookies.Token, process.env.JWT_SECRECT, (err, data) => {
            req.user = data
            next()
        })
    } else {
        next()
    }
}

module.exports = AuthCheckForEjs;