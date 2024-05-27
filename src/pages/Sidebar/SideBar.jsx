import { NavLink } from "react-router-dom";
import {  FaHome, FaLock,  FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import React,{ useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import styled from 'styled-components';

// Styled component for icon container
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px; /* Adjust the width and height as needed */
  height: 30px;
  background-color: #2d2d2d; /* Adjust the background color as needed */
  border-radius: 5px; /* Adjust the border radius for rounded corners */
`;
const routes = [
  {
    path: "/app/dashboard",
    name: "Dashboard",
    icon: <IconContainer><FaHome color="white" /></IconContainer>,
  },
  {
    path: "/party",
    name: "Parties",
    icon: <IconContainer><FaUser color="white" /></IconContainer>,
  },
  {
    path: "/posbilling",
    name: "POS-Billing",
    icon: <IconContainer><MdMessage color="white" /></IconContainer>,
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: <IconContainer><BiAnalyse color="white" /></IconContainer>,
  },
  {
    path: "/stock",
    name: "Stock",
    icon: <IconContainer><AiTwotoneFileExclamation color="white" /></IconContainer>,
    subRoutes: [
      {
        path: "/stock/shop",
        name: "Shop",
        icon: <IconContainer><FaUser color="white" /></IconContainer>,
      },
      {
        path: "/stock/godowon",
        name: "Godowon",
        icon: <IconContainer><FaLock color="white" /></IconContainer>,
      }
    ],
  },
  {
    path: "/Sales",
    name: "Sales",
    icon: <IconContainer><AiTwotoneFileExclamation color="white" /></IconContainer>,
    subRoutes: [
      {
        path: "/Sales/invoice",
        name: "Sales Invoice",
        icon: <IconContainer><FaUser color="white" /></IconContainer>,
      },
      {
        path: "/Sales/return",
        name: "Sales Return",
        icon: <IconContainer><FaLock color="white" /></IconContainer>,
      },
      {
        path: "/Sales/payment-in",
        name: "Payment In",
        icon: <IconContainer><FaUser color="white" /></IconContainer>,
      },
      {
        path: "/Sales/credit-note",
        name: "Credit Note",
        icon: <IconContainer><FaLock color="white" /></IconContainer>,
      }
    ],
  },
  {
    path: "/Purchases",
    name: "Purchase",
    icon: <IconContainer><AiTwotoneFileExclamation color="white" /></IconContainer>,
    subRoutes: [
      {
        path: "/Purchases/invoice",
        name: "Purchase Invoice",
        icon: <IconContainer><FaUser color="white" /></IconContainer>,
      },
      {
        path: "/Purchases/order",
        name: "Purchase Order",
        icon: <IconContainer><FaUser color="white" /></IconContainer>,
      },
      {
        path: "/Purchases/return",
        name: "Purchase Return",
        icon: <IconContainer><FaLock color="white" /></IconContainer>,
      },
      {
        path: "/Purchases/payment-out",
        name: "Payment Out",
        icon: <IconContainer><FaLock color="white" /></IconContainer>,
      },
      {
        path: "/Purchases/debit-note",
        name: "Debit Note",
        icon: <IconContainer><FaLock color="white" /></IconContainer>,
      }
    ],
  },
  {
    path: "/account",
    name: "Account",
    icon: <IconContainer><AiTwotoneFileExclamation color="white" /></IconContainer>,
    subRoutes: [
      {
        path: "/account/manageAccount",
        name: "Manage Account",
        icon: <IconContainer><FaUser color="white" /></IconContainer>,
      },
      {
        path: "/account/myuser",
        name: "My User",
        icon: <IconContainer><FaLock color="white" /></IconContainer>,
      },
      {
        path: "/account/business",
        name: "Business",
        icon: <IconContainer><FaUser color="white" /></IconContainer>,
      }
    ],
  },
  {
    path: "/bank",
    name: "Cash & Bank",
    icon: <IconContainer><BsCartCheck color="white" /></IconContainer>,
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: <IconContainer><AiFillHeart color="white" /></IconContainer>,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <IconContainer><AiFillHeart color="white" /></IconContainer>,
  },
  {
    path: "/chat",
    name: "Chat",
    icon: <IconContainer><AiFillHeart color="white" /></IconContainer>,
  },
  {
    path: "/help",
    name: "Help & Support",
    icon: <IconContainer><AiFillHeart color="white" /></IconContainer>,
  },
  {
    path: "/report",
    name: "Reports",
    icon: <IconContainer><AiFillHeart color="white" /></IconContainer>,
  },
  {
    path: "/Logout",
    name: "Logout",
    icon: <IconContainer><AiFillHeart color="white" /></IconContainer>,
  },
];

const SideBar = ({ children }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon onClick={toggle}/>
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
              ))}
            </Menu>

          </Box>
        </Toolbar>
      </AppBar>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                  <>
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
                  </>
              );
            })}
          </section>
        </motion.div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
