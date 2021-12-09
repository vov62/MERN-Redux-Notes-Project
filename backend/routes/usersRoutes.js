const usersRouter = require('express').Router();
const { registerUser, authUser } = require('../controllers/usersCtrl');

// registration route
usersRouter.route('/').post(registerUser);
// login route
usersRouter.route('/login').post(authUser);


module.exports = usersRouter;