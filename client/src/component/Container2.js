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
export default function Container1() {
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
        </Routes>
    </>)
}