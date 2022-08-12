import React,{useState,useEffect} from "react";
import './Reg.css'
import {Link}  from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'


const ENDPOINT = 'http://localhost:5000';


export default function Reg()
{
   
    const [password,setPassword]=useState('');
    const [name,setName]=useState("");
    const [passwordConfirm,setPasswordConf ]=useState('');;
    const [message,setMessage] =useState('');

    const ActiveReg=async(event)=>{
        event.preventDefault() ;
        if(password===passwordConfirm)
        {
            axios.post(ENDPOINT+"/api/user/register",
           {
                    "username":name,
                    "password":password
        
            } ,{headers:{
                'Content-Type':'application/json'
            }}  ).then(res=>{setMessage(res.data.message);window.location.pathname="/"})
            .catch(error=>setMessage(error))
            
        }
        else
        {
            setMessage('password not match')
        }
    };
    const alert=()=>
    {
        if(message)
        {
            return <p className="text-red">{message}</p>
        }
    }

    return(
        <div className="container" id="loginContainer">
          <div className="card p-0">
           
            <form>
                <h2 className="centertext">Register</h2>
                
                <fieldset className="col">
                <p className="param-login">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                <div className="row">
                    <input type="text" placeholder="username" onChange={event=> {
                        setName(event.target.value);
                        setMessage('');
                    }}></input> 
                  </div>
                  <div className="row">
                    <input type="password"  placeholder="password" onChange={event=> {
                        setPassword(event.target.value);
                        setMessage('');
                    }}></input>
                    </div>
                    <div className="row">
                    <input type="password"  placeholder="password confirm" onChange={event=> {
                        setPasswordConf(event.target.value);
                        setMessage('');
                    }}></input>
              </div>
                    {alert()}
                    
                    <div className="button-box">
                        
                        <button  onClick= {event=>(!name||!password||!passwordConfirm)?event.preventDefault():ActiveReg(event) } type="submit"  className={(!name||!password||!passwordConfirm)?'disable':null}>Sign up</button>   
                        
                    </div>
                    <div className="loginHandle">
                    <p>Already have account?  <Link  className="Link" to={'/'} > Login </Link></p>
                        
                   
                    </div>
                </fieldset>
            </form>
          </div>       
        </div>
    )
}