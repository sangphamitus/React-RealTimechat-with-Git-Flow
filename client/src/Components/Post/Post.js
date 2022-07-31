import React,{useEffect} from "react";
import Navbars from "../Navbars/Navbars";
import queryString from 'query-string';

let bigid;

export default function Post()
{
    const {id} = queryString.parse(window.location.search);
    bigid=id;

    return(
        <>
        <Navbars pid={bigid}/>
        <div>
            <h2>Post {bigid}</h2>
        </div>
        </>
    )
}