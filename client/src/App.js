import {React, useEffect} from 'react'
import './App.css';
// import { Routes, Route } from "react-router-dom";
import { useNavigate, BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar  from './components/Navbar'
import Home  from './components/screens/Home'
import Signup  from './components/screens/Signup'
import Login from './components/screens/Login'
import Profile  from './components/screens/Profile'
import CreatePost  from './components/screens/CreatePost'
import { useDispatch } from 'react-redux'
import { addUser } from './store/userSlice'
import {  useSelector } from 'react-redux';
import UserProfile from './components/screens/UserProfile'
import Subscribed from './components/screens/Subscribed'

  


function App() {
  const data = useSelector((state)=>state.user.data);
  const dispatch = useDispatch();
    // const Navigate = useNavigate();

  
  useEffect(()=>{
    const users=JSON.parse(localStorage.getItem('users'))
    if(users){
      dispatch(addUser(data.users))
    }
    else{
      // Navigate('/login');
    }
  })
  

  return (


    <BrowserRouter>
  <>
 <Navbar></Navbar>
 <Routes> 
 <Route exact path="/" index element ={<Home></Home>}></Route>
 <Route path="/signup" element ={<Signup></Signup>}></Route>
 <Route path="/login" element ={<Login></Login>}></Route>
 <Route exact path="/profile" element ={<Profile></Profile>}></Route>
 <Route path="/createpost" element ={<CreatePost></CreatePost>}></Route> 
 <Route path='/profile/:userid' element ={<UserProfile/>}></Route>
 <Route path='/myfollowingpost' element ={<Subscribed/>}></Route>
  </Routes> 
  </>
  
   </BrowserRouter> 
  // </UserContext.Provider>
  );
}

export default App;
