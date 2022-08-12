const router=require('express').Router();

router.get('',(req,res)=>{
    res.status(200).send('server running')
})
router.post('',(req,res)=>{
    res.status(200).send('server running')
})
