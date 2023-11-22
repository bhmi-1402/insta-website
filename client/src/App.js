import React from 'react'
import './App.css';
import Navbar  from './components/Navbar'
import Home  from './components/screens/Home'
import Signup  from './components/screens/Signup'
import Login from './components/screens/Login'
import Profile  from './components/screens/Profile'
import { Route, Routes } from "react-router-dom";



function App() {
  return (
  <>
 <Navbar></Navbar>
 {/* <Routes> */}
 {/* <Route path="/"><Home/></Route>
 <Route path="/signup"><Signup/></Route>
 <Route path="/login"><Login/></Route>
 <Route path="/profile"><Profile/></Route> */}
 {/* </Routes> */}
    
 </>
  );
}

export default App;
