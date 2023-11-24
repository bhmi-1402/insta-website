import {React,useEffect,createContext,useReducer,useContext} from 'react'
import './App.css';
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar  from './components/Navbar'
import Home  from './components/screens/Home'
import Signup  from './components/screens/Signup'
import Login from './components/screens/Login'
import Profile  from './components/screens/Profile'
import CreatePost  from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'

export const UserContext=createContext()

const Routing=()=>{
  const Navigate=useNavigate();
  const{state,dispatch}=useContext(UserContext)
  useEffect(()=>{
const user=JSON.parse(localStorage.getItem("user"))
if(user){
  // dispatch({type:"USER",payload:user})
  Navigate('/')
}
else{
  Navigate('/login')
}
  },[])
  return (
    <Routes> 
 <Route exact path="/" element ={<Home></Home>}></Route>
 <Route path="/signup" element ={<Signup></Signup>}></Route>
 <Route path="/login" element ={<Login></Login>}></Route>
 <Route path="/profile" element ={<Profile></Profile>}></Route>
 <Route path="/createpost" element ={<CreatePost></CreatePost>}></Route> 
  </Routes> 
  )
}


function App() {

  const [state,dispatch]=useReducer(reducer,initialState)
  return (
<UserContext.Provider value={{state,dispatch}}>

    <BrowserRouter>
  
 <Navbar></Navbar>
  <Routing></Routing>
    
  
  </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
