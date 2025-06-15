const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const adminSchema = new mongoose.Schema({
    name:{
        type: 'String',
        required:true,
        minlength:[ 3,'First name must be at least 3 characters long']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[ 5,'Email must be at least 5 characters long']
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'Password must be at least 8 characters long'],
        select:false,
    },

});

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, name: this.name, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};

adminSchema.methods.comparePassword = async function(Password){
    return await bcrypt.compare(Password, this.password);
}

adminSchema.statics.hashPassword = async function(Password){
    return await bcrypt.hash(Password,10);
}

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;