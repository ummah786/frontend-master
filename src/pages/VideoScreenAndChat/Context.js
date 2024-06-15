/*
import React, { createContext, useState, useRef, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io('http://localhost:8700');

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [screenSharing, setScreenSharing] = useState(false);
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [messages, setMessages] = useState([]);
    const myVideo = useRef(null);
    const userVideo = useRef(null);
    const screenTrackRef = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream;
                }
            });

        socket.on('me', (id) => setMe(id));
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
        socket.on('message', ({ name, message }) => {
            setMessages(prevMessages => [...prevMessages, { name, message }]);
        });

        return () => {
            socket.off('me');
            socket.off('callUser');
            socket.off('message');
        };
    }, []);

    useEffect(() => {
        if (call.isReceivingCall && !callAccepted) {
            const peer = new Peer({ initiator: false, trickle: false, stream });

            peer.on('signal', (data) => {
                socket.emit('answerCall', { signal: data, to: call.from });
            });

            peer.on('stream', (currentStream) => {
                if (userVideo.current) {
                    userVideo.current.srcObject = currentStream;
                }
            });

            peer.signal(call.signal);
            connectionRef.current = peer;
        }
    }, [call, callAccepted, stream]);

    const callUser = useCallback((id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;

        return () => {
            socket.off('callAccepted');
        };
    }, [me, name, stream]);

    const leaveCall = useCallback(() => {
        setCallEnded(true);
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        window.location.reload();
    }, []);

    const shareScreen = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ cursor: true });
            const screenTrack = screenStream.getTracks()[0];
            screenTrackRef.current = screenTrack;

            connectionRef.current.replaceTrack(
                stream.getVideoTracks()[0],
                screenTrack,
                stream
            );

            screenTrack.onended = () => {
                connectionRef.current.replaceTrack(
                    screenTrack,
                    stream.getVideoTracks()[0],
                    stream
                );
                setScreenSharing(false);
            };

            if (myVideo.current) {
                myVideo.current.srcObject = screenStream;
            }

            setScreenSharing(true);
        } catch (error) {
            console.error("Error sharing screen: ", error);
        }
    };

    const toggleCamera = useCallback(() => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
        }
    }, [stream]);

    const sendMessage = (message) => {
        socket.emit('sendMessage', { name, message });
    };

    const answerCall = (screenShare = false) => {
        if (screenShare) {
            shareScreen();
        } else {
            setCallAccepted(true);
        }
    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            shareScreen,
            screenSharing,
            toggleCamera,
            sendMessage,
            messages,
            answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
*/
