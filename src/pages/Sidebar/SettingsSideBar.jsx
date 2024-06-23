import React, {useEffect, useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {FaHome, FaUser} from 'react-icons/fa';
import {AiFillHeart} from 'react-icons/ai';
import {AnimatePresence, motion} from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import {AppBar, Avatar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from '@mui/material';
import {Mail as MailIcon, Menu as MenuIcon, Notifications as NotificationsIcon} from '@mui/icons-material';
import styled from 'styled-components';
import Select from '@mui/material/Select';
import './SideBar.css';
import {useSelector} from "react-redux";

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #2d2d2d;
    border-radius: 5px;
`;

const routes = [
    {path: '/', name: 'Back to Dashboard', icon: <IconContainer><FaHome color="white"/></IconContainer>},
    {path: '/settings/Account', name: 'Account', icon: <IconContainer><FaUser color="white"/></IconContainer>},
    {
        path: '/settings/manage/business',
        name: 'Manage Business',
        icon: <IconContainer><FaUser color="white"/></IconContainer>
    },
    {path: '/settings/invoice', name: 'Invoice Settings', icon: <IconContainer><FaUser color="white"/></IconContainer>},
    {
        path: '/settings/thermal/Print',
        name: 'Thermal Print',
        icon: <IconContainer><FaUser color="white"/></IconContainer>
    },
    {
        path: '/settings/manage/users',
        name: 'Manage Users',
        icon: <IconContainer><FaUser color="white"/></IconContainer>
    },
    {path: '/settings/reminders', name: 'Reminders', icon: <IconContainer><FaUser color="white"/></IconContainer>},
    {path: '/settings/pricing', name: 'Pricing', icon: <IconContainer><FaUser color="white"/></IconContainer>},
    {
        path: '/settings/help/support',
        name: 'Help And Support',
        icon: <IconContainer><FaUser color="white"/></IconContainer>
    },
    {path: '/settings/feedback', name: 'Feedback', icon: <IconContainer><AiFillHeart color="white"/></IconContainer>},
    {path: '/settings/test', name: 'Testing', icon: <IconContainer><AiFillHeart color="white"/></IconContainer>},
    {path: '/logout', name: 'Logout', icon: <IconContainer><AiFillHeart color="white"/></IconContainer>},
];

const settings = [
    {name: 'Profile', path: '/profile'},
    {name: 'Account', path: '/Account'},
    {name: 'Dashboard', path: '/'},
    {name: 'Logout', path: '/logout'}
];

const showAnimation = {
    hidden: {width: 0, opacity: 0, transition: {duration: 0.5}},
    show: {opacity: 1, width: "auto", transition: {duration: 0.5}},
};

const SettingsSideBar = ({children}) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const [notificationsCount, setNotificationsCount] = useState(5);
    const [selectedBusiness, setSelectedBusiness] = useState(localStorage.getItem("BusinessName") || '');
    const {businessUser} = useSelector((state) => state.manageBusinessReducerValue);

    const [businessNameFromLS, setBusinessNameFromLS] = useState(localStorage.getItem("BusinessName") || '');
    useEffect(() => {
        setSelectedBusiness(businessNameFromLS);
    }, [businessNameFromLS]);
    const handleBusinessChange = (event) => {
        setSelectedBusiness(event.target.value);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSettingsItemClick = (path) => {
        handleCloseUserMenu();
        navigate(path);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const getRouteName = () => {
        const route = routes.find(r => r.path === location.pathname);
        if (route) {
            return route.name;
        }
        return 'Dashboard'; // Default title
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}} onClick={toggleSidebar}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div" sx={{flexGrow: 1}}>
                        {getRouteName()}
                    </Typography>
                    <Box sx={{flexGrow: 0, display: 'flex', gap: '10px'}}>
                        <Select
                            value={selectedBusiness}
                            onChange={handleBusinessChange}
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                            sx={{color: 'inherit', '& .MuiSvgIcon-root': {color: 'inherit'}}}
                        >
                            {Array.isArray(businessUser) && businessUser.length > 0 ? (
                                businessUser.map((business) => (
                                    <MenuItem key={business.businessId} value={business.businessName}>
                                        {business.businessName}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="">
                                    <em>No businesses available</em>
                                </MenuItem>
                            )}
                        </Select>
                        <Tooltip title="Messages">
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Updates">
                            <IconButton color="inherit">
                                <Badge badgeContent={notificationsCount} color="error">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                            keepMounted
                            transformOrigin={{vertical: 'top', horizontal: 'right'}}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={() => handleSettingsItemClick(setting.path)}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <div className="main-container">
                <motion.div
                    animate={{
                        width: isOpen ? "230px" : "60px",
                        transition: {duration: 0.5, type: "spring", damping: 10}
                    }}
                    className="sidebar"
                    style={{height: '100vh', overflow: 'hidden'}}
                >
                    <section className="routes"
                             style={{height: 'calc(100vh - 64px)', overflowY: 'auto', overflowX: 'hidden'}}>
                        {routes.map((route, index) => (
                            route.subRoutes ? (
                                <SidebarMenu
                                    key={route.path}
                                    setIsOpen={setIsOpen}
                                    route={route}
                                    showAnimation={showAnimation}
                                    isOpen={isOpen}
                                />
                            ) : (
                                <NavLink
                                    to={route.path}
                                    key={index}
                                    className="link"
                                    activeClassName="active"
                                >
                                    <div className="icon">{route.icon}</div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                variants={showAnimation}
                                                initial="hidden"
                                                animate="show"
                                                exit="hidden"
                                                className="link_text"
                                            >
                                                {route.name}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </NavLink>
                            )
                        ))}
                    </section>
                </motion.div>
                <main style={{height: 'calc(100vh - 64px)', overflowY: 'auto', overflowX: 'hidden'}}>
                    {children}
                </main>
            </div>
        </>
    );
};

export default SettingsSideBar;
