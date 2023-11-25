import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {  useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { removeUser } from '../store/userSlice'
const Navbar = () => {
  const data = useSelector((state)=>state.user.data);
const dispatch = useDispatch();
const Navigate=useNavigate()

  

 return (
<nav>
    <div className="nav-wrapper white" >
      <Link to={data?"/":"/signup"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
       {
        data ? <>
          <li>
          <Link to={'/createpost'}>Create Post</Link>
          </li>
          <li>
          <Link to={'/profile'}>Profile</Link>
          </li>
          <li>
          <button className="btn waves-effect waves-light #f48fb1 pink lighten-3" 
          onClick={()=> {
            localStorage.clear()
             dispatch(removeUser(data.user))
             Navigate('/signup')
          }}>Logout</button>
          </li>
        </> 
        : <>
        <li>
          <Link to={'/login'}>Signin</Link>
        </li>
        <li>
          <Link to={'/signup'}>Signup</Link>
        </li>
        </>
       }
      </ul>
    </div>
  </nav>
 )
}

export default Navbar;