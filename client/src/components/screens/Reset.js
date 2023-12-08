import {React,useContext,useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import M from 'materialize-css'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/userSlice'

const Reset = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email,setEmail] = useState("")
    // const [password,setPassword] = useState("")


    const postData=async()=>{
        
    
        
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
             M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
             return
         }
       
       
         try {
            const response = await fetch("http://localhost:8000/reset-password", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                // pic: url
              }),
            });
          
            const data = await response.json();
          
            if (data.error) {
              M.toast({ html: data.error, classes: "#c62828 red darken-3" });
            } else {
              dispatch(addUser(data.user));
              M.toast({ html: data.message, classes: "#f48fb1 pink lighten-3" });
              navigate('/login');
            }
          } catch (err) {
            console.error(err);
          }
          
     

   }
 return (
<div className="mycard">
    <div className='card auth-card input-field'>
        <h2 className='brand-logos'>Instagram</h2>
        <input type="text" placeholder="Email" value={email}
          onChange={(e)=>setEmail(e.target.value)}></input>
      
        <button className="btn waves-effect waves-light #f48fb1 pink lighten-3" onClick={()=> postData()}>Reset password
        </button>

        
       
 
  </div>
      </div>
 )
}

export default Reset;