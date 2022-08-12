const mongoose=require('mongoose');

const messagesHandle=new mongoose.Schema({
    mid:{
        type:String, 
        required:true
    },
    chatname:
    {   
        type:String,
        required:true
    },
    members:{
        type:Array,
        required:true
    },
    messages: {
        type:Array,
        required:true
    }
})

module.exports=mongoose.model('messages',messagesHandle);