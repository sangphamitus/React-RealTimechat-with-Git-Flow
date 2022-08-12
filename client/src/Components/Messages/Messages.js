import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from "./Message/Message";
import './Messages.css'

export default function Messages({recvMessages,mainUser})
{
    console.log(recvMessages);
    return (
        <ScrollToBottom >
            {
                
            recvMessages.map((mess,i) => <div key={i}>  
            <Message messages={mess.message}
             sender={mess.username===mainUser} 
             username={mainUser}/>
                </div>
            )
            }
        </ScrollToBottom>

    )
}

