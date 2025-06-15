const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true
    },
    email: {    
        type: String,
        required: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },      
    contact: {  
        type: String,
        required: true,
    },
    queryType: { 
        type: String,
        required: true,
        enum: ['General Inquiry', 'Technical Support', 'Career Opportunity', 'Other'],
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: { // New field to track query status
        type: String,
        enum: ['unanswered', 'answered'],
        default: 'unanswered'
    }
}, { timestamps: true });

const Query = mongoose.model('Query', querySchema);

module.exports = Query;