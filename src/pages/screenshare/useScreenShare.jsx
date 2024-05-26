import { useState, useEffect, useRef } from 'react';
import { useWebSocket } from './WebSocketProvider';

export const useScreenShare = () => {
    const [isSharing, setIsSharing] = useState(false);
    const videoRef = useRef(null);
    const webSocket = useWebSocket();

    const startScreenShare = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsSharing(true);

            // Send stream to the signaling server
            webSocket.send('/app/screen-share', {}, JSON.stringify({ type: 'offer', data: stream }));
        } catch (error) {
            console.error('Error sharing screen: ', error);
        }
    };

    const stopScreenShare = () => {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        setIsSharing(false);
    };

    useEffect(() => {
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return { isSharing, startScreenShare, stopScreenShare, videoRef };
};
