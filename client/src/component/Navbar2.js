/*import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Home from './Home';
import Container1 from './Container2';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };




    const navigate = useNavigate();


    function handleNav(){
        console.log("hifnb")
        navigate('/ram')
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        DASHBOARD
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem onClick={handleNav} key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, }}>
                <Container1 /> </Box>
        </Box>
    );
}
*/


import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container2 from "./Container2";
import Modal from "@mui/material/Modal";
import { Backdrop, Fade } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { User } from "../context/User";
import MenuIcon from "@mui/icons-material/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserFriends,
  faEnvelope,
  faMoneyCheckAlt,
  faUser,
  faBell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMediaQuery, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import axios from "../api/axios";

const Navbar2 = () => {
  const { sh, setSh, newUser } = useContext(User);
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isJobMenuOpen, setIsJobMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState([]); // New state for search input
  const [name, setName] = useState(null);
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
// Assuming you are using the document.cookie API to manage cookies

// Function to clear all cookies
function clearAllCookies() {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}
console.log(newUser.userid);
// Example usage in a logout function

async function handleLogout() {
  // Perform any additional logout logic if needed

  // Clear all cookies
  //clearAllCookies();
  console.log(newUser.userid)
  try {
    
    const response = await axios.post("/api/logout", {
      userid: newUser.userid,
    });

    if (response.status === 200) {
      // Successful logout on the server
      // Redirect to the login page or perform any other client-side cleanup
      window.location.href = "/home2";
    } else {
      // Server responded with an error status
      console.error("Failed to logout on the server:", response.statusText);
      // Optionally, handle the error, show a message, or take appropriate action
    }
  } catch (error) {
    // Error occurred during the axios request
    console.error("Failed to logout on the server:", error);
    // Optionally, handle the error, show a message, or take appropriate action
  }
}


// In your component, you might have a logout button or link that triggers the handleLogout function
// <button onClick={handleLogout}>Logout</button>

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  function handleNavAndClose() {
    handleMenuClose();
  }

  const handleJobMenuToggle = () => {
    setIsJobMenuOpen(!isJobMenuOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Cleanup function to set isJobMenuOpen to false when component unmounts
    return () => {
      setIsJobMenuOpen(false);
    };
  }, []);

  useEffect(() => {
    // Set isJobMenuOpen to true when the location changes to "/showjob"
    setIsJobMenuOpen(location.pathname === "/showjob");
  }, [location.pathname]);
  function fun() {
    setSh((old) => {
      return !old;
    });
  }

  useEffect(() => {
    // Fetch data from the backend using axios or your preferred method
    const fetchData = async () => {
      try {
        console.log(searchInput);
        const response = await axios.post("/connect/searchname", {
          searchInput,
        });

        // Access the data property of the response
        const responseData = response.data;

        // Access the matchedUsernames property from the data
        const matchedUsernames = responseData.matchedUsernames;

        // Assuming setName is a state update function
        setName(matchedUsernames);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    // Call the fetchData function

    // Call the fetchData function
    fetchData();
  }, [searchInput]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event, value) => {
    setSearchInput(value);
  };
  console.log(name);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {isLargeScreen ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Connexa
              </Typography>

              <Button color="inherit" onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faSearch} />
              </Button>

              <Button color="inherit" component={Link} to="/post">
                <FontAwesomeIcon icon={faHome} style={{ marginRight: "5px" }} />
                Home
              </Button>
              <Button color="inherit" onClick={fun} component={Link}>
                <FontAwesomeIcon icon={faBell} style={{ marginRight: "5px" }} />
                Notification
              </Button>

             
         
             
             
             
              <IconButton
                onClick={handleLogout}
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
              >
        <FontAwesomeIcon icon={faRightFromBracket} />{" "}
              </IconButton>
            </>
          ) : (
            <>
              {/* ... (unchanged code) */}
            
              <Button color="inherit" onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              <IconButton
                onClick={fun}
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
              >
                <FontAwesomeIcon icon={faHome} />
              </IconButton>
              <Button color="inherit" onClick={fun} component={Link}>
                <FontAwesomeIcon icon={faBell} style={{ marginRight: "5px" }} />
                Notification
              </Button>
              {/* <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                style={{ marginRight: "20px" }}
              >
                <FontAwesomeIcon icon={faUserFriends} />
              </IconButton> */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
              </Menu>
             
             
              
            </>
          )}

          
        </Toolbar>
      </AppBar>

      <Container2 />
    </>
  );
};

export default Navbar2;
