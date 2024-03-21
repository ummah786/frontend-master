import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {TextField} from "@mui/material";
import {Transition} from "react-transition-group";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function Header() {
    const pages = ['Home', 'About Us', 'Product', "Price", "Contact", "Login"];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const [phone, setPhone] = React.useState('');
    const [openPassword, setOpenPassword] = React.useState(false);
    const [otpPassword, setOtpPassword] = React.useState('');

    function handleSubmit() {
    }

    const handleClose = () => {
        setOpen(false)
    };
    const handleClick = (e) => {

        e.preventDefault();
    };
    const toggleDrawer = () => {
        setOpen(!openDrawer);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <>
            <AppBar position='fixed' sx={{backgroundColor: "#212121"}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={toggleDrawer}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Transition in={open} timeout={400}>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                            >
                                <Box sx={style}>
                                    <Box
                                        sx={{
                                            marginTop: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ModalClose variant="plain" sx={{m: 1}}/>
                                        <Typography component="h1" variant="h5">
                                            Login/Registration
                                        </Typography>
                                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="phone"
                                                label="+91 Enter Your Mobile Number"
                                                name="phone"
                                                autoComplete="phone"
                                                value={phone}
                                                autoFocus
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="otp"
                                                label="Temporary Password"
                                                name="tempPassword"
                                                autoComplete="tempPassword"
                                                value={otpPassword}
                                                autoFocus
                                                disabled={true}
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                onClick={handleClick}
                                                sx={{mt: 3, mb: 2, color: "whitesmoke", background: '#212121'}}
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Modal>
                        </Transition>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                        >
                            <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        </Typography>
                        <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}