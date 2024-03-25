import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

export const ChatApp = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const socket = io('http://localhost:8700'); // Replace with your backend URL
        setSocket(socket);

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            socket.emit('message', inputMessage);
            setInputMessage('');
        }
    };
    return (
        <>
            <div>
                <div>
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </>
    )
}