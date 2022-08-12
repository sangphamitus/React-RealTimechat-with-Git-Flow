import React,{useEffect} from "react";
import './UserFinded.css';
import queryString from 'query-string';
import axios from 'axios'


const ENDPOINT="http://localhost:5000"

export default function UserFinded({users,callback,callbackSearch,main})
{
    useEffect(()=>{
        
        callback();
        callbackSearch();
    },[window.location])
    const insertRequest= (clickpid)=> {

        const {pid} = queryString.parse(window.location.search);

        
        const members=[{pid:pid,username:main},clickpid]
        console.log(clickpid);
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
                const {mid,chatname}=res.data;

                members.forEach(mem=>{
                    let mema=namemem ;
                    mema.splice(mema.indexOf(mem.username),1).toString();
                    let nameb=mema.toString();
                    console.log(nameb);
                    axios.post(ENDPOINT+'/api/contact/insert',{
                        pid:mem.pid,
                        mid:mid,
                        chatname:nameb
                    }, {
                        headers :
                        {
                            'Context-Type':'application/json'
                        }
                    }).then(res=>
                        {
                            console.log(res)
                    
                            callback();
                            callbackSearch();
                           
                        }
                        )
                    .catch (error=>console.log(error));
                })
              
            }

        })
        .catch (error=>console.log(error));

      
    }

    return(
        <div className="ListMember">
        { users.map((user,i)=>
            <button id={i} className=" body-card color-w cursor-pointer bg-vioblack"
            onClick={event=>{insertRequest({pid:user.pid,username:user.username})}}
            valuepid={user.pid}
            valuename={user.username}
             > {user.username}
            </button> )}
        </div>

    )
}