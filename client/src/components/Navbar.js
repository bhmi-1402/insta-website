import React,{useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux';
const Navbar = () => {
  const data = useSelector((state)=>state.user.data);
  

 return (
<nav>
    <div className="nav-wrapper white" >
      <Link className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
       {
        data ? <>
          <li>
          <Link to={'/'}>create Post</Link>
          </li>
          <li>
          <Link>Profile</Link>
          </li>
        </> 
        : <>
        <li>
          <Link>Signin</Link>
        </li>
        <li>
          <Link>Signup</Link>
        </li>
        </>
       }
      </ul>
    </div>
  </nav>
 )
}

export default Navbar;