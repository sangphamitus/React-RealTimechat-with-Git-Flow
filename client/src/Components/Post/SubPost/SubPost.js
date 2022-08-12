import React from 'react'
import './SubPost.css'
export default function SubPost({listComment})
{
    return(
        <div className='list-cmting'>
        {
            listComment.map(cmt=>
                <div className='cmt-line'>
                   <div className='cmt-user'>{cmt.username}</div> 
                   <div className='cmt-content'>{cmt.comment}</div>
                </div>
                )
        }
        </div>
    )
}