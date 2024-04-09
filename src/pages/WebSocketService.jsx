// WebSocketService.js
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const WebSocketService = {
    connect: (callback) => {
        const socket = new SockJS('http://localhost:8700/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            callback(stompClient);
        });
    },
    disconnect: (stompClient) => {
        if (stompClient) {
            stompClient.disconnect();
        }
    }
};

export default WebSocketService;
