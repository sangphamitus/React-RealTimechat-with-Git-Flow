const mongoose = require('mongoose')

const signUpTemplate= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password: {
        type:String,    
        required:true
    },
    pid:{
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }


})

module.exports = mongoose.model('account',signUpTemplate);