const mongoose =require('mongoose');

const contactUser=new mongoose.Schema({
    pid:{
        type:String,
        required:true

    },
    contacts: {
        type:Array,
        required:true
    }
})

module.exports =mongoose.model('contactUser',contactUser)