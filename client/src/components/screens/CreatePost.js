import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom"
import M from 'materialize-css'
import path from '../../path';


const CreatePost = () => {
  const navigate=useNavigate();
const [title,setTitle]=useState('')
const [body,setBody] =useState('')
const[image,setImage]=useState('')
const[url,setUrl]=useState('')
useEffect(()=>{
  if(url){
fetch(path+"/postcreate",{
  method:"post",
  headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
  },
  body:JSON.stringify({
      title,
      body,
      pic:url
  //     pic:url
  })
}).then(res=>res.json())
.then(data=>{
 if(data.error){
    M.toast({html: data.error,classes:"#c62828 red darken-3"})
 }
 else{
     M.toast({html:"created post Successfully",classes:"#f48fb1 pink lighten-3"})
     navigate('/')
 }
}).catch(err=>{
  console.log(err)
})
  }
},[url])

const postDetails = ()=>{
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






  return (
    <div className='card input-filed' style={{margin:"10px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
        <input type="text" placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        <input type="text" placeholder='body' onChange={(e)=>setBody(e.target.value)}></input>
        
    <div className="file-field input-field">
      <div className="btn #f48fb1 pink lighten-3">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
    <button className="btn waves-effect waves-light #f48fb1 pink lighten-3" onClick={()=>postDetails()}>Submit post
        </button>
  
        
    </div>
  )

}

export default CreatePost