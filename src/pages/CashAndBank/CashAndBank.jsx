import {Box, Button} from "@mui/material";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import * as React from "react";


export const CashAndBank = () => {
    const [cashAndBank, setCashAndBank] = React.useState(false);
    const [transferMoney, setTransferMoney] = React.useState(false);
    const [addAccount, setAddAccount] = React.useState(false);
    return (
        <>
            <Box sx={{display: 'flex'}}>
                <Typography>Cash And Bank</Typography>
                <Box sx={{display: 'flex'}}>
                    <Button onClick={() => setCashAndBank(true)}>Add/Reduce Money</Button>
                    <Button onClick={() => setTransferMoney(true)}>Transfer Money</Button>
                    <Button onClick={() => setAddAccount(true)}>Add New Account</Button>
                </Box>
            </Box>
            <Box sx={{display: 'flex'}}>
                <Box sx={{margin: '50px'}}>
                    <Box sx={{display: 'flex'}}>
                        <Typography>Total Balance </Typography>
                        <Typography> :-54</Typography>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <Typography>Cash in Hand </Typography>
                        <Typography> :-5</Typography>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <Typography>Bank Accounts </Typography>
                        <Typography> :-49</Typography>
                        {
                            /* add mulpile account ....*/
                        }
                    </Box>
                </Box>
                <Box sx={{margin: '50px'}}>
                    <Box><Typography>Transactions</Typography></Box>
                    <Box><Typography>Table</Typography></Box>

                </Box>

                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={cashAndBank}
                    onClose={() => setCashAndBank(false)}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            maxWidth: 500,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                        }}
                    >
                        <ModalClose variant="plain" sx={{m: 1}}/>
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                        >
                            Cash And Bank
                        </Typography>
                        <Typography id="modal-desc" textColor="text.tertiary">
                            Make sure to use <code>aria-labelledby</code> on the modal dialog with an
                            optional <code>aria-describedby</code> attribute.
                        </Typography>
                    </Sheet>
                </Modal>

                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={transferMoney}
                    onClose={() => setTransferMoney(false)}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            maxWidth: 500,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                        }}
                    >
                        <ModalClose variant="plain" sx={{m: 1}}/>
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                        >
                            transferMoney
                        </Typography>
                        <Typography id="modal-desc" textColor="text.tertiary">
                            Make sure to use <code>aria-labelledby</code> on the modal dialog with an
                            optional <code>aria-describedby</code> attribute.
                        </Typography>
                    </Sheet>
                </Modal>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={addAccount}
                    onClose={() => setAddAccount(false)}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            maxWidth: 500,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                        }}
                    >
                        <ModalClose variant="plain" sx={{m: 1}}/>
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                        >
                            addAccount
                        </Typography>
                        <Typography id="modal-desc" textColor="text.tertiary">
                            Make sure to use <code>aria-labelledby</code> on the modal dialog with an
                            optional <code>aria-describedby</code> attribute.
                        </Typography>
                    </Sheet>
                </Modal>

            </Box>
        </>
    )
}