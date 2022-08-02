import React from "react";
import queryString from 'query-string';
import Navbars from "../Navbars/Navbars";

let href;

export default function Post()
{
  
    
    const {pid} = queryString.parse(window.location.search);
    href=pid;
  

    return(
        <>
        <Navbars pid={href}/>
        <div>
            <h2>Post {href}</h2>
        </div>
        </>
    )
}