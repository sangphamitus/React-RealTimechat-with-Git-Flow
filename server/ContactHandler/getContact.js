const router=require('express').Router();
const contact =require('../Model/contactHandle');
const {contactGet,contactView} =require('../validation');

router.post('/insert',async(req,res)=> {
    const {error} = contactGet(req.body);
    if (error) return res.status(400).send({message:error.message});
    
    const userContact =await contact.findOne({pid:req.body.pid});
    

        if(!userContact)
        {
            const newContact= new contact({
                pid:req.body.pid,
                contacts:[ {mid:req.body.mid,
                            chatname:req.body.chatname}]
            });
            
            newContact.save().then(res.status(200).send({message:"success"})).catch(error=>res.status(400).send({message:error}));
        }
        else
        {
       
            const exist= userContact.contacts.map(cont=>cont.mid).indexOf(req.body.mid);
            if(exist===-1)
            {
          
                const listContract=[...userContact.contacts,
                    {mid:req.body.mid,
                    chatname:req.body.chatname} ];
                const newContact=new contact({
                    pid:req.body.pid,
                    contacts:listContract
                });
                userContact.overwrite(newContact)
                userContact.save().then(res.status(200).send({message:"success"})).catch(error=>res.status(400).send({message:error}));

            }
            else
            {
                return res.status(200).send({message:"already have in list"});
               
            }
        }

    
})

router.post('/view',async(req,res)=> {
    const {error} = contactView(req.body);
    if (error) return res.status(400).send({message:error.message});
    
    const userContact =await contact.findOne({pid:req.body.pid});
    if(!userContact) return res.status(400).send({message:"not have this user in database"})

    return res.status(200).send({message:"success",contacts:userContact.contacts});
    
})


module.exports =router;