import React, {useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const WebSocketContext = React.createContext(null);

export const WebSocketProvider = ({children}) => {
    const socket = useRef(null);
    const [isClientReady, setIsClientReady] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    useEffect(() => {
        const socket = new SockJS("http://api.hesabbook.in/websocket-example");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            setStompClient(client);
            setIsClientReady(true);
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
                setIsClientReady(false);
            }
        };
    }, []);

    useEffect(() => {
        if (stompClient) {
            const subscription = stompClient.subscribe(
                '/topic/screen-share',
                (response) => {
                    console.log('Web Socker inside ', response.body);
                    //setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                }
            );
            return () => {
                subscription.unsubscribe(); // Clean up subscription
            };
        }
    }, [stompClient]);
    return (
        isClientReady && (
            <WebSocketContext.Provider value={stompClient.current}>
                {children}
            </WebSocketContext.Provider>
        )
    );

};

export const useWebSocket = () => React.useContext(WebSocketContext);
