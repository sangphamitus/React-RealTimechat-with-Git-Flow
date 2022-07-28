import React,{useState} from "react";
import {Link} from "react-router-dom"

import "./Navbar.css";


export default function Navbars()
{
    const [buttonClicked,setButtonClicked]=useState(String(window.location.pathname));


    return(
        <div className="container">
            <ul className="NavMenu">
                <li><Link to={"/"} > <button onClick={event=>{setButtonClicked('/')}} className={buttonClicked==='/'?"clicked":null} type="submit" >Join</button></Link> </li>
                <li><Link to={"/chat"}><button onClick={event=>{setButtonClicked('/chat')}} className={buttonClicked==='/chat'?"clicked":null} type="submit" >Chat</button></Link></li>
            </ul>
            
        </div>
    )
}