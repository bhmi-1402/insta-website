import {React,useEffect,useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import M from 'materialize-css'
import { GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google';
import axios from 'axios';

// const signupInitial={
//      name: '',
//      email:'',
//     password:''
     
//  };
 

const Signup= () => {
     // const[signup,setSignup]=useState(signupInitial);
     // const[error,showError]=useState('')
     const navigate = useNavigate();
     const [name,setName] = useState("")
     const [password,setPassword] = useState("")
     const [email,setEmail] = useState("")
     const [image,setImage] =useState("")
     const [url,setUrl]=useState(undefined)
     useEffect(()=>{
if(url){
    uploadFields()
}
     },[url])

     const uploadPic=()=>{
        const data = new FormData()
  data.append("file",image)
  data.append("upload_preset","insta-clone")
  data.append("cloud_name","bhoomicloud")
  fetch("https://api.cloudinary.com/v1_1/bhoomicloud/image/upload",{
      method:"post",
      body:data
  })
  .then(res=>res.json())
  .then(data=>{
     setUrl(data.url)
    //  console.log(data)
  })
  .catch(err=>{
      console.log(err)
  })
     }

     const uploadFields=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
      
      
       fetch("http://localhost:8000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
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

     const postData=()=>{
          
          if(image){
            uploadPic()
          }
          else{
uploadFields()
          }
          
       

     }
 return (
    <div className="mycard">
    <div className='card auth-card input-field'>
        <h2 className='brand-logos'>Instagram</h2>
        <input type="text" placeholder="Name" value={name}
            onChange={(e)=>setName(e.target.value)}  ></input>
        <input type="text" placeholder="Email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}></input>
        <input type="password" placeholder="Password" 
           value={password}
           onChange={(e)=>setPassword(e.target.value)}></input>
           <div className="file-field input-field">
      <div className="btn #f48fb1 pink lighten-3">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
        <button className="btn waves-effect waves-light #f48fb1 pink lighten-3" onClick={()=> postData()}>SIGNUP
       
  </button>


  
<h6></h6>

       <GoogleOAuthProvider clientId="<your_client_id>">
       <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/></GoogleOAuthProvider>
<h6>Already have an account ?
       <Link to="/login" className='q'>Login</Link>
       </h6>
       
  </div>
      </div>
 )
}

export default Signup;