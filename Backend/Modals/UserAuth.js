const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    companyName: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: null
    }
})
userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
}); 


userSchema.methods.updateLastLogin = function () {
    this.lastLogin = new Date();
    return this.save();
};


module.exports = mongoose.model('UserAuth', userSchema)