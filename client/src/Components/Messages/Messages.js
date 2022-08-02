import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from "./Message/Message";
import './Messages.css'

export default function Messages({recvMessages})
{
    console.log(recvMessages);
    return (
        <ScrollToBottom >
            {
                
            recvMessages.map((mess,i) => <div key={i}>  <Message messages={mess.text} sender={mess.sender} username={mess.username}/>
                </div>
            )
            }
        </ScrollToBottom>

    )
}

