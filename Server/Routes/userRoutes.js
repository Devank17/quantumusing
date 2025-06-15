const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const UserController = require('./../Controllers/userController')
const authMiddleware = require('./../Middleware/authMiddleware')


router.post('/register' ,[
    body('name').notEmpty().isLength({ min:3}).withMessage('First name must be at lest 3 character long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
] ,UserController.registerUser);


router.post('/login' ,[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], UserController.loginUser);


router.get('/Profile' , authMiddleware.authUser , UserController.profileUser);


router.get('/logout'  , authMiddleware.authUser , UserController.logoutUser);

module.exports = router