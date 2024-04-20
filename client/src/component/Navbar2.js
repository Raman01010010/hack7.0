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
  faShield,
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
    console.log(newUser.userid);
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




  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

 
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
              SafeNet
              </Typography>

              <Button color="inherit" component={Link} to="/dashboard">
                <FontAwesomeIcon icon={faHome} style={{ marginRight: "5px" }} />
                Home
              </Button>
              <Button color="inherit"  component={Link} to="/shortestpath">
                <FontAwesomeIcon
                  icon={faShield}
                  style={{ marginRight: "5px" }}
                />
                Safest path
              </Button>

              <Button color="inherit"  component={Link} to="/add">
                <FontAwesomeIcon icon={faBell} style={{ marginRight: "5px" }} />
                Add accident
              </Button>
              <Button color="inherit" component={Link} to="/ram">
                <FontAwesomeIcon icon={faBell} style={{ marginRight: "5px" }} />
                Add violations
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
              {/* <Button color="inherit" onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faSearch} />
              </Button> */}
              <IconButton
                
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
              >
                <FontAwesomeIcon icon={faHome} />
              </IconButton>
              <Button color="inherit"  component={Link}>
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
              ></Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div className="m-[10vh]">
        <Container2 />
      </div>
    </>
  );
};

export default Navbar2;
