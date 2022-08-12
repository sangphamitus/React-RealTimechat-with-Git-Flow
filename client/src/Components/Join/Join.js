import React,{useState} from "react";
import './Join.css'
import {Link} from 'react-router-dom'

import axios from 'axios'


const ENDPOINT = 'https://pps-reactappchatandpost.herokuapp.com';
const ENDPOINTSOCKET='pps-reactappchatandpost.herokuapp.com';


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
                <div className="title-card">
                <h3 className="m-0">Good to see you again:</h3>
                <h1 className="title-header">WELCOME BACK</h1>
                <div className="line"></div>
                <p className="param">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </p>
            </div>
        <div className="disp-block">
        <div className="Login-field">
          <div className="card">
           
            <form>
                <h2 className="centertext">Login Account</h2>
                <p className="param-login">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                <fieldset className="col">
               
                    <div className="row">
                    
                    <input type="text" placeholder="Username" onChange={event=> {
                        setName(event.target.value);
                        setMessage('');
                    }}></input> 
                 </div> 
                 <div className="row">
                    <input type="password"  placeholder="Password" onChange={event=> {
                        setPassword(event.target.value);
                        setMessage('');
                    }}></input>
                  </div>
                    {alert()}
                    <div className="button-box">
                        <button  type="submit"  onClick= {event=>(!name||!password)?event.preventDefault():ActiveLogin(event) }
                          className={(!name||!password)?'disable':null}>Login</button>               
                    </div>
                    <div className="loginHandle">
                    <p>New User? <Link className="Link" to={'/signup'} > Sign Up </Link></p>
                        
                    </div>
                  
                </fieldset>
            </form>
          </div>       
          </div>
          </div>
        </div>
  
    )
}