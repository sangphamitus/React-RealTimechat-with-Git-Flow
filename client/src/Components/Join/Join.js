import React,{useState,useEffect} from "react";
import './Join.css'
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

let socket;

const ENDPOINT = 'localhost:5000';


export default function Join()
{
   
    const [password,setPassword]=useState('');
    const [name,setName]=useState("");
    const pid=uuidv4();

    const ActiveLogin=()=>{
    socket=io(ENDPOINT,{transports:['websocket']});


    socket.emit('join',{pid,name},(error)=> {
        if (error)
        {
            console.log(error);
        }
        socket.disconnect();
        socket.off();
    })    
        
    };

    return(
        <div className="container" id="loginContainer">
          <div className="card">
           
            <form>
                <h2 className="centertext">JOIN LOGIN</h2>
                
                <fieldset>
                    <p>
                    <label>Username:</label>
                    <input type="text" placeholder="username" onChange={event=> {
                        setName(event.target.value);
                    }}></input> 
                    </p>
                    <p> 
                    <label>Pass:</label>
                    <input type="password"  placeholder="password" onChange={event=> {
                        setPassword(event.target.value);
                    }}></input>
                    </p>
                 
                    <div className="buttonbox">
                        <Link to={`/chat?pid=${pid}`}
                        onClick= {event=>(!name||!password)?event.preventDefault():ActiveLogin() }>
                        <button  type="submit"  className={(!name||!password)?'disable':null}>Login</button>
                        </Link>
                        
                    </div>
                  
                </fieldset>
            </form>
          </div>       
        </div>
    )
}