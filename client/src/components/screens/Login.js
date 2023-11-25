import {React,useContext,useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import M from 'materialize-css'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/userSlice'

const Login = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const postData=()=>{
        
    
        
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
             M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
             return
         }
       
       
        fetch("http://localhost:8000/login",{
             method:"post",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 
                 password,
                 email,
             //     pic:url
             })
         }).then(res=>res.json())
         .then(data=>{

            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem('jwt',data.token)
                localStorage.setItem('user',JSON.stringify(data.user))
                dispatch(addUser(data.user));
                M.toast({html:"signin success",classes:"#f48fb1 pink lighten-3"})
                navigate('/')
            }
         }).catch(err=>{
             console.log(err)
         })
     

   }
 return (
<div className="mycard">
    <div className='card auth-card input-field'>
        <h2 className='brand-logos'>Instagram</h2>
        <input type="text" placeholder="Email" value={email}
          onChange={(e)=>setEmail(e.target.value)}></input>
        <input type="password" placeholder="Password" value={password}
           onChange={(e)=>setPassword(e.target.value)}></input>
        <button className="btn waves-effect waves-light #f48fb1 pink lighten-3" onClick={()=> postData()}>Login
        </button>
        <h6>Don't have an account ?
        <Link to="/signup" className='q'>Signup</Link>
       </h6>
 
  </div>
      </div>
 )
}

export default Login;