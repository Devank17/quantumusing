const userModel = require('./../Models/userModel');
const userService = require('./../Services/userServices');
const { validationResult } = require('express-validator');
// const blacklistTokenModel = require('./../Models/blacklistModel')


module.exports.registerUser = async function (req, res, next) {
    try {
        // Validate input fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

      

        const isUserAlreadyExist = await userModel.findOne({ email: email, })
        if (isUserAlreadyExist) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Check for missing fields
        if (!name  || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if email already exists
        

        

        // Hash the password
        const hashPassword = await userModel.hashPassword(password);
        
        // Create the user
        const user = await userService.createUser({
            name,
            email,
            password: hashPassword
        });

        // Generate a token
        const token = user.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true, // Prevents access from JavaScript
            secure: true, // Ensures usage over HTTPS
            sameSite: 'Lax', // Helps with CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days (in milliseconds)
          });
      
        
        // Respond with success
        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Error registering user:', error);

        // Handle MongoDB duplicate key error
        if (error.code === 11000 && error.keyPattern?.email) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // General server error
        res.status(500).json({ error: 'An unexpected error occurred' });
    }

    
};





module.exports.loginUser = async function (req, res, next) {

    try {
        // Validate incoming request (await for asynchronous validation)
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        

        // Check for missing fields
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Find user by email, including password for comparison
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare entered password with the stored password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = user.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true, // Prevents access from JavaScript
            secure: true, // Ensures usage over HTTPS
            sameSite: 'Lax', // Helps with CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days (in milliseconds)
            });

        // Send response with token and user details
        return res.status(200).json({ token, user });
    } catch (error) {
        console.error('Login error:', error);

        // Handle unexpected errors
        return res.status(401).json({ error: 'An unexpected error occurred, please try again later' });
    }

    
};


module.exports.profileUser = async function (req, res, next) {


    res.status(200).json(req.user)


    
};




module.exports.logoutUser = async function (req, res, next) {

    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blacklistTokenModel.create({token})

    res.status(200).json({ message: 'Logged out' });

    
};


