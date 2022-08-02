import React,{useState,useEffect} from "react";
import queryString from 'query-string';
import Navbars from "../Navbars/Navbars";

import io from 'socket.io-client';
import "../Chat/Chat.css"
import Messages from "../Messages/Messages"

let socket;
let hrefPid;

const ENDPOINT = 'localhost:5000';
export default function Chat()
{
    const [Room,setRoom]=useState("");
    const [Name,setName]=useState("");
    const [message,setMessage]=useState("");
    const [recvMessage,setRecvMessage]=useState([]);

   
  
    useEffect(()=>{
    const {pid} = queryString.parse(window.location.search);
    hrefPid=pid
    if(pid==='undefined'||pid===''||pid===undefined) {
        window.location.replace(window.location.origin+'/');
        
    }
    socket=io(ENDPOINT,{transports:['websocket']});

    socket.emit('updateSid',{pid},(error)=> {
        if (error)
        {
        console.log (`error: ${error}`);
        }
    })

    socket.emit('getInfo',{pid},
        (error)=>{
            if (error)
            {
            console.log (`error: ${error}`);
            }
        })
    socket.on('resInfo',({pid,name},callback)=> {
            setName(name);
           
            callback();
        })
    return ()=> {
        socket.disconnect();
        socket.off();
    }
   
    },[ENDPOINT,window.location.search]);

    const sendMessage =(event)=>{
        event.preventDefault();
       
        socket.emit('sendMessage',{pid:hrefPid,message},()=> {
      
            setRecvMessage(recvMessage=>[...recvMessage,{username:Name,text:message,sender:true} ]);
              
      
        })
        let textarea = document.querySelector('.input-field')
        textarea.style.height ="32px";
        setMessage("");
    }

    const calcHeight=(value)=> {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        numberOfLineBreaks =numberOfLineBreaks+Math.floor(message.length/64);
        // min-height + lines x line-height + padding + border
        let newHeight = 20 + numberOfLineBreaks * 15 + 12 + 2;
        if(newHeight<window.innerHeight*25/100)
        {
            let textarea = document.querySelector('.input-field')
            textarea.style.height = newHeight +"px";
                
            let messagearea = document.querySelector('.message-field');
            messagearea.style.height=  (window.innerHeight*90/100-32-newHeight) +'px';
          
            
        }
       
    }
    
    useEffect(()=> {
        socket.on("message",({username,text})=> {
            console.log(`${username}:${text}`);
            setRecvMessage(recvMessage=>[...recvMessage,{username,text,sender:false} ]);
              
         
        })
    
    },[]);


    return(
        <div className="viewpoint">
        <Navbars pid={hrefPid}/>

        <div className="chat-container">
       
            <div className="side-display">

            </div>
            <div className="message-display">

             
                <div className="message-field">
                    <div className="room-name">
                        <p >account name:{Name}</p>
                    </div>
                    <div className="view-messages">
                       
                    <Messages recvMessages={recvMessage} className="message-display" />
                 
                    </div>
                
                </div>
                <div className="input-field">
                <textarea type="text" 
                        value={message}
                    onChange={event=>{
                       calcHeight(event.target.value);
                        setMessage(event.target.value);}}
                        placeholder="Input text..."
                        onKeyPress={event=>(event.key=== 'Enter'&&event.target.value!=='\n'&&event.target.value!=='')? sendMessage(event):(event)=>{setMessage('');event.target.value="";}}
                        ></textarea>
                  
                <button type="button" 
                className={message?"submit-button":"submit-button disable"} 
                onClick={event=> {sendMessage(event)}}
               
                >Send</button>
                </div>

            </div>
        </div>
        </div>
        
    )
}