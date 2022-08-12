
const router=require('express').Router();
const User=require('../Model/signupHandle');
const {findUser,queryUser} =require('../validation')

router.post('/finduser',async (req,res)=> {
   
    const {error} = findUser(req.body);
    if(error) return res.status(400).send({message:error.data[0].message,username:null});

    const user= await User.findOne({pid:req.body.pid} );
    if(!user) return res.status(400).send({message:'Not have this pid',username:null});
  
    return res.status(200).send({message:'success',username:user.username});

});
router.post('/queryuser',async(req,res)=> {
    const {error} = queryUser(req.body);
    if(error) return res.status(400).send({message:error,user:null});

    const users=await User.find({ username: { $regex: req.body.username } });
    if(!users) return res.status(400).send({message:'Not have this user',user:null});

    const infoReturn =users;
    return res.status(200).send({message:'success',user:infoReturn});

})
module.exports=router;