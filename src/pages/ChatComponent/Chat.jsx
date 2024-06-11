import React, { useEffect, useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { partnerDataModel } from "../../datamodel/ManageUserDataModel";
import { addParty } from "../../redux/Action";

const messagesData = {}; // Store messages per user

export const Chat = () => {
    const { partyUser } = useSelector((state) => state.partyReducerValue);
    const loginData = useSelector((state) => state.loginReducerValue);
    const dispatch = useDispatch();
    const [manageUserObj, setManageUserObj] = useState(partnerDataModel);
    const [search, setSearch] = useState("");
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [localStream, setLocalStream] = useState(null);
    const [isScreenSharingModalOpen, setIsScreenSharingModalOpen] = useState(false);
    const [remoteVideo, setRemoteVideo] = useState(null);
    const [localVideo, setLocalVideo] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const mobileNumber = localStorage.getItem("username");

    useEffect(() => {
        const newContacts = partyUser.map((user) => ({
            name: user.pname,
            mobileNumber: user.mobileNumber,
            gstNumber: user.gstNumber,
            lastMessage: "", // Placeholder for last message
            time: "", // Placeholder for time
        }));
        setContacts(newContacts);
        setFilteredContacts(newContacts);
    }, [partyUser]);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8700/webrtc");
        const client = Stomp.over(socket);
        client.connect({}, () => {
            setStompClient(client);
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [stompClient]);

    useEffect(() => {
        if (stompClient) {
            const subscription = stompClient.subscribe(
                `/topic/greetings/${mobileNumber}`,
                (response) => {
                    const receivedMessage = JSON.parse(response.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                    if (selectedContact === null || receivedMessage.sender !== selectedContact.mobileNumber) {
                        fetchContactInformation(receivedMessage.sender)
                            .then(async (contactInfo) => {
                                const userInformation = contactInfo.response;
                                manageUserObj["pname"] = userInformation.firstName + " " + userInformation.lastName;
                                manageUserObj["mobileNumber"] = userInformation.mobileNumber;
                                manageUserObj["email"] = userInformation.email;
                                manageUserObj["partyType"] = "Supplier";
                                manageUserObj["primary_user_id"] = loginData.primary_user_id;
                                manageUserObj["secondary_user_id"] = loginData.secondary_user_id;
                                const response = await axios.post("http://localhost:8700/hesabbook/partner/save", manageUserObj);
                                console.log("Submit Receive Message :--    ", receivedMessage);
                                addObjectOnTop(response.data.response);
                                setSelectedContact(response.data.response);
                                setMessages((prevMessages) => [
                                    ...prevMessages,
                                    {
                                        id: prevMessages.length + 1, // Ensure unique IDs
                                        sender: receivedMessage.sender,
                                        time: receivedMessage.time,
                                        text: receivedMessage.content,
                                    },
                                ]);
                            })
                            .catch((error) => {
                                console.error("Error fetching contact information:", error);
                            });
                    }
                }
            );
            return () => {
                subscription.unsubscribe(); // Clean up subscription
            };
        }
    }, [stompClient, mobileNumber]);

    const addObjectOnTop = (newObject) => {
        const existingIndex = partyUser.findIndex((item) => item.id === newObject.id);
        if (existingIndex === -1) {
            dispatch(addParty([newObject, ...partyUser]));
        } else {
            const updatedArray = [...partyUser];
            updatedArray[existingIndex] = newObject;
            dispatch(addParty(updatedArray));
        }
    };

    const fetchContactInformation = (mobileNumber) => {
        return fetch(`http://localhost:8700/hesabbook/user/mobile/${mobileNumber}`).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch contact information");
            }
            return response.json();
        });
    };

    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        setFilteredContacts(
            contacts.filter(
                (contact) =>
                    (contact.name && contact.name.toLowerCase().includes(value)) ||
                    (contact.mobileNumber && contact.mobileNumber.toLowerCase().includes(value)) ||
                    (contact.gstNumber && contact.gstNumber.toLowerCase().includes(value))
            )
        );
    };

    const handleContactSelect = (contact) => {
        setSelectedContact(contact);
        setMessages(messagesData[contact.mobileNumber] || []);
    };

    const sendMessage = () => {
        if (messageInput.trim() !== "" && stompClient && selectedContact) {
            const message = {
                sender: mobileNumber,
                receiver: selectedContact.mobileNumber,
                content: messageInput.trim(),
                time: new Date().toISOString(), // Add timestamp here
            };
            setMessages((prevMessages) => [...prevMessages, message]);
            if (!messagesData[selectedContact.mobileNumber]) {
                messagesData[selectedContact.mobileNumber] = [];
            }
            messagesData[selectedContact.mobileNumber].push(message);
            stompClient.send("/app/hello", {}, JSON.stringify(message));
            setMessageInput("");
        }
    };

    const startScreenSharing = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setLocalStream(stream);
            if (localVideo) {
                localVideo.srcObject = stream;
            }
            setIsScreenSharing(true);
            setIsScreenSharingModalOpen(true); // Open the modal for screen sharing

            const pc = new RTCPeerConnection();
            setPeerConnection(pc);

            stream.getTracks().forEach((track) => {
                pc.addTrack(track, stream);
            });

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    const message = {
                        sender: mobileNumber,
                        receiver: selectedContact.mobileNumber,
                        content: event.candidate,
                        time: new Date().toISOString(), // Add timestamp here
                    };
                    stompClient.send("/app/hello", {}, JSON.stringify({ message }));
                    stompClient.send(
                        "/app/candidate",
                        {},
                        JSON.stringify({ candidate: event.candidate, to: selectedContact.mobileNumber })
                    );
                }
            };

            pc.ontrack = (event) => {
                if (remoteVideo) {
                    remoteVideo.srcObject = event.streams[0];
                }
            };

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            stompClient.send(
                "/app/offer",
                {},
                JSON.stringify({ offer, to: selectedContact.mobileNumber })
            );
        } catch (error) {
            console.error("Error sharing screen:", error);
        }
    };

    useEffect(() => {
        if (stompClient && selectedContact) {
            const handleOffer = async (message) => {
                const { offer, from } = JSON.parse(message.body);
                if (from === selectedContact.mobileNumber) {
                    const pc = new RTCPeerConnection();
                    setPeerConnection(pc);

                    pc.onicecandidate = (event) => {
                        if (event.candidate) {
                            stompClient.send(
                                "/app/candidate",
                                {},
                                JSON.stringify({ candidate: event.candidate, to: from })
                            );
                        }
                    };

                    pc.ontrack = (event) => {
                        if (remoteVideo) {
                            remoteVideo.srcObject = event.streams[0];
                        }
                    };

                    await pc.setRemoteDescription(new RTCSessionDescription(offer));

                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);

                    stompClient.send(
                        "/app/answer",
                        {},
                        JSON.stringify({ answer, to: from })
                    );
                }
            };

            const handleAnswer = async (message) => {
                const { answer, from } = JSON.parse(message.body);
                if (from === selectedContact.mobileNumber) {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
                }
            };

            const handleCandidate = async (message) => {
                const { candidate, from } = JSON.parse(message.body);
                if (from === selectedContact.mobileNumber) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                }
            };

            stompClient.subscribe(`/topic/offer/${mobileNumber}`, handleOffer);
            stompClient.subscribe(`/topic/answer/${mobileNumber}`, handleAnswer);
            stompClient.subscribe(`/topic/candidate/${mobileNumber}`, handleCandidate);
        }
    }, [stompClient, selectedContact, remoteVideo, peerConnection]);

    const handleCloseModal = () => {
        setIsScreenSharingModalOpen(false);
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
            setIsScreenSharing(false);
        }
    };

    return (
        <Box sx={{ display: "flex", height: "90vh", backgroundColor: "#f0f0f0" }}>
            <Box
                sx={{
                    width: "25%",
                    borderRight: "1px solid #ddd",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Search Mobile Number"
                    variant="outlined"
                    sx={{ m: 1, width: "90%" }}
                    value={search}
                    onChange={handleSearchChange}
                />
                <List
                    sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {filteredContacts.map((contact, index) => (
                        <ListItem key={index} button onClick={() => handleContactSelect(contact)}>
                            <Avatar>{contact.name[0]}</Avatar>
                            <ListItemText primary={contact.name} secondary={`${contact.lastMessage} · ${contact.time}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ width: "75%", display: "flex", flexDirection: "column", backgroundColor: "#e0e0e0" }}>
                <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
                    <Toolbar>
                        <Typography variant="h6">
                            {selectedContact ? selectedContact.name : "Select a contact"}
                        </Typography>
                        <Button variant="caption" onClick={startScreenSharing}>
                            Video Share
                        </Button>
                        <Typography variant="caption" sx={{ marginLeft: "auto" }}>
                            {selectedContact ? "online" : ""}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                        p: 2,
                        height: "calc(100vh - 112px)", // Adjust height to fit the screen
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {(messages || []).map((message, index) => (
                        <Box
                            key={index}
                            sx={{
                                mb: 2,
                                textAlign: message.sender === mobileNumber ? "left" : "right",
                                width: "80%",
                                mx: "auto",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: message.sender === mobileNumber ? "flex-start" : "flex-end",
                            }}
                        >
                            <Typography variant="caption" display="block">
                                {message.sender} · {message.time}
                            </Typography>
                            <Typography variant="body1" display="block">
                                {message.content}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", borderTop: "1px solid #ddd", p: 1 }}>
                    <TextField
                        fullWidth
                        placeholder="Type a message"
                        variant="outlined"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <IconButton color="primary" onClick={sendMessage}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>

            <Dialog open={isScreenSharingModalOpen} onClose={handleCloseModal} maxWidth="lg" fullWidth>
                <DialogTitle>Screen Sharing</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <video ref={(ref) => setLocalVideo(ref)} autoPlay muted style={{ width: "45%" }}></video>
                        <video ref={(ref) => setRemoteVideo(ref)} autoPlay style={{ width: "45%" }}></video>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Stop Sharing
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
