/*
import { useContext, useState } from "react";
import { SocketContext } from "../Context";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";

const Chat = () => {
    const { sendMessage, messages, name } = useContext(SocketContext);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage('');
    };

    return (
        <VStack spacing={4} align="stretch" mt={4}>
            <Box border="1px" borderColor="gray.200" p={4} rounded="md" h="400px" overflowY="auto">
                {messages.map((msg, index) => (
                    <Box key={index} bg={msg.name === name ? 'blue.100' : 'gray.100'} p={2} borderRadius="md" mb={2}>
                        <Text><strong>{msg.name}: </strong>{msg.message}</Text>
                    </Box>
                ))}
            </Box>
            <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
            <Button onClick={handleSendMessage}>Send</Button>
        </VStack>
    );
};

export default Chat;
*/
