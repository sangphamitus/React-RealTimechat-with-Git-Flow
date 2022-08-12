const router=require('express').Router();
const post=require('../Model/postHandle');
const {postPostComment,fetchPostComment,sendPost}=require('../validation')
const {v4}=require('uuid');

router.post('/postPost',(req,res)=> {
    const {error} = sendPost(req.body);
    if (error) return res.status(400).send({message:error.message});

    const ava=req.body.hasOwnProperty('avatar')?req.body.avatar:"default";
    const poster= new post({
        postID:v4(),
        username: req.body.username,
        avatar: ava,
        type:req.body.type,
        time: Date.now(),
        content:req.body.content,
        comments: []

    })

    poster.save().then(res.status(200).send({message:"success"}))
    .catch(error=> {console.log(error) });
    
})

router.post('/fetchPost',async(req,res)=>{
    const listPosts=await post.find().sort({$natural:1}).limit(10);
    res.status(200).send({message:"success",listPosts:{listPosts}})
})

router.post('/postPostComment',async(req,res)=> {
    const {error} = postPostComment(req.body);
    if (error) return res.status(400).send({message:error.message});

    const commentedPost=await post.findOne({postID:req.body.postID});
    if(!commentedPost)   {
       return res.status(400).send({message:"bad request"});
    }
 
        const cmt=[...commentedPost.comments,{username:req.body.username,comment:req.body.comment}];
        const poster= new post({
            postID:commentedPost.postID,
            username: commentedPost.username,
            avatar: commentedPost.avatar,
            type:  commentedPost.type,
            time: commentedPost.time,
            content:commentedPost.content,
            comments: cmt
        })
        commentedPost.overwrite(poster);
        commentedPost.save().then(res.status(200).send({message:"success",comments:cmt}))
        .catch(error=>console.log(error));
  
})

router.post('/fetchPostComment',async(req,res)=> {
    const {error} = fetchPostComment(req.body);
    if (error) return res.status(400).send({message:error.message});

    const commentedPost=await post.findOne({postID:req.body.postID});
    if(!commentedPost) return  res.status(400).send({message:"bad request"});
   
   
    res.status(200).send({message:"success",comments:commentedPost.comments})
      
    
})

module.exports=router;