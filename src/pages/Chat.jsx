import React, {useEffect, useState} from 'react';
import connectWebSocket from "../WebRtc/connectWebSocket";

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const stomp = connectWebSocket((message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });
        setStompClient(stomp);

        return () => {
            if (stomp) {
                stomp.disconnect();
            }
        };
    }, []);

    const handleMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const sendMessage = () => {
        if (stompClient && newMessage.trim() !== '') {
            stompClient.send('/app/chat', {}, newMessage);
            setNewMessage('');
        }
    };

    return (
        <div>
            <h1>Chat App</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <input type="text" value={newMessage} onChange={handleMessageChange}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}