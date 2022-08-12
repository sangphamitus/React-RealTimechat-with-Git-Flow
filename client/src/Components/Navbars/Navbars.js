import React,{useState} from "react";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket,faCommentDots,faNewspaper } from '@fortawesome/free-solid-svg-icons'

import "./Navbar.css";

export default function Navbars({pid})
{
    const [buttonClicked,setButtonClicked]=useState(String(window.location.pathname));
 
 

    return(
        <div id="navbar" className="container">
            <div className="NavMenu">
           
            <ul >
               
                <li><Link to={`/chat?pid=${pid}`}><button onClick={event=>{setButtonClicked('/chat')}} className={buttonClicked==='/chat'?"clicked":null} type="submit" ><FontAwesomeIcon icon={faCommentDots} size='0.5x'/></button></Link></li>
                <li><Link to={`/post?pid=${pid}`}><button onClick={event=>{setButtonClicked('/post')}} className={buttonClicked==='/post'?"clicked":null} type="submit" ><FontAwesomeIcon icon={faNewspaper} size='0.5x'/></button></Link></li>
             </ul>
             <button id="button-logout"><Link to={`/`} ><FontAwesomeIcon className="color-white" icon={faRightFromBracket} size='2x'/></Link></button>
            </div>
        </div>
    )
}