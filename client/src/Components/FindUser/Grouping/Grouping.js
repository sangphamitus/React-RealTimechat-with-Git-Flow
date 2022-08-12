import React,{useState,useEffect} from 'react'
import './Grouping.css'
import queryString from 'query-string'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX} from '@fortawesome/free-solid-svg-icons'

const valid = new RegExp('[a-zA-Z 0-9]');
const ENDPOINT="http://localhost:5000"
export default function Grouping({exitCallback,username,callback})
{
    const [choosen,setChoosen]=useState([]);
    const [find,setFind]=useState("");
    const [finded,setFinded]=useState([]);
    const [roomName, setRoomName]= useState("");

    const {pid}=queryString.parse(window.location.search);

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
                setFinded (res.data.user);
                setFinded(current=>
                    current.filter(u => {
                        return u.pid!==pid && u.username!==username;
                    })
                 )
             
            }
            
        }).catch(error=>console.log(error));
    }
    else
    {
     
        setFinded([]);
    }
   
    },[find])

    const removeChoose=(user)=>{    

        setChoosen(current=>
                current.filter(u => {
                    return u.pid!==user.pid && u.username!== user.username;
                })
        )
      
    }

    const removeFinded=(user)=>{    

        setFinded(current=>
                current.filter(u => {
                    return u.pid!==user.pid && u.username!== user.username;
                })
        )
      
    }


    const insertRequest= (event)=> {

        event.preventDefault();

        
        const members=[...choosen,{pid:pid,username:username}]

        const pidmem=members.map(mem=> mem.pid);
       
        const namemem=members.map(mem=> mem.username);
        axios.post(ENDPOINT+ '/api/message/create',{
            members:pidmem
        },{
            headers:{
                'Context-Type':'application/json'
            }
        }).then(res=> {

            if(res.data.message==='success')
            {
                console.log(res.data.message)
                const {mid,chatname}=res.data;

                members.forEach(mem=>{
               
                    axios.post(ENDPOINT+'/api/contact/insert',{
                        pid:mem.pid,
                        mid:mid,
                        chatname:roomName
                    }, {
                        headers :
                        {
                            'Context-Type':'application/json'
                        }
                    }).then(res=>
                        {
                            console.log(res)
                    
                            callback();
                            setFinded([]);
                            setFind("");
                            setRoomName("");
                            setChoosen([]);
                            exitCallback();
                         
                        }
                        )
                    .catch (error=>console.log(error));
                })
              
            }

        })
        .catch (error=>console.log(error));

      
    }


    return (
        <div className="Grouping-container">
            <div className='card-group'>
            
            <div className='search-and-exit'>
                
              <input
                value={roomName}
                className="bdr-1ex bg-violet" 
                placeholder="group name"
                onChange={event=>setRoomName(event.target.value)}
            
               />
               <button className='exit-button'
                    onClick={event=>
                    {exitCallback();
                    setFind([]);
                    setFinded([]);
                    setChoosen([]);
                    setRoomName("");
                        
                    }}><FontAwesomeIcon icon={faX} size={"1x"} /></button>
            </div>
            <input
                value={find}
                className="bdr-1ex bg-violet" 
                placeholder="search"
                onChange={event=> setFind(event.target.value)}
            
               />
            <div className="line"></div>
            <div className='theChosenOne'>
                <h3 className='tags'>Choose</h3>
             
                {choosen ?               
                choosen.map((user,id)=>
                    <button id={'btnc'+id} 
                     className=' body-card color-w cursor-pointer choss'
                    onClick={event=>{
                        event.preventDefault();
                        removeChoose(user);       
                        setFinded([...finded,{pid:user.pid,username:user.username}]) ;  
                     }}
                  >
                    {user.username}
                    </button>)
                    :null
                }
                

                
            <div className="line"></div>    
            <div className='theChooseOne'>
                <h3 className='tags'>Find</h3>
                <div>

                {finded? finded.map((user,id)=>
                    <button  id={"g"+id}
                     className=' body-card color-w cursor-pointer'
                     onClick={event=>{
               
                        event.preventDefault();
                        removeFinded(user);       
                        setChoosen([...choosen,{pid:user.pid,username:user.username}]) ;  
                     
                     }}  > {user.username}
                     
                    </button>
                ):
                null
                }

                </div>
              
            </div>
            </div>
            <div className='createButton'>
                <button className={roomName!==""&&choosen.length!==0 ? 'exit-button':'exit-button hidden'}
                        onClick={event =>insertRequest(event)}>Create</button>
            </div>
           
        </div>
        </div>
    )
}