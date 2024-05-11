import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const mobileNumber = localStorage.getItem("username");

  console.log('Mobile Number  ',mobileNumber);
  useEffect(() => {
    const socket = new SockJS("http://localhost:8700/websocket-example");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      setStompClient(client);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        `/topic/greetings/${mobileNumber}`,
        (response) => {
          const receivedMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      );
      return () => {
        subscription.unsubscribe(); // Clean up subscription
      };
    }
  }, [stompClient]);

  const sendMessage = () => {
    if (messageInput.trim() !== "" && stompClient) {
      const message = {
        sender: mobileNumber, // Replace with sender's name
        receiver: "5454545", // Replace with receiver's name
        content: messageInput.trim(),
      };
      stompClient.send("/app/hello", {}, JSON.stringify(message));
      setMessageInput("");
    }
  };

  return (
    <div className="App">
      <h1>Real-time Chat</h1>
      <div className="chat-container">
        <div className="input-container">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <span className="sender">{msg.sender}</span>: {msg.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
