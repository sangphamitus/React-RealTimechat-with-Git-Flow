import React,{useState} from "react";
import './Join.css'
import {Link} from 'react-router-dom'
export default function Join()
{
    const [room,setRoom] =useState('');
    const [username,setUsername]=useState('');

    return(
        <div className="container" id="loginContainer">
          <div className="card">
           
            <form>
                <h2 className="centertext">JOIN LOGIN</h2>
                
                <fieldset>
                    <p>
                    <label>Username:</label>
                    <input type="text" placeholder="username" onChange={event=> {
                        setUsername(event.target.value);
                    }}></input> 
                    </p>
                    <p> 
                    <label>Room:</label>
                    <input type="text"  placeholder="room" onChange={event=> {
                        setRoom(event.target.value);
                    }}></input>
                    </p>
                    <div className="buttonbox">
                        <Link to={`/chat?name=${username}&room=${room}`}
                        onClick= {event=>(!username||!room)?event.preventDefault():null }>
                        <button  type="submit"  className={(!username||!room)?'disable':null}>Login</button>
                        </Link>
                        
                    </div>
                  
                </fieldset>
            </form>
          </div>       
        </div>
    )
}