import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

export const Chat = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        const socket = new SockJS('/ws');
        const stomp = Stomp.over(socket);
        stomp.connect({}, () => {
            setStompClient(stomp);
            stomp.subscribe('/topic/messages', (message) => {
                setMessages([...messages, JSON.parse(message.body)]);
            });
        });
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [messages]);

    const sendMessage = (content, sender) => {
        stompClient.send('/app/chat', {}, JSON.stringify({ content, sender }));
    };
  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.elements.content.value;
    const sender = event.target.elements.sender.value;
    sendMessage(content, sender);
    event.target.elements.content.value = "";
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" placeholder="Message" />
        <input type="text" name="sender" placeholder="Your Name" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
