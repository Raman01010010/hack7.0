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
export default function Container1(){
    return(<>
    {/* <Dashboard/> */}
          <Routes>
          <Route path="/" element={<><Home/></>} />
          <Route path="/add" element={<><Adddata/></>} />
          <Route path="/path" element={<><Path/></>} />
          <Route path="/shortestpath" element={<><Shortest/></>} />
          <Route path="/showroad" element={<><ShowRoad/></>}/>
          <Route path="/graph" element={<><Graph/></>}/>
          <Route path="/map" element={<><Map/></>}/>
    </Routes>
    </>)
}