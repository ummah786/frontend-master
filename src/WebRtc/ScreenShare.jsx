
import React, { useState, useRef, useEffect } from 'react';
export const ScreenShare = () => {
    const [isSharing, setIsSharing] = useState(false);
    const videoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const signalingRef = useRef(null);

    useEffect(() => {
        signalingRef.current = new WebSocket('ws://localhost:8080/signaling');

        signalingRef.current.onmessage = async (message) => {
            const data = JSON.parse(message.data);

            if (data.offer) {
                await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
                const answer = await peerConnectionRef.current.createAnswer();
                await peerConnectionRef.current.setLocalDescription(answer);
                signalingRef.current.send(JSON.stringify({ answer }));
            }

            if (data.answer) {
                await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
            }

            if (data.iceCandidate) {
                try {
                    await peerConnectionRef.current.addIceCandidate(data.iceCandidate);
                } catch (e) {
                    console.error('Error adding received ice candidate', e);
                }
            }
        };

        return () => {
            signalingRef.current.close();
        };
    }, []);

    const startScreenShare = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            videoRef.current.srcObject = stream;

            const peerConnection = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
            });
            peerConnectionRef.current = peerConnection;

            stream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, stream);
            });

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    signalingRef.current.send(JSON.stringify({ iceCandidate: event.candidate }));
                }
            };

            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            signalingRef.current.send(JSON.stringify({ offer }));

            setIsSharing(true);
        } catch (err) {
            console.error('Error sharing screen:', err);
        }
    };

    return (
        <div>
            <button onClick={startScreenShare} disabled={isSharing}>
                {isSharing ? 'Sharing Screen' : 'Start Screen Share'}
            </button>
            <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }}></video>
        </div>
    );
};