const router=require('express').Router();
const messages=require('../Model/messagesHandle');
const Users=require('../Model/signupHandle');
const {createMessages,findMessages,sendMessages,fetchMessages} =require('../validation')
const uuid =require('uuid');

router.post('/create', async (req,res)=>{
    
    const {error} = createMessages(req.body);
    if(error) return res.status(400).send({messages:error});

    const room = await messages.findOne({members:{$all:req.body.members, $size:req.body.members.length}} );
    if(!room)
    {
        
        const namechat="...";
        const mid=uuid.v4();
        const message= new messages({
            mid:mid,
            chatname:namechat,
            members:req.body.members,
             messages: []
        })

        message.save().then(res.status(200).send({message:'success',mid:mid,chatname:namechat}))
                        .catch(error=>res.status(400).send({message:error}));
    }  
    else
    {
        res.status(200).send({message:'success',mid:room.mid,chatname:room.chatname});
                      
    }
});

router.post('/find',async (req,res)=> {

    const {error} = findMessages(req.body);
    if(error) return res.status(400).send({message:error});

    const room = await messages.findOne({mid:req.body.mid} );
    if (!room) return res.status(400).send({message:'not have this room'});

    return  res.status(200).send({message:'success',
                                    chatname:room.chatname,
                                    messages:room.messages});
})

router.post('/send',async(req,res)=>{

    const {error} =sendMessages(req.body);
    if(error) return res.status(400).send({message:error});
    
    const room = await messages.findOne({mid:req.body.mid} );
    if (!room) return res.status(400).send({message:'not have this room'});
    
 
    const listMessages= [...room.messages,{pid:req.body.pid,username:req.body.username, message:req.body.message}]
 
    const messageK= new messages({
        mid:room.mid,
        chatname:room.chatname,
        members:room.members,
        messages: listMessages
    })
    room.overwrite(messageK);
    room.save().then( res.status(200).send({message:'success',listMessages:listMessages})).catch(error=>res.status(400).send({message:error}));
})

router.post('/fetch',async(req,res)=> {

    const {error} =fetchMessages(req.body);
    if(error) return res.status(400).send({message:error});

    const room = await messages.findOne({mid:req.body.mid} );
    if (!room) return res.status(400).send({message:'not have this room'});

    return res.status(200).send({message:'success',listMessages:room.messages});
})

module.exports=router;