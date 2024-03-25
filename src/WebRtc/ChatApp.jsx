import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from "axios";

export const ChatApp = () => {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const peerConnectionRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8700/generate-offer');
                const offer = response.data.offer;

                const peerConnection = new RTCPeerConnection();
                peerConnectionRef.current = peerConnection;

                peerConnection.ontrack = event => {
                    remoteVideoRef.current.srcObject = event.streams[0];
                };

                await peerConnection.setRemoteDescription(offer);
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);

                await axios.post('http://localhost:8700/send-answer', { answer });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();

        return () => {
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
        };
    }, []);

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted></video>
            <video ref={remoteVideoRef} autoPlay></video>
        </div>
    );
};