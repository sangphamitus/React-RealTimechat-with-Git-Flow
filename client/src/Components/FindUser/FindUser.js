import React,{useState,useEffect} from "react";
import './FindUser.css'
import axios from 'axios'
import UserFinded from "./UserFinded/UserFinded";
import Grouping from "./Grouping/Grouping"

const valid = new RegExp('[a-zA-Z 0-9]');
const ENDPOINT="http://localhost:5000"
export default function FindUser({callback,main})
{
    const [find,setFind]=useState('');
    const [findUser,setFindUser]  =useState([]);    
    const [onOverlay,setOnOverlay] =useState(false);

    
    useEffect(()=> {

        const validRep= valid.test(find);
        if(find!=="" && find.length!==0 && validRep)
        {

            
        axios.post(ENDPOINT+'/api/user/queryuser',{
            username:find
        },{

            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
          
            if(res.data.message==='success')
            {
                console.log(res.data.user);
                setFindUser(res.data.user);
             
            }
            
        }).catch(error=>console.log(error));
    }
    else
    {
     
        setFindUser([]);
    }
   
    },[find])

    

    return (
        <div >
    <div className="find-bar-holder">
        <input
        value={find}
        className="bdr-1ex bg-violet" 
        placeholder="search"
        onChange={event=> setFind(event.target.value)}
        />
        <button onClick={event=> {event.preventDefault(); setOnOverlay(!onOverlay)}}>+group</button>
        <div className={onOverlay?'display-block':'hidden'}>
            <Grouping exitCallback={()=> {setOnOverlay(!onOverlay)}} username={main} callback={callback} ></Grouping>
        </div>
    </div>
    <div className={(find===''||findUser.length===0) ?'user-display hidden':"user-display"}>
        <div className="user-display-bg">
        <UserFinded users={findUser} callback={callback} main={main} callbackSearch={()=>{setFind('')}}></UserFinded>
        </div>
    </div>
    
    </div>
    )
}