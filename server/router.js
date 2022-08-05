const express=require('express');
const router =express.Router();
const signUpTemplateCopy=require('./signupHandle')


router.get('/',()=> {
    res.send('server is running');
})

module.exports=router