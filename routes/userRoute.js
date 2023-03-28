const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware')

const router = express.Router();

router.route('/signup').post(userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/logout').get(userController.logoutUser);
router.route('/dashboard').get(userMiddleware,userController.getDashboardPage);


module.exports = router;