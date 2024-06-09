import Home from "./Home2";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Signup from "./Signup";
import AboutUs from "./AboutUs";
import Otp from "./Otp";
import Persist from "./Persist";
import ShowSafety from "./ShowSafety";
import MyLocation from "./MyLocation";
import Home3 from "./home3.js";
import GetLocation from "./GetLocation";
export default function Container1(){
    return(<>
    <Persist/>
          <Routes>
          <Route path="/" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
          <Route path="/signup" element={<><Signup/></>} />
          <Route path="/otp" element={<><Otp/></>} />
          <Route path="/home2" element={<><Home/></>} />
          <Route path="/home3" element={<><Home3/></>} />

          <Route path="/about" element={<><AboutUs/></>} />
          <Route path="/showsafety" element={<><ShowSafety/></>}/>
          <Route path="/my" element={<><MyLocation/></>}/>
          <Route path="/watch/:alertId" element={<><GetLocation/></>}/>
    </Routes>

    </>)
}