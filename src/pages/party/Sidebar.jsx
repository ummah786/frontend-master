import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ parties, onPartySelect, selectedParty }) => {
    return (
        <List>
            {parties.map((party) => (
                <ListItem
                    button
                    key={party.name}
                    selected={selectedParty === party.name}
                    onClick={() => onPartySelect(party.name)}
                >
                    <ListItemText primary={party.name} secondary={`₹${party.amount}`} />
                </ListItem>
            ))}
        </List>
    );
};

export default Sidebar;
