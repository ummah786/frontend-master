// ScreenShare.js
import React, { useRef, useEffect, useState } from 'react';
import SimplePeer from 'simple-peer';

export const ScreenShare = () => {
    const [stream, setStream] = useState(null);
    const [peer, setPeer] = useState(null);
    const localVideo = useRef(null);
    const remoteVideo = useRef(null);
    const ws = useRef(null);
  
    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8700/signaling');
  
      ws.current.onopen = () => {
        console.log('WebSocket connection established');
      };
  
      ws.current.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.type === 'offer') {
          handleOffer(data.offer);
        } else if (data.type === 'answer') {
          peer.signal(data.answer);
        } else if (data.type === 'candidate') {
          peer.signal(data.candidate);
        }
      };
  
      ws.current.onerror = (error) => {
        console.error('WebSocket error', error);
      };
  
      ws.current.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          setStream(stream);
          localVideo.current.srcObject = stream;
  
          const peer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream: stream,
          });
  
          peer.on('signal', data => {
            ws.current.send(JSON.stringify({ type: 'offer', offer: data }));
          });
  
          peer.on('stream', stream => {
            remoteVideo.current.srcObject = stream;
          });
  
          setPeer(peer);
        })
        .catch(error => {
          console.error('Error accessing display media', error);
        });
  
    }, []);
  
    const handleOffer = (offer) => {
      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream: stream,
      });
  
      peer.on('signal', data => {
        ws.current.send(JSON.stringify({ type: 'answer', answer: data }));
      });
  
      peer.on('stream', stream => {
        remoteVideo.current.srcObject = stream;
      });
  
      peer.signal(offer);
      setPeer(peer);
    };
  
    return (
      <div>
        <video ref={localVideo} autoPlay muted style={{ width: '300px' }} />
        <video ref={remoteVideo} autoPlay style={{ width: '300px' }} />
      </div>
    );
};
