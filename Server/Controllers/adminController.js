const adminModel = require('./../Models/adminModel');
const adminServices = require('./../Services/adminServices');
const { validationResult } = require('express-validator');
// const blacklistTokenModel = require('./../Models/blacklist.Model')


module.exports.getAllAdmins = async function (_, res) {
    try {
        const admins = await adminModel.find({}, { password: 0 }).lean();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};


module.exports.registerAdmin = async function (req, res, next) {
    try {
        // Validate input fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        console.log(req.body)

        const adminAlreadyExists = await adminModel.findOne({ email: email, })
       
        if (adminAlreadyExists) {
            return res.status(400).json({ error: 'Admin with this email already exists' });
        }
     

        // Check for missing fields
        if (!name  || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        

        // Hash the password
        const hashPassword = await adminModel.hashPassword(password);

        // Create the user
        const admin = await adminServices.createAdmin({
            name,
            email,
            password: hashPassword
        });

        // Respond with success
        res.status(200).json({ message: 'Admin created successfully', admin });

    } catch (error) {
        console.error('Error creating admin:', error);
        // Handle MongoDB duplicate key error
        if (error.code === 11000 && error.keyPattern?.email) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // General server error
        res.status(500).json({ error: 'An unexpected error occurred' });
    }

    
};


module.exports.loginAdmin = async function (req, res, next) {

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
        const admin = await adminModel.findOne({ email }).select('+password');
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        // Compare entered password with the stored password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = admin.generateAuthToken();
        
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, // Consider removing 'secure: true' if NOT using HTTPS during development (e.g., on localhost)
            secure: process.env.NODE_ENV === 'production', // Better: only secure in production
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        // Send response with token and user details
        return res.status(200).json({ token, admin: { _id: admin._id, name: admin.name, email: admin.email } }); // Send only necessary admin fields
    } catch (error) {
        console.error('Login error:', error);

        // Handle unexpected errors
        return res.status(401).json({ error: 'An unexpected error occurred, please try again later' });
    }

    
};


module.exports.getAllUsers = async function (req, res, next) {
    try {
        const users = await adminServices.getAllUsers(); // Assuming adminServices has a method to fetch all users
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};


module.exports.logoutAdmin = async function (req, res, next) {

    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blacklistTokenModel.create({token})

    res.status(200).json({ message: 'Logged out' });

};



