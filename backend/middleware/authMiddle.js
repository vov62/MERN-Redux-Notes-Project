const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');

//function that going to protect the api from unauthorized access 
//whenever user logs in user has to pass through this middleware to reach the api

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        // check the headers authorization if its present and if the authorization has token which starts with Bearer 
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // verifying the token was sent by the user 
            token = req.headers.authorization.split(" ")[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //find the user by ID leave the password so we dont get the password from DB 
            req.user = await userModel.findById(decoded.id).select("-password");

            // than send the function to api
            next()

        } catch (err) {
            res.status(401);
            throw new Error('not authorized ,token failed')
        }
    }

    if (!token) {
        // that means no token was sent by user
        res.status(401);
        throw new Error('Not authorized, no token')
    }

});

module.exports = { protect };