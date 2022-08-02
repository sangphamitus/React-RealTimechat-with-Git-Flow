const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const router =require('./router');
const {addUsers,findUser,removeUser,updateSid,getUserInRoom}=require('./users')


const PORT=process.env.PORT||5000;

const app=express();
const server =http.createServer(app);
const io=socketio(server);

app.use(router);

io.on('connect',(socket)=>{


    console.log('new connection');

    socket.on('join',({pid,name},callback)=> {
        console.log(`ID:${pid} - Name:${name}`);
        addUsers({pid,name});
        callback();
    })

    socket.on('updateSid',({pid},callback)=>{
        const {error,users}=updateSid({pid,sid:socket.id})
        callback(error);
        console.log(`update sid: ${users.name}: ${users.sid}`);
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