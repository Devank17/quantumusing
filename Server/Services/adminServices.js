const adminModel = require('./../Models/adminModel');
const userModel = require('./../Models/userModel');

module.exports.createAdmin = async ({ name, email, password }) => {
    try {
        // Check for required fields
        if (!name || !email || !password) {
            throw new Error('All fields are required');
        }

        // Check if the admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            throw new Error('Email is already registered');
        }

        // Create the admin in the database
        const admin = await adminModel.create({
            name,
            email,
            password,
        });
        return admin;
    } catch (error) {
        console.error('Error creating admin:', error);

        // Throw a specific error if email is already registered
        if (error.code === 11000 && error.keyPattern?.email) {
            throw new Error('Email is already registered');
        }

        // Re-throw the error for higher-level handlers
        throw new Error(error.message || 'An unexpected error occurred while creating the admin');
    }
};


module.exports.getAllUsers = async () => {
    try {
        // Fetch all users from the database
        const users = await userModel.find({});
        return users;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw new Error(error.message || 'An unexpected error occurred while fetching all users');
    }
};