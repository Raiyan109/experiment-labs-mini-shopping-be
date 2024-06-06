const jwt = require('jsonwebtoken')
const User = require('../modules/user/user.model')
const config = require('../config')

const requireSignIn = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const token = authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: "Authentication failed!" });
        }
        const decoded = jwt.verify(
            token,
            // process.env.JWT_SECRET
            config.jwt_secret
        );
        // req.existingUser = decode
        const { userId } = decoded
        req.userId = userId
        console.log(req.userId);
        next();
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

module.exports = { requireSignIn }