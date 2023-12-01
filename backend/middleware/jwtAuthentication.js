const secret = "anyRandomKey8712672!@#$%^&*()"
const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
        res.status(403).json({
            message: "Token access denied"
        })
    }
    try {
        const data = jwt.verify(token, secret);
        req.user = data.user


        next();
    }
    catch (eror) {
        res.send({
            message: "Internal server error"
        })
    }
}

module.exports = jwtAuth;
