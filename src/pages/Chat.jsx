import React, {useEffect, useState} from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {partnerDataModel} from "../datamodel/ManageUserDataModel";
import {addParty} from "../redux/Action";

const messagesData = {
  "Rani Jio": [],
  "Joshi": [],
  "Amit New": [
    {id: 1, sender: "You", time: "12:42", text: "Sardar.asifjahan@crst.com"},
    {id: 2, sender: "You", time: "12:43", text: "SJ00755057@techmahindra.com"},
    {id: 3, sender: "You", time: "11:33", text: "Hi"},
    {id: 4, sender: "You", time: "11:39", text: "Bro"},
    {id: 5, sender: "You", time: "20:37", text: "Kitna baje connect karna hai"},
    {id: 6, sender: "You", time: "20:37", text: "connect kiya jaye"},
    {id: 7, sender: "You", time: "20:37", text: "kya"},
    {id: 8, sender: "You", time: "20:37", text: "bro"},
    {id: 9, sender: "Amit New", time: "21:15", text: "Yaar thoda party main hu\nKal morning pakka connect karte"},
    {id: 10, sender: "You", time: "11:28", text: "Hi"},
    {id: 11, sender: "You", time: "16:23", text: "Aji free nahi hai kya"},
    {id: 12, sender: "You", time: "16:23", text: "???"}
  ],
  "Mansoor Alam": [],
  "Shadab": [],
  "Tarannum Baji": [],
  "Sonu Wife": [],
  "Molana Gholam Jami Qadri": [],
  "Harriii": []
};

export const Chat = () => {
  const {partyUser} = useSelector(state => state.partyReducerValue);
  const loginData = useSelector(state => state.loginReducerValue);
  const dispatch = useDispatch();
  const [manageUserObj, setManageUserObj] = useState(partnerDataModel);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const mobileNumber = localStorage.getItem("username");

  useEffect(() => {
    const newContacts = partyUser.map(user => ({
      name: user.pname,
      mobileNumber: user.mobileNumber,
      gstNumber: user.gstNumber,
      lastMessage: "", // Placeholder for last message
      time: "" // Placeholder for time
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
            if ((selectedContact === null) || (receivedMessage.sender !== selectedContact.mobileNumber)) {
              // Fetch information from API
              fetchContactInformation(receivedMessage.sender)
                  .then(async (contactInfo) => {
                    // Set the fetched contact as selectedContact
                    const userInformation = contactInfo.response;
                    manageUserObj['pname'] = userInformation.firstName + " " + userInformation.lastName;
                    manageUserObj['mobileNumber'] = userInformation.mobileNumber;
                    manageUserObj['email'] = userInformation.email;
                    manageUserObj['partyType'] = 'Supplier';
                    manageUserObj['primary_user_id'] = loginData.primary_user_id;
                    manageUserObj['secondary_user_id'] = loginData.secondary_user_id;
                    const response = await axios.post('http://localhost:8700/hesabbook/partner/save', manageUserObj);
                    console.log('Submit Recieve Message :--    ', receivedMessage);
                    addObjectOnTop(response.data.response);
                    setSelectedContact(response.data.response);
                    setMessages(prevMessages => [
                      ...prevMessages,
                      {
                        id: prevMessages.length + 1, // Ensure unique IDs
                        sender: receivedMessage.sender,
                        time: receivedMessage.time,
                        text: receivedMessagecontent
                      }
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
    const existingIndex = partyUser.findIndex(item => item.id === newObject.id);
    if (existingIndex === -1) {
      dispatch(addParty([newObject, ...partyUser]));
    } else {
      const updatedArray = [...partyUser];
      updatedArray[existingIndex] = newObject;
      dispatch(addParty(updatedArray));
    }
  };

  const fetchContactInformation = (mobileNumber) => {
    // Replace this with your actual API call to fetch contact information
    return fetch(`http://localhost:8700/hesabbook/user/mobile/${mobileNumber}`)
        .then((response) => {
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
        contacts.filter(contact =>
            (contact.name && contact.name.toLowerCase().includes(value)) ||
            (contact.mobileNumber && contact.mobileNumber.toLowerCase().includes(value)) ||
            (contact.gstNumber && contact.gstNumber.toLowerCase().includes(value))
        )
    );
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setMessages(messagesData[contact.name] || []);
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
      stompClient.send("/app/hello", {}, JSON.stringify(message));
      setMessageInput("");
    }
  };

  return (
      <Box sx={{display: 'flex', height: '90vh', backgroundColor: '#f0f0f0'}}>
        <Box sx={{
          width: '25%',
          borderRight: '1px solid #ddd',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <TextField
              fullWidth
              placeholder="Search Mobile Number"
              variant="outlined"
              sx={{m: 1, width: '90%'}}
              value={search}
              onChange={handleSearchChange}
          />
          <List sx={{
            flexGrow: 1,
            overflowY: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {display: 'none'}
          }}>
            {filteredContacts.map((contact, index) => (
                <ListItem key={index} button onClick={() => handleContactSelect(contact)}>
                  <Avatar>{contact.name[0]}</Avatar>
                  <ListItemText
                      primary={contact.name}
                      secondary={`${contact.lastMessage} · ${contact.time}`}
                  />
                </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{width: '75%', display: 'flex', flexDirection: 'column', backgroundColor: '#e0e0e0'}}>
          <AppBar position="static" sx={{backgroundColor: '#1976d2'}}>
            <Toolbar>
              <Typography variant="h6">
                {selectedContact ? selectedContact.name : "Select a contact"}
              </Typography>
              <Typography variant="caption" sx={{marginLeft: 'auto'}}>
                {selectedContact ? "online" : ""}
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 2,
            height: 'calc(100vh - 112px)', // Adjust height to fit the screen
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {display: 'none'}
          }}>
            {(messages || []).map((message, index) => (
                <Box key={index} sx={{
                  mb: 2,
                  textAlign: message.sender === mobileNumber ? 'left' : 'right',
                  width: '80%',
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.sender === mobileNumber ? 'flex-start' : 'flex-end',
                }}>
                  <Typography variant="caption" display="block">{message.sender} · {message.time}</Typography>
                  <Typography variant="body1" display="block">{message.content}</Typography>
                </Box>
            ))}
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', borderTop: '1px solid #ddd', p: 1}}>
            <TextField
                fullWidth
                placeholder="Type a message"
                variant="outlined"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
            />
            <IconButton color="primary" onClick={sendMessage}>
              <SendIcon/>
            </IconButton>
          </Box>
        </Box>
      </Box>
  );
};
