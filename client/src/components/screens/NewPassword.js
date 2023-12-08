import {React,useContext,useState} from 'react'
import {Link,useNavigate,useParams} from "react-router-dom"
import M from 'materialize-css'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/userSlice'

const Login = () => {
    
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token}=useParams();
    console.log(token);


    const [password,setPassword] = useState("")


    const postData=()=>{
        
    
        
        
       
       
        fetch("http://localhost:8000/new-password",{
             method:"post",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 
                 password,
                 token
                 
             //     pic:url
             })
         }).then(res=>res.json())
         .then(data=>{

            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                
                M.toast({html:data.message,classes:"#f48fb1 pink lighten-3"})
                navigate('/login')
            }
         }).catch(err=>{
             console.log(err)
         })
     

   }
 return (
<div className="mycard">
    <div className='card auth-card input-field'>
        <h2 className='brand-logos'>Instagram</h2>
       
        <input type="password" placeholder="Enter a new Password" value={password}
           onChange={(e)=>setPassword(e.target.value)}></input>
        <button className="btn waves-effect waves-light #f48fb1 pink lighten-3" onClick={()=> postData()}>Update password
        </button>
        
  </div>
      </div>
 )
}

export default Login;