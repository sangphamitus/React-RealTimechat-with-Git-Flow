import React,{useState,useEffect} from "react";
import queryString from 'query-string';
import Navbars from "../Navbars/Navbars";


import axios from 'axios'
import io from 'socket.io-client';
import "../Chat/Chat.css"
import Messages from "../Messages/Messages"
import UserBar from "../UserBar/UserBar"
import logo from "../../img/logo-rebuild.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft,faCaretRight } from '@fortawesome/free-solid-svg-icons'



let hrefPid;
let socket;
const ENDPOINT = 'https://pps-reactappchatandpost.herokuapp.com';
const ENDPOINTSOCKET='pps-reactappchatandpost.herokuapp.com';
function ViewPoint({username})
{
    
 
    const [message,setMessage]=useState("");
    const [recvMessage,setRecvMessage]=useState([]);
    const [mid,setMid]=useState("");
    const [chatname,setChatname]=useState("");
    const [sideButton,setSideButton]=useState(false);
  
   
    useEffect(()=> {
        const {pid}=queryString.parse(window.location.search);
        hrefPid=pid;
    },[window.location.search])

    const setAttr=(id,cn)=> {
        setChatname(cn);
        setMid(id);
    }

    const fetchRequest=()=> {
        console.log(`fetching mid: ${mid},chatname: ${chatname}`);
        if(mid!=="" )
        { 
            
            axios.post(ENDPOINT+'/api/message/fetch',{
                mid:mid
            },{
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(res=>{
                if(res.data.message==='success')
                {
                    console.log(res.data.message);
                    setRecvMessage(recvMessage=> res.data.listMessages);
                }
            }).catch(error=>console.log(error))
        }
    }
   useEffect(()=>{
        socket=io(ENDPOINTSOCKET, {transports:['websocket']});

        console.log('client connected');
        
   },[ENDPOINTSOCKET,window.location.search]);

   useEffect(()=> {
        socket.on('fetchMessage',({message})=> {
            console.log({message});
            fetchRequest();
        })
   },[])
   useEffect(()=> {
    fetchRequest();
    setMid(mid);
   },[mid ])

    const enterHandle=async (event)=> {
        event.preventDefault();
        console.log(`${username} sent`);
        
        if(message.length!==0&&message!=="\n")
        {
            if(mid!=="" )
            {
                axios.post(ENDPOINT+'/api/message/send',{
                    pid:hrefPid,
                    mid:mid,
                    username:username,
                    message:message
                },{
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(res=>{
                    if(res.data.message==='success')
                    {
                        setRecvMessage(recvMessage=> res.data.listMessages);
                        socket.emit('sendMessage',(error)=> {
                            if(!error)
                            {
                                console.log(error);
                            }
                        })
                        fetchRequest();
                    }
                    else
                    {
                        console.log(res.data);
                    }
                })
                . catch(error=> console.log(error))
            }
        }

        let textarea = document.querySelector('.input-field')
        textarea.style.height ="32px";
        setMessage("");
    }
    
    const sendMessage =(event)=>{
        event.preventDefault();
       
        if(message.length!==0&&message!=='\n')
        {
            if(mid!=="" )
            {
                axios.post(ENDPOINT+'/api/message/send',{
                    pid:hrefPid,
                    mid:mid,
                    username:username,
                    message:message
                },{
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(res=>{
                    if(res.data.message==='success')
                    {
                        setRecvMessage(recvMessage=> res.data.listMessages);
                        socket.emit('sendMessage',(error)=> {
                            if(!error)
                            {
                                console.log(error);
                            }
                        })
                        fetchRequest()
                    }
                    else
                    {
                        console.log(res.data);
                    }
                })
                . catch(error=> console.log(error))
            }
        }
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
    

    return(
    <>
        {username ? (
        <div className="viewpoint">
   

        <div className="chat-container">
            <div className={sideButton?"side-display on":"side-display off"}>
                <div className={sideButton?"info":"hidden"}>
                    <img id="rebuild-logo" src={logo}></img>  
                    <div className="account-info">
                        <p>Account Username:<span className="bold"> {username}</span></p>
                    </div>
        
                    <UserBar setMid={setAttr} main={username}/>
                </div>
                <div id="button-on-off" className={sideButton?"side-on-button-off":"side-on-button"}>
                    <button onClick={event=>setSideButton(!sideButton)}><p>{sideButton?<FontAwesomeIcon icon={faCaretLeft} size={"2x"} />:<FontAwesomeIcon icon={faCaretRight} size={"2x"} />
                    }</p></button>
                </div>
            </div>
          
            <div className={sideButton?"message-display":"message-display offin"}>
                
            <Navbars pid={hrefPid}/>
                <div className="message-field">
            
                    <div className="room-Username">
                        <p >Room Username:{chatname?chatname:""}</p>
                    </div>
                    <div className="view-messages">
                       
                    <Messages recvMessages={recvMessage} mainUser={username} className="message-display" />
                 
                    </div>
                
                </div>
                <div className="input-field">
                <textarea type="text" 
                        value={message}
                    onChange={event=>{
                       calcHeight(event.target.value);
                        setMessage(event.target.value);}}
                        placeholder="Input text..."
                        onKeyPress={event=>(event.key=== 'Enter'? ( 
                            event.shiftKey ? 
                            event.preventDefault() :  enterHandle(event) ):null)}
                        ></textarea>
                  
                <button type="button" 
                className={message?"submit-button":"submit-button disable"} 
                onClick={event=> {sendMessage(event)}}
               
                >Send</button>
                </div>

            </div>
        </div>
        </div>):(
            <div>
                Loading..
            </div>
        )
        
         }
        </>
    )
}

export default function Chat() 
{
    const [username,setUsername]=useState('');

    useEffect(()=> {
        const {pid} = queryString.parse(window.location.search);
        hrefPid=pid
        axios.post(ENDPOINT+'/api/user/finduser',{
            "pid":hrefPid
        },{
            headers: {
                'Content-Type':'application/json'
            }
        }).then(res=>
            {
               
                    if(res.data.message==='success')
                    {
                       setUsername(res.data.username);
                    }
                    else
                    {
                       throw Error('not have this pid');
                    }
             
               
            })
        .catch(error=>console.log(error.message))
    },[]);
    return  (
    <>
    {username? (<ViewPoint username={username}></ViewPoint>):(<div>Loading...</div>)}
    </>
    )
    
}