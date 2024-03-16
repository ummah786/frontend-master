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
const routes = [
  {
    path: "/app/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/party",
    name: "Parties",
    icon: <FaUser />,
  },
  {
    path: "/app/posbilling",
    name: "POS-Billing",
    icon: <MdMessage />,
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: <BiAnalyse />,
  },
  {
    path: "/stock",
    name: "Stock",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/stock/shop",
        name: "Shop ",
        icon: <FaUser />,
      },
      {
        path: "/stock/godowon",
        name: "Godowon",
        icon: <FaLock />,
      }
    ],
  },
  {
    path: "/sales",
    name: "Sales",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/sales/invoice",
        name: "Sales Invoice",
        icon: <FaUser />,
      },
      {
        path: "/sales/return",
        name: "Sales Return",
        icon: <FaLock />,
      }, {
        path: "/sales/payment-in",
        name: "Payment In ",
        icon: <FaUser />,
      },
      {
        path: "/sales/credit-note",
        name: "Credit Note",
        icon: <FaLock />,
      }
    ],
  },
  {
    path: "/purchase",
    name: "Purchase",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/purchase/invoice",
        name: "Purchase Invoice",
        icon: <FaUser />,
      },
      {
        path: "/purchase/order",
        name: "Purchase Order",
        icon: <FaUser />,
      },
      {
        path: "/purchase/return",
        name: "Purchase Return",
        icon: <FaLock />,
      },
      {
        path: "/purchase/payment-out",
        name: "Payment Out",
        icon: <FaLock />,
      },
      {
        path: "/purchase/debit-note",
        name: "Debit Note",
        icon: <FaLock />,
      }
    ],
  },
  {
    path: "/account",
    name: "Account",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/account/manageAccount",
        name: "Manage Account",
        icon: <FaUser />,
      },
      {
        path: "/account/myuser",
        name: "My User",
        icon: <FaLock />,
      }, {
        path: "/account/business",
        name: "Business",
        icon: <FaUser />,
      }
    ],
  },
  {
    path: "/bank",
    name: "Cash & Bank",
    icon: <BsCartCheck />,
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: <AiFillHeart />,
  },
  {
    path: "/settings",
    name: "Serttings",
    icon: <AiFillHeart />,
  },
  {
    path: "/help",
    name: "Help & Support",
    icon: <AiFillHeart />,
  },
  {

    path: "/report",
    name: "Reports",
    icon: <AiFillHeart />,
  },
  {
    path: "/Logout",
    name: "Logout",
    icon: <AiFillHeart />,
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
