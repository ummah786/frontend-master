import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { Button, TextField } from '@material-ui/core';

const socket =new WebSocket('ws://localhost:8700/websocket-example');

export const ScreenShare = () => {
    const [me, setMe] = useState('');
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
        });

        socket.on('me', (id) => {
            setMe(id);
        });

        socket.on('callUser', (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });
    }, []);

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            socket.emit('callUser', {
                userToCall: id,
                signalData: data,
                from: me,
                name: name,
            });
        });

        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

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
            socket.emit('answerCall', { signal: data, to: caller });
        });

        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };

    return (
        <div>
            <h1>WebRTC Chat</h1>
            <div>
                <div>
                    {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: '300px' }} />}
                </div>
                <div>
                    {callAccepted && !callEnded ? (
                        <video playsInline ref={userVideo} autoPlay style={{ width: '300px' }} />
                    ) : null}
                </div>
            </div>
            <div>
                <TextField
                    id="filled-basic"
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    id="filled-basic"
                    label="ID to call"
                    variant="filled"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                />
                <div>
                    {callAccepted && !callEnded ? (
                        <Button variant="contained" color="secondary" onClick={leaveCall}>
                            End Call
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={() => callUser(idToCall)}>
                            Call
                        </Button>
                    )}
                    {idToCall}
                </div>
            </div>
            <div>
                {receivingCall && !callAccepted ? (
                    <div>
                        <h1>{name} is calling...</h1>
                        <Button variant="contained" color="primary" onClick={answerCall}>
                            Answer
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};