const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware')
const { body } = require('express-validator');
const User = require('../models/User')

const router = express.Router();

router.route('/signup').post([
    body('name').not().isEmpty().withMessage('Please enter your name'),
    body('email').not().isEmail().withMessage('Please enter valid email')
    .custom((userEmail) => {
        return User.findOne({email:userEmail}).then(user =>{
            if(user){
                return Promise.reject('Email is already exist')
            }
        })
    }),
    body('password').not().isEmpty().withMessage('Please enter password')
],userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/logout').get(userController.logoutUser);
router.route('/dashboard').get(userMiddleware,userController.getDashboardPage);


module.exports = router;