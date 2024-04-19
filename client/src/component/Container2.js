import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import Ram from "../sol/Ram";
export default function Container1(){
    return(<>
    <Dashboard/>
          <Routes>
          
          <Route path="/ram" element={<><Ram/></>} />
          <Route path="/t" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
    </Routes>

    </>)
}