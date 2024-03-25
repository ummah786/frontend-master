import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

export function ScreenShare() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:8080'); // Replace with your backend URL
        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    const startScreenShare = async () => {
        const stream = await navigator.mediaDevices.getDisplayMedia();
        const peerConnection = new RTCPeerConnection();

        // Add screen stream to peer connection
        stream.getTracks().forEach(track => {
            peerConnection.addTrack(track, stream);
        });

        peerConnection.onnegotiationneeded = async () => {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            // Send offer to server
            socket.emit('offer', {offer});
        };
    };
    return (
        <>
            <div>
                <button onClick={startScreenShare}>Start Screen Share</button>
            </div>
        </>
    )
}