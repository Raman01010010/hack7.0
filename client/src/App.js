import logo from './logo.svg';
import { User } from './context/User';
import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Navbar2 from './component/Navbar2';
import Ram from './sol/Ram';
function App() {

  const [newUser, setNewUser] = React.useState({ "email": "", "username": "", "pwd": "", "name": "", "accessToken": "" })
  const [parkingLots, setParkingLots] = React.useState([]);
   return (
    <>
    <User.Provider value={{newUser,setNewUser,parkingLots,setParkingLots}}>
      <Router>
     {(!newUser.accessToken)&&<Navbar/>}
     {(newUser.accessToken)&&<Navbar2/>}
  
      </Router>
    </User.Provider>
    </>
  );
}

export default App;
