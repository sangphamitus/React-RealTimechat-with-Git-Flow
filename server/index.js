const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const router =require('./router');
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors =require('cors')

const authen=require('./UserHandler/auth')
const userHandle=require('./UserHandler/userHandle');
const contact=require('./ContactHandler/getContact');
const messagesHandle=require('./messagesHandle/getMessagesHandle')
const postHandle=require('./postHandler/getPost');
const PORT=process.env.PORT||5000;



const app=express();
const server =http.createServer(app);
const io=socketio(server);

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("Database connected"));
app.use(cors())
app.options('*', cors())
app.use(express.json())


app.use(router);
app.use('/api/user',authen);
app.use('/api/user',userHandle);
app.use('/api/contact',contact);
app.use('/api/message',messagesHandle);
app.use('/api/post',postHandle);
app.get('/', (req,res)=>{
    res.status(200).send('server is running');
})


io.on('connect',(socket)=>{

 
    socket.on('disconnect',()=>{
        console.log('new disconnect');

    })


    socket.on('sendMessage',(callback)=>{
        
        io.emit('fetchMessage',{message:'fetch'});
       

    })

    
   

})

server.listen(PORT ,()=>{
    console.log(`Listen on Port:  ${PORT}`);
})