const mongoose = require('mongoose');

const mongooseHandle= new mongoose.Schema({
    postID:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    time: {
        type:Date,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    comments: {
        type:Array,
        required:true
    }
})

module.exports=mongoose.model('post',mongooseHandle);