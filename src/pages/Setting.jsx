import React, {useState} from 'react';
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
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const contacts = [
    {name: "Rani Jio", lastMessage: "👍", time: "18:47"},
    {name: "Joshi", lastMessage: "Deepu Bhai", time: "18:23"},
    {name: "Amit New", lastMessage: "???", time: "16:23"},
    {name: "Mansoor Alam", lastMessage: "Shamm mai connect karte hai", time: "12:32"},
    {name: "Shadab", lastMessage: "isme join kijiye", time: "11:50"},
    {name: "Tarannum Baji", lastMessage: "Video call - Accepted on another device", time: "09:30"},
    {name: "Sonu Wife", lastMessage: "Assalamualaikum....good morning ❤️", time: "09:09"},
    {name: "Molana Gholam Jami Qadri", lastMessage: "Arfeen Siddiqui removed +971 52 919...", time: "09:38"},
    {name: "Harriii", lastMessage: "Jimmedar nagrik", time: "Yesterday"}
];

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
        {id: 9, sender: "Amit New", time: "21:15", text: "Yaar thoda Party main hu\nKal morning pakka connect karte"},
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
    // Add more messages for other contacts similarly
};

const Setting = () => {
    const [search, setSearch] = useState("");
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [selectedContact, setSelectedContact] = useState(contacts[0].name);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        if (value === "") {
            setFilteredContacts(contacts);
        } else {
            setFilteredContacts(
                contacts.filter(contact =>
                    contact.name.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    const handleContactSelect = (contactName) => {
        setSelectedContact(contactName);
    };

    return (
        <Box sx={{display: 'flex', height: '90vh', backgroundColor: '#f0f0f0'}}>
            <Box sx={{width: '25%', borderRight: '1px solid #ddd', backgroundColor: '#ffffff'}}>
                <TextField
                    fullWidth
                    placeholder="Search or start a new chat"
                    variant="outlined"
                    sx={{m: 1, width: '85%'}}
                    value={search}
                    onChange={handleSearchChange}
                />
                <List sx={{
                    height: '80vh',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {display: 'none'}
                }}>
                    {filteredContacts.map((contact, index) => (
                        <ListItem key={index} button onClick={() => handleContactSelect(contact.name)}>
                            <Avatar>{contact.name[0]}</Avatar>
                            <ListItemText primary={contact.name}
                                          secondary={`${contact.lastMessage} · ${contact.time}`}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{width: '75%', display: 'flex', flexDirection: 'column', backgroundColor: '#e0e0e0'}}>
                <AppBar position="static" sx={{backgroundColor: '#1976d2'}}>
                    <Toolbar>
                        <Typography variant="h6">
                            {selectedContact}
                        </Typography>
                        <Typography variant="caption" sx={{marginLeft: 'auto'}}>
                            online
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    p: 2,
                    height: 'calc(100vh - 56px)',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {display: 'none'}
                }}>
                    {(messagesData[selectedContact] || []).map((message, index) => (
                        <Box key={index} sx={{mb: 2, textAlign: message.sender === 'You' ? 'right' : 'left'}}>
                            <Typography variant="caption" display="block">{message.sender} · {message.time}</Typography>
                            <Typography variant="body1" display="block">{message.text.split('\n').map((line, i) => <div
                                key={i}>{line}</div>)}</Typography>
                        </Box>
                    ))}
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', borderTop: '1px solid #ddd', p: 1}}>
                    <TextField fullWidth placeholder="Type a message" variant="outlined"/>
                    <IconButton color="primary">
                        <SendIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default Setting;
