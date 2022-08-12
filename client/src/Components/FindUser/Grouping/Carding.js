import React from 'react'
import './Grouping.css'

export default function Carding({display,callback})
{
    return (
        <div>
        {
        display.map((user,id)=>
                    <button id={'btnc'+id} 
                    className='body-card color-w cursor-pointer'
                    onClick={event=>{callback(user) }}
                    valuepid={user.pid}
                    valuename={user.username}>
                    {user.username}
                    </button>
                )}
        </div>
    )
}