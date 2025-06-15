const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const AdminController = require('../Controllers/adminController')


router.get('/', AdminController.getAllAdmins);

router.post('/create' ,[
    body('name').notEmpty().isLength({ min:3}).withMessage('First name must be at lest 3 character long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
] , AdminController.registerAdmin);



router.post('/login' ,[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], AdminController.loginAdmin);


router.get('/users', AdminController.getAllUsers);

// router.get('/logout'  , authMiddleware.authAdmin , AdminController.logoutAdmin);

// router.get('profile' , authMiddleware.authAdmin , AdminController.profileAdmin);


module.exports = router