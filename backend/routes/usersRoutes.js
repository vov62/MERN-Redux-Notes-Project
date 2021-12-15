const usersRouter = require('express').Router();
const usersCtrl = require('../controllers/usersCtrl');

// registration route
usersRouter.post('/', usersCtrl.registerUser);
// login route
usersRouter.post('/login', usersCtrl.authUser);


module.exports = usersRouter;
