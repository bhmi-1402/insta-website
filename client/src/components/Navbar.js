import React,{useRef,useEffect,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {  useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { removeUser } from '../store/userSlice'
import M from 'materialize-css'


const Navbar = () => {

  const searchModal=useRef(null)
  const [search,setSearch]=useState('')
  const [userDetails,setUserDetails]=useState([])
  const data = useSelector((state)=>state.user.data);
const dispatch = useDispatch();
const Navigate=useNavigate();
useEffect(()=>{
  M.Modal.init(searchModal.current);
},[])
const fetchUsers=(query)=>{
setSearch(query)
fetch('http://localhost:8000/search-users',{
  method:"post",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    query
  })
}).then(res=>res.json())
.then(results=>{
  setUserDetails(results.user)
})
}
  

 return (
<nav>
    <div className="nav-wrapper white" >
      <Link to={data?"/":"/signup"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
       {
        data ? <>
        <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>
          <li key="2" >
          <Link to={'/createpost'}>Create Post</Link>
          </li>
          <li key="3">
          <Link to={'/profile'}>Profile</Link>
          </li>
          <li key="4"><Link to="/myfollowingpost">My following Posts</Link></li>
          <li key="5">
          <button className="btn waves-effect waves-light #f48fb1 pink lighten-3" 
          onClick={()=> {
            localStorage.clear()
             dispatch(removeUser(data.user))
             Navigate('/signup')
          }}>Logout</button>
          </li>
        </> 
        : <>
        <li key="6">
          <Link to={'/login'}>Signin</Link>
        </li>
        <li key="7">
          <Link to={'/signup'}>Signup</Link>
        </li>
        </>
       }
      </ul>
    </div>

    <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
    <div className="modal-content">
    <input type="text" placeholder="search users" 
          value={search}
          onChange={(e)=>fetchUsers(e.target.value)}></input>
          <ul class="collection" style={{color:"black",flexDirection:"column"}}>
          {
          userDetails.map(item=>{
          return <Link to={item._id !==data._id ? "/profile/"+item._id: '/profile'} onClick={()=>{M.Modal.getInstance(searchModal.current).close()
          setSearch('')}}><li class="collection-item">{item.email}</li></Link>
          })}
      
      
    </ul>
         
    </div>
    <div className="modal-footer">
      <button href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
    </div>
  </div>
          
  </nav>
 )
}

export default Navbar;