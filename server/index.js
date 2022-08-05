const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const router =require('./router');
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors =require('cors')
const {addUsers,findUser,removeUser,updateSid,getUserInRoom}=require('./users')
const authen=require('./auth')

var bodyParser = require('body-parser')



const PORT=process.env.PORT||5000;

const app=express();
const server =http.createServer(app);
const io=socketio(server);

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("Database connected"));


app.use(express.json())
app.use(cors())

app.use(router);
app.use('/api/user',authen);
io.on('connect',(socket)=>{


    console.log('new connection');


    socket.on('updateSid',({pid},callback)=>{
        const {error,users}=updateSid({pid,sid:socket.id})
        callback(error);
        if(!error)
        {
            console.log(`update sid: ${users.name}: ${users.sid}`);
        }
       
    })

    socket.on('getInfo',({pid},callback)=>{
        console.log(pid);
        const {error,users}=findUser(pid);
        
        socket.emit('resInfo',{pid:users.pid,name:users.name},()=>{
            console.log(`${pid} sent`);
        });
      
        callback(error); 
    })
   

    socket.on('disconnect',()=>{
        console.log('new disconnect');
    
    })


    socket.on('sendMessage',({pid,message},callback)=>{
        const room=1;
        console.log({pid,message});
        const {users}=findUser(pid);
        console.log(`${users.name}:${message}`)
        io.to(getUserInRoom({room,pid})).emit('message',{username:users.name,text:message});
        callback();

    })

    
   

})

server.listen(PORT,()=>{
    console.log(`Listen on Port: ${PORT} `);
})