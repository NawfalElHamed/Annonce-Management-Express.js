const mongoose = require('mongoose');

const AnnounceSchema = new mongoose.Schema({
    Title: String,
    LongDescription: String,
    ShortDescription: String,
    Type: {
        type: String,
        enum: ['remote', 'hybrid', 'office']
    },
    MinSalary: Number,
    MaxSalary: Number,
    Country: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAuth',
        name:"userId"
    }
},{timestamps:true});

module.exports = mongoose.model('Announce', AnnounceSchema);
