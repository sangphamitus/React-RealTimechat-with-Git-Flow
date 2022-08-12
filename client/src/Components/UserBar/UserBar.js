import React,{useState,useEffect} from 'react'
import FindUser from '../FindUser/FindUser'
import axios from 'axios'
import queryString from 'query-string'

import './UserBar.css'

const ENDPOINT="http://localhost:5000"


export default function UserBar({setMid,main})
{
    const [listContact,setListContact]= useState([]);
    const [contactClick,setContactClick]=useState("");
    
    const viewRequest= ()=> {

        const {pid} = queryString.parse(window.location.search);
        axios.post(ENDPOINT+'/api/contact/view',{
            pid:pid
        }, {
            headers :
            {
                'Context-Type':'application/json'
            }
        }).then(res=>
            {
               
                if(res.data.message==='success')
                {
                    console.log(res.data.contacts)
                    setListContact(res.data.contacts);
                }
            }
            )
        .catch (error=>console.log(error));
    }

    useEffect(() =>{
        viewRequest();
    },[]);

    return (         
    <div>
         <div className="find-user">
            <FindUser callback={viewRequest} main={main}/>              
        </div> 
        <div className="field">
        {listContact.map((contact,i)=>
            <div id={'list'+i} className="contact-field" >
                  <button id={'button'+i}
                        className={contactClick===contact.chatname? "button-contact contact-on":"button-contact"}
                        value={contact.mid}
                        chatname={contact.chatname}
                        onClick={event=>{event.preventDefault();
                            setMid(contact.mid,contact.chatname);
                            setContactClick(contact.chatname);
                         } }>{contact.chatname}</button>
            </div>
          
        )}
        </div>
    </div>

     
    )
}
