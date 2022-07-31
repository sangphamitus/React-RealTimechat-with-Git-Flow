import React,{useState} from "react";
import './Join.css'
import {Link} from 'react-router-dom'
export default function Join()
{
    const [room,setRoom] =useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState("");

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
                    <p> 
                    <label>Room:</label>
                    <input type="text"  placeholder="room" onChange={event=> {
                        setRoom(event.target.value);
                    }}></input>
                    </p>
                    <div className="buttonbox">
                        <Link to={`/chat?name=${name}&room=${room}`}
                        onClick= {event=>(!name||!room||!password)?event.preventDefault():null }>
                        <button  type="submit"  className={(!name||!room||!password)?'disable':null}>Login</button>
                        </Link>
                        
                    </div>
                  
                </fieldset>
            </form>
          </div>       
        </div>
    )
}