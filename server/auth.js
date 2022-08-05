const router=require('express').Router();
const User=require('./signupHandle');
const Scrypt=require('bcrypt');
const {registerValidation,loginValidation} =require('./validation')

router.post('/register',async(req,res)=> {

    const {error} = registerValidation(req.body);
    if(error) return res.status(200).send({message:error.details[0].message});
    
    const usernameExist=await User.findOne({username:req.body.username});
    if(usernameExist) return res.status(200).send({message:'Username exist'});

    const salt= await Scrypt.genSalt(10);
    const hashedPassword= await Scrypt.hash(req.body.password,salt);
    const hashedPid =await Scrypt.hash(req.body.username,salt);
    const user =new User({
        username:req.body.username,
        password:hashedPassword,
        pid:hashedPid
    }) 
    if(!usernameExist)
    {
        user.save().then(res.status(200).send({message:"success"})).catch(error=>res.status(400).send({message:error}));
    }
    
})

router.post('/login', async (req,res)=> {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send({mesage:error.details[0].message});
    
    const user=await User.findOne({username:req.body.username});
    if(!user) return res.status(200).send({message:'Invalid username or password'});
    
    const valid= await Scrypt.compare(req.body.password,user.password);
    if (!valid) return res.status(200).send({message:'Invalid username or password'});

    return res.status(200).send({message:'success',pid:user.pid})
    
})   
module.exports=router;