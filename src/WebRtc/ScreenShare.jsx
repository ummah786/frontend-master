import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { Button, TextField, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const ScreenShare = () => {
    const [me, setMe] = useState('');
    const [stream, setStream] = useState(null);
    const [screenStream, setScreenStream] = useState(null);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [nameToCall, setNameToCall] = useState('');
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const myVideo = useRef(null);
    const userVideo = useRef(null);
    const screenVideo = useRef(null);
    const connectionRef = useRef(null);

    useEffect(() => {
        if (name) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                setStream(stream);
                if (myVideo.current) {
                    myVideo.current.srcObject = stream;
                }
            }).catch(error => {
                console.error('Error accessing media devices.', error);
            });

            const socket = new SockJS('http://localhost:8700/webrtc');
            const client = new Client({
                webSocketFactory: () => socket,
                onConnect: () => {
                    client.subscribe('/user/topic/receiveSignal', (message) => {
                        const data = JSON.parse(message.body);
                        if (data.to === name) {
                            setReceivingCall(true);
                            setCaller(data.from);
                            setCallerSignal(data.signal);
                        }
                    });

                    client.subscribe('/user/topic/receiveMessage', (message) => {
                        const data = JSON.parse(message.body);
                        setMessages((prevMessages) => [...prevMessages, data]);
                    });

                    client.publish({ destination: '/app/register', body: JSON.stringify({ id: me, name: name }) });
                },
                onStompError: (frame) => {
                    console.error('Broker reported error: ' + frame.headers['message']);
                    console.error('Additional details: ' + frame.body);
                },
                onWebSocketError: (event) => {
                    console.error('WebSocket Error: ', event);
                },
            });

            client.activate();
            setStompClient(client);

            return () => {
                client.deactivate();
            };
        }
    }, [name]);
    useEffect(() => {
        if (stompClient && stompClient.connected) {
            const subscription = stompClient.subscribe(
                '/user/topic/receiveMessage',
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

    useEffect(() => {
        if (stompClient && stompClient.connected) {
            const subscription = stompClient.subscribe(
                `/topic/receiveMessage`,
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

    const callUser = (nameToCall) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            const signalMessage = {
                type: 'callUser',
                from: name,
                to: nameToCall,
                signal: JSON.stringify(data),
            };
            if (stompClient && stompClient.connected) {
                stompClient.publish({ destination: '/app/sendSignal', body: JSON.stringify(signalMessage) });
            }
        });

        peer.on('stream', (stream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        });

        setCallAccepted(true);
        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            const signalMessage = {
                type: 'answerCall',
                from: name,
                to: caller,
                signal: JSON.stringify(data),
            };
            if (stompClient && stompClient.connected) {
                stompClient.publish({ destination: '/app/sendSignal', body: JSON.stringify(signalMessage) });
            }
        });

        peer.on('stream', (stream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        });

        peer.signal(JSON.parse(callerSignal));
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };

    const startScreenShare = () => {
        navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((screenStream) => {
            setScreenStream(screenStream);
            if (screenVideo.current) {
                screenVideo.current.srcObject = screenStream;
            }
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: screenStream,
            });

            peer.on('signal', (data) => {
                const signalMessage = {
                    type: 'callUser',
                    from: name,
                    to: nameToCall,
                    signal: JSON.stringify(data),
                };
                if (stompClient && stompClient.connected) {
                    stompClient.publish({ destination: '/app/sendSignal', body: JSON.stringify(signalMessage) });
                }
            });

            peer.on('stream', (stream) => {
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            });

            setCallAccepted(true);
            connectionRef.current = peer;
        }).catch((error) => {
            console.error('Error accessing display media.', error);
        });
    };

    const sendMessage = () => {
        const chatMessage = {
            from: name,
            to: nameToCall,
            content: message,
        };
        if (stompClient && stompClient.connected) {
            stompClient.publish({ destination: '/app/sendMessage', body: JSON.stringify(chatMessage) });
        }
        setMessages((prevMessages) => [...prevMessages, chatMessage]);
        setMessage('');
    };

    return (
        <div>
            {!name ? (
                <div>
                    <TextField
                        id="filled-basic"
                        label="Enter your name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={() => setMe(name)}>
                        Set Name
                    </Button>
                </div>
            ) : (
                <div>
                    <h1>WebRTC Audio/Video Call</h1>
                    <div>
                        <div>
                            {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: '300px' }} />}
                        </div>
                        <div>
                            {callAccepted && !callEnded ? (
                                <video playsInline ref={userVideo} autoPlay style={{ width: '300px' }} />
                            ) : null}
                        </div>
                        <div>
                            {screenStream && <video playsInline ref={screenVideo} autoPlay style={{ width: '300px' }} />}
                        </div>
                    </div>
                    <div>
                        <TextField
                            id="filled-basic"
                            label="Name to call"
                            variant="filled"
                            value={nameToCall}
                            onChange={(e) => setNameToCall(e.target.value)}
                        />
                        <div>
                            {callAccepted && !callEnded ? (
                                <Button variant="contained" color="secondary" onClick={leaveCall}>
                                    End Call
                                </Button>
                            ) : (
                                <>
                                    <Button variant="contained" color="primary" onClick={() => callUser(nameToCall)}>
                                        Call
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={startScreenShare}>
                                        Share Screen
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        {receivingCall && !callAccepted ? (
                            <div>
                                <h1>{caller} is calling...</h1>
                                <Button variant="contained" color="primary" onClick={answerCall}>
                                    Answer
                                </Button>
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            id="filled-basic"
                            label="Message"
                            variant="filled"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={sendMessage}>
                            Send
                        </Button>
                        <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
                            <List>
                                {messages.map((msg, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={`${msg.from}: ${msg.content}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </div>
                </div>
            )}
        </div>
    );
};
