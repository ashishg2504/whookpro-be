const jwt = require("jsonwebtoken")
const { response } = require("../helpers/response")
const User = require('../models/userModel')
require('dotenv').config()

module.exports = {
    issueToken: (userId) => {
        let token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token
    },
    validateToken: async (req, res, next) => {
        try {
            //Get token from header
            const authorization = req.headers.authorization
            if (!authorization) return response(res, 401, "false", { message: "Token is required" })
            const token = authorization.split(" ")[1]
            //Decode Token
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return response(res, 401, false, err.message)
                } else {
                    req.user = decoded.userId
                    next()
                }

            });

        } catch (err) {
            console.log(err)
            return response(res, 500, false, "Invalid JWT")
        }
    }

}