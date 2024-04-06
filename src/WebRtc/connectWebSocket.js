import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const WS_URL = 'http://localhost:8700/ws';

const connectWebSocket = (onMessageReceived) => {
    const socket = new SockJS(WS_URL);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        stompClient.subscribe('/topic/messages', (message) => {
            onMessageReceived(JSON.parse(message.body));
        });
    });

    return stompClient;
};

export default connectWebSocket;


