import { useEffect,useState,useContext } from "react";
import { User } from "../context/User";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Adddata from "./Adddata";
import Dashboard from "./Dashboard";
import Path from "./path"
import Shortest from "./Shortestpath"
import ShowRoad from "./ShowRoad";
import Graph from "./Graph";
import Map from "./Map"
import Ram from "../sol/Ram";
import AddSafety from "./AddSafety";
import ShowSafety from "./ShowSafety";
import GetLocation from "./GetLocation";
import MyLoc from "./MyLocation";

import Register from "./register"
import Showdata from "./Showdata"
import Bookit from "./Bookit";
import Search from "./Search";
import Ticket from "./Ticket";
import Verify from "./Verify";
import { Modal } from "@mui/material";
import GoAuthorize from "./GoAuthorize";
import Notification from "./Notification.js"
import io  from "socket.io-client";
import AdminPage from "./AdminPage";
const socket = io("http://localhost:3500");



export default function Container1() {
     
    const { newUser } = useContext(User);
    useEffect(() => {
         const fun = async () => {
           if (newUser && newUser.email) {
             const email = newUser.email;
             console.log("Emitting newUser event with email:", email);
             socket.emit("newUser", { email });
             console.log("newUser event emitted");
           }
         };
             
         fun();
     }, [newUser]); 

    return (<>
        {/* <Dashboard/> */}
        <Routes>
            <Route path="/ram" element={<><Ram /></>} />
            <Route path="/t" element={<><Home /></>} />
            <Route path="/add" element={<><Adddata /></>} />
            <Route path="/path" element={<><Path /></>} />
            <Route path="/shortestpath" element={<><Shortest /></>} />
            <Route path="/showroad" element={<><ShowRoad /></>} />
            <Route path="/graph" element={<><Graph /></>} />
            <Route path="/map" element={<><Map /></>} />
            <Route path="/safety" element={<><AddSafety /></>} />
            <Route path="/showsafety" element={<><ShowSafety /></>} />
            <Route path="/dashboard" element={<><Dashboard /></>} />
            <Route path="/watch/:alertId" element={<><GetLocation /></>} />
            <Route path="/my" element={<><MyLoc /></>} />
            <Route path="/register" element={<><Register /></>} />
            <Route path="/showdata" element={<><Showdata /></>} />
            <Route path="/book/:id/:company" element={<Bookit />} />
            <Route path="/search" element={<Search />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/modal" element={<Modal />} />
            <Route path="/goAuthrize" element={<><GoAuthorize socket = {socket}/></>} />
            <Route path="/adminpage" element={<><AdminPage socket = {socket}/></>} />
            <Route path="/notification" element={<><Notification socket = {socket}/></>} />

        </Routes>
    </>)
}