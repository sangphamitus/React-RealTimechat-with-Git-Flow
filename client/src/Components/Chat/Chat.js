import React,{useState,useEffect} from "react";
import queryString from 'query-string';
import Navbars from "../Navbars/Navbars";
import io from 'socket.io-client';

let socket;
let bigid;
const ENDPOINT = 'localhost:5000';
export default function Chat()
{
    const [Room,setRoom]=useState("");
    const [Name,setName]=useState("");

    useEffect(()=>{
    const {id} = queryString.parse(window.location.search);
    bigid=id;
    if(id==='undefined'||id===''||id===undefined) {
        window.location.replace(window.location.origin+'/');
        
    }
    socket=io(ENDPOINT,{transports:['websocket']});

    socket.emit('getInfo',{id},
        (error)=>{
            if(error)
            { 
                console.log(error);
            }
        })
    socket.on('resInfo',({id,name},callback)=> {
            setName(name);
            console.log(name);
            callback();
        })
    return ()=> {
        socket.disconnect();
        socket.off();
    }

    },[ENDPOINT,window.location.search]);


    return(
        <>
        <Navbars pid={bigid}/>
        <div>
            <h2>account name:{Name}</h2>
        </div>
        </>
        
    )
}