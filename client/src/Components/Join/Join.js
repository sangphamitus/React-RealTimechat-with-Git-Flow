import React,{useState,useEffect} from "react";
import './Join.css'
import {Link} from 'react-router-dom'

import axios from 'axios'


const ENDPOINT = 'http://localhost:5000';


export default function Join()
{
   
    const [password,setPassword]=useState('');
    const [name,setName]=useState("");
    const [message,setMessage]=useState("");
    const ActiveLogin=async(event)=>{

        event.preventDefault();
        axios.post(ENDPOINT+"/api/user/login",{
            username:name,
            password:password
        },{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>
            {
           
            if(res.data.message==="success")
            {
                setName("");
                setPassword("");
                window.location="/chat?pid="+res.data.pid;
            
            }
            else
            {
                setMessage(res.data.message);
            }
            }
        )   .catch(error=>console.log(error.message))
    }

    const alert=()=>
    {
        if(message)
        {
            return  <div  className="loginHandle">
                 <p className="text-red">{message}</p>
                 </div>
            
        }
    }

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
                        setMessage('');
                    }}></input> 
                    </p>
                    <p> 
                    <label>Pass:</label>
                    <input type="password"  placeholder="password" onChange={event=> {
                        setPassword(event.target.value);
                        setMessage('');
                    }}></input>
                    </p>
                    {alert()}
                    <div className="buttonbox">

                        <button  type="submit"    onClick= {event=>(!name||!password)?event.preventDefault():ActiveLogin(event) }
                          className={(!name||!password)?'disable':null}>Login</button>
                        
                        
                    </div>
                    <div className="loginHandle">
                    <Link  to={'/signup'} > Don't have account? </Link>
                    </div>
                  
                </fieldset>
            </form>
          </div>       
        </div>
    )
}