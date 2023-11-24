import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../App'

const Navbar = () => {
  const {state,dispatch}=useContext(UserContext)
  const renderList=()=>{
    if(state){
    return [
<li><Link to="/profile" >Profile</Link></li>,
        <li><Link to="/createpost" >Create Post</Link></li>
    ]
  }
    else{
      return[
      <li><Link to="/login">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
    ]
  }
  }
 return (
<nav>
    <div className="nav-wrapper white" >
      <Link to={state?"/":"/login" }className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
        
      </ul>
    </div>
  </nav>
 )
}

export default Navbar;