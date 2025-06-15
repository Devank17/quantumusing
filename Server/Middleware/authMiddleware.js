const userModel = require('./../Models/userModel');
const jwt = require('jsonwebtoken'); 
const blackListTokenModel = require('../Models/userModel');



module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if(!token) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    const blackListed = await blackListTokenModel.findOne({ token: token });

    if(blackListed) {
        return res.status(401).json({ error: ' Unanthorized' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
  
    
        // Find the user by ID from the decoded token
        const user = await userModel.findById(decoded._id);
    
        req.user = user;
    
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Not authorized' });
    }
}


