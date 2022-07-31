import React,{useState,useEffect} from "react";
import queryString from 'query-string';
import Navbars from "../Navbars/Navbars";

export default function Chat()
{
    const [Room,setRoom]=useState("");
    const [Name,setName]=useState("");

    useEffect(()=>{
    const {name,room} = queryString.parse(window.location.search);
    setName(name);
    setRoom(room);
    },[]);


    return(
        <>
        <Navbars name={Name} room={Room}/>
        <div>
            <h2>account name:{Name}</h2>
        </div>
        </>
        
    )
}