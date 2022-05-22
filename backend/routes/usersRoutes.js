const usersRouter = require('express').Router();
const usersCtrl = require('../controllers/usersCtrl');
const { protect } = require('../middleware/authMiddle');


// registration route
usersRouter.post('/', usersCtrl.registerUser);
// login route
usersRouter.post('/login', usersCtrl.authUser);
usersRouter.post('/profile', protect, usersCtrl.updateUserProfile);


module.exports = usersRouter;
