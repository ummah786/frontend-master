import React, { useRef, useEffect, useState } from 'react';
import Peer from 'simple-peer';

const signalingServerUrl = 'ws://localhost:8700/signaling';

export const ScreenSharing = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [userId, setUserId] = useState('');
    const [peerId, setPeerId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const peerRef = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        connectionRef.current = new WebSocket(signalingServerUrl);
        connectionRef.current.onmessage = handleSignalingData;
    }, []);

    const handleSignalingData = (message) => {
        const data = JSON.parse(message.data);
        switch (data.type) {
            case 'offer':
                handleOffer(data.offer, data.userId);
                break;
            case 'answer':
                handleAnswer(data.answer);
                break;
            case 'candidate':
                handleCandidate(data.candidate);
                break;
            default:
                break;
        }
    };

    const handleOffer = (offer, userId) => {
        peerRef.current = new Peer({ initiator: false, trickle: false });
        peerRef.current.on('signal', (data) => {
            sendToServer({
                type: 'answer',
                answer: data,
                to: userId,
            });
        });
        peerRef.current.on('data', handleData);
        peerRef.current.signal(offer);
    };

    const handleAnswer = (answer) => {
        peerRef.current.signal(answer);
    };

    const handleCandidate = (candidate) => {
        peerRef.current.signal(candidate);
    };

    const handleData = (data) => {
        setMessages((prevMessages) => [...prevMessages, { sender: peerId, message: data.toString() }]);
    };

    const sendToServer = (message) => {
        connectionRef.current.send(JSON.stringify({ ...message, userId: userId }));
    };

    const connectToPeer = () => {
        peerRef.current = new Peer({ initiator: true, trickle: false });
        peerRef.current.on('signal', (data) => {
            sendToServer({
                type: 'offer',
                offer: data,
                to: peerId,
            });
        });
        peerRef.current.on('data', handleData);
        setIsConnected(true);
    };

    const sendMessage = () => {
        peerRef.current.send(message);
        setMessages((prevMessages) => [...prevMessages, { sender: userId, message }]);
        setMessage('');
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Your ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Peer ID"
                    value={peerId}
                    onChange={(e) => setPeerId(e.target.value)}
                />
                <button onClick={connectToPeer} disabled={isConnected}>
                    Connect
                </button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage} disabled={!isConnected}>
                    Send
                </button>
            </div>
            <div>
                <h3>Messages:</h3>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            {msg.sender}: {msg.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
