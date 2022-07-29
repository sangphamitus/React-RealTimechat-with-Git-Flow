import React,{useState} from "react";
import {Link} from "react-router-dom"

import "./Navbar.css";


export default function Navbars()
{
    const [buttonClicked,setButtonClicked]=useState(String(window.location.pathname));


    return(
        <div className="container">
            <ul className="NavMenu">

                <li><Link to={"/chat"}><button onClick={event=>{setButtonClicked('/chat')}} className={buttonClicked==='/chat'?"clicked":null} type="submit" >Chat</button></Link></li>
                <li><Link to={"/post"}><button onClick={event=>{setButtonClicked('/post')}} className={buttonClicked==='/post'?"clicked":null} type="submit" >Post</button></Link></li>
            </ul>
            
        </div>
    )
}