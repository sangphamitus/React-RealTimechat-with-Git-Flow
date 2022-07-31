const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const router =require('./router');
const {addUsers,findUser}=require('./users')


const PORT=process.env.PORT||5000;

const app=express();
const server =http.createServer(app);
const io=socketio(server);

app.use(router);

io.on('connect',(socket)=>{

    console.log('new connection');
    socket.on('join',({ID,name},callback)=> {
        console.log(`ID:${ID} - Name:${name}`);
        addUsers({ID,name});
        callback();
    })
    socket.on('getInfo',({id},callback)=>{
        console.log(id);
        let name=findUser(id);
        console.log(name);
        socket.emit('resInfo',{id,name},()=>{
            console.log(`${id} sent`);
        });
      
        callback(); 
    })

    socket.on('disconnect',()=>{
        console.log('new disconnect');
    })
})

server.listen(PORT,()=>{
    console.log(`Listen on Port: ${PORT} `);
})