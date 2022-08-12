const Joi = require('@hapi/joi')

const registerValidation=(data)=>{
    const schema =Joi.object  ({ 
        username:Joi.string()
                .min(6)
                .required(),
        password:Joi.string()
                .min(6)
                .required()
    })
    return schema.validate(data);
}

const loginValidation=(data)=>{
    const schema = Joi.object({ 
        username:Joi.string()
                .min(6)
                .required(),
        password:Joi.string()
                .min(6)
                .required()
    })
    return schema.validate(data);
}

const findUser=(data)=> {
    const schema = Joi.object ({
        pid:Joi.string()
            .min(6)
            .required()
    })
    return schema.validate(data);
}
const queryUser=(data)=> {
    const schema = Joi.object ({
        username:Joi.string()
                .required()
    })
    return schema.validate(data);
}

const contactGet=(data)=> {
    const schema =Joi.object ({
        pid:Joi.string()
            .required(),
        mid:Joi.string()
                .min(6)
                .required(),
        chatname:Joi.string()
    
        .required()
    })
    return schema.validate(data);
}

const contactView=(data)=> {
    const schema=Joi.object({
        pid:Joi.string()
        .required()
    })
    return schema.validate(data);
}

const createMessages=(data)=> {
    const schema=Joi.object({
        members:Joi.array()
                .required()
    })
    return schema.validate(data);
}
const findMessages=(data)=> {
    const schema=Joi.object({
        mid:Joi.string()
            .required()
    })
    return schema.validate(data);
}
const sendMessages=(data)=> {
    const schema=Joi.object({
        pid:Joi.string()
            .required()
        ,
        mid:Joi.string()
            .required()
        ,
        username:Joi.string()
                .required()
        ,
        message:Joi.string()
                .required()
    })
    return schema.validate(data);
}
const fetchMessages=(data)=>{
    const schema=Joi.object({
        mid:Joi.string()
            .required()
    })
    return schema.validate(data);
}
const sendPost =(data)=>{
    const schema=Joi.object({
        username:Joi.string()
                .required()
        ,type:Joi.string()
                .required()
        ,
        content:Joi.string()
                .required()
    })
    return schema.validate(data);
}
const fetchPostComment=(data)=> {
    const schema=Joi.object({
        postID:Joi.string()
                .required()
    })
    return schema.validate(data);
}
const postPostComment=(data)=>{
    const schema=Joi.object({
        postID:Joi.string().required()
        ,
        username:Joi.string()
                .required()
        ,
        comment:Joi.string()
                .required()
    })
    return schema.validate(data);
}
module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;
module.exports.findUser=findUser;
module.exports.queryUser=queryUser;
module.exports.contactGet=contactGet;
module.exports.contactView=contactView;
module.exports.createMessages=createMessages;
module.exports.findMessages = findMessages;
module.exports.sendMessages=sendMessages;
module.exports.fetchMessages=fetchMessages;
module.exports.postPostComment=postPostComment;
module.exports.fetchPostComment=fetchPostComment;
module.exports.sendPost=sendPost;