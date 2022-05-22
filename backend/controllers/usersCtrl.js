const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    // requesting all of this fields from the user
    const { name, email, password, picture } = req.body;

    //check if the user already exists in the database or not with findOne db method, use email because email is unique
    const userExists = await userModel.findOne({ email });

    // check if user exists and throw error
    if (userExists) {
        res.status(404)
        throw new Error('User Already Exists')
    }
    //if the user doesn't exist, create a new user in db
    const user = await userModel.create({
        name,
        email,
        password,
        picture,
    })
    // if user created successfully then send response 
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            picture: user.picture,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User Not Found!')
    }
})

// login function
const authUser = asyncHandler(async (req, res) => {
    // requesting email and password fields from the user for login
    const { email, password } = req.body;

    //check if the user already exists in the database or not with findOne db method, use email because email is unique 
    const user = await userModel.findOne({ email });

    // check if user exists and if the password is correct or not  
    if (user && (await user.matchPassword(password))) {
        res.json({
            // _id: user._id,
            name: user.name,
            // email: user.email,
            // isAdmin: user.isAdmin,
            // picture: user.picture,
            token: generateToken(user._id)
        })
    } else {
        // res.status(400).json({ success: false, message: 'Oh snap! Invalid Email Or Password' })
        res.status(401);
        throw new Error('Oh snap! Invalid Email Or Password')
    }

})

// only user that logged in can update his own profile via _id 
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id)

    // check is user exists
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.picture = req.body.picture || user.picture;

        // if the body contain the password 
        if (req.body.password) {
            user.password = req.body.password;
        }

        // save it
        const updateUser = await user.save();
        // once this operation is completed send the info to the frontend 
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            picture: updateUser.picture,
            token: generateToken(updateUser._id)
        })
    } else {
        // if user not found
        res.status(404)
        throw new Error('user not found!')
    }

});

module.exports = { registerUser, authUser, updateUserProfile }