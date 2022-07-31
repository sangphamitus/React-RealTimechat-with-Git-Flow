import React,{useState} from "react";
import {Link} from "react-router-dom"

import "./Navbar.css";
import logo from '../logo-rebuild.png'

export default function Navbars({pid})
{
    const [buttonClicked,setButtonClicked]=useState(String(window.location.pathname));
 
 

    return(
        <div className="container">
            <div className="NavMenu">
            <Link to={`/`} ><img id="rebuild-logo" src={logo}></img></Link>
           
            <ul >
               
                <li><Link to={`/chat?id=${pid}`}><button onClick={event=>{setButtonClicked('/chat')}} className={buttonClicked==='/chat'?"clicked":null} type="submit" >Chat</button></Link></li>
                <li><Link to={`/post?id=${pid}`}><button onClick={event=>{setButtonClicked('/post')}} className={buttonClicked==='/post'?"clicked":null} type="submit" >Post</button></Link></li>
             </ul>
             
            </div>
        </div>
    )
}