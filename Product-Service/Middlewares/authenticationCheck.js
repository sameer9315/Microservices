const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
const { sendResponse } = require('./response');
dotenv.config();
const {not_authorized}= require('../constants');
module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.Private_Key, (err, user) => {
        if (err) {
            return sendResponse(res, 401,not_authorized )
        } else {
            req.user = user;
            next();
        }
    })
}