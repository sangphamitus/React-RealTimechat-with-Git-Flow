import React from "react";
import ReactEmoji from 'react-emoji';
import '../Message/Message.css'


export default function Message({messages,sender,username})
{
    return (
        sender ? (
        <div className="messageContainer justifyEnd">
            <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(messages)}</p>
            </div>
        </div> 
        ) : (
        <div className="messageContainer justifyStart">
     
            <p className="sentText pr-10">{username}</p>
 
            <div className="messageBox backgroundLight">
                <p className="messageText colorBlack">{ReactEmoji.emojify(messages)}</p>
            </div>
        </div> 
        )
        
    )
}

