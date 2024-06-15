/*

import { useContext } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { SocketContext } from "../Context";

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <Box display="flex" justifyContent="space-around" mb="20">
                    <Heading as="h3">{call.name} is calling</Heading>
                    <Button variant="outline" onClick={() => answerCall(false)} border="1px" borderStyle="solid" borderColor="black">
                        Answer with Video
                    </Button>
                    <Button variant="outline" onClick={() => answerCall(true)} border="1px" borderStyle="solid" borderColor="black">
                        Answer with Screen Sharing
                    </Button>
                </Box>
            )}
        </>
    );
}

export default Notifications;
*/
