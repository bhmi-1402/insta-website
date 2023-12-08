import React ,{useEffect, useState}from 'react'
import { useDispatch } from 'react-redux'
import {  useSelector } from 'react-redux';
import { updatePic } from '../../store/userSlice'
import axios from 'axios';

const Profile = () => {
    const [mypics,setPics] =useState([])
    const state = useSelector((state)=>state.user.data);
const dispatch = useDispatch();

const [image,setImage] =useState("")
const [url,setUrl]=useState("")

useEffect(()=>{
    fetch('http://localhost:8000/mypost',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        // console.log(result)
        setPics(result.mypost)
    })
  },[]);

  const updateProfilePicHandler = async ()=>{
    try {
        if(image){
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "insta-clone");
            data.append("cloud_name", "bhoomicloud");
            const resByCloudinary = await axios.post('https://api.cloudinary.com/v1_1/bhoomicloud/image/upload',data);
            console.log(resByCloudinary);

            const resByUpdatePic = await axios.post('http://localhost:8000/updatepic',{
                pic:data.url,
                userID:state?._id
            });
            console.log(resByUpdatePic);
            dispatch(updatePic(resByUpdatePic.data.pic));
        }
    } catch (error) {
        
    }
  };

  useEffect(() => {
    updateProfilePicHandler();
}, [image]);

const updatePhoto=(file)=>{
    setImage(file)
    
}


 return (
    <div style={{maxwidth:"550px",margin:"0px auto"}}>
        <div style={{
             margin:"18px 0px",
             borderBottom:"1px solid grey"
 
        }}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
           

        }}>
        <div>
            <img style={{width:"140px",height:"140px",borderRadius:'80px'}}
            src={state?state.pic:"loading"}/>
        </div>

        <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h5>{state?state.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6>
                   </div>

               </div>


        
        
        </div>
       
       <div className="file-field input-field" style={{margin:"10px"}}>
      <div className="btn #f48fb1 pink lighten-3">
        <span>Update profile</span>
        <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
       </div>
        <div className="gallery">
            {
                mypics.map(item=>{
                    return(
                        <img key={item._id} className='item' src={item.photo} alt={item.title}></img>
                    )
                    
    
                })
            }

</div>
    </div>
 )
}

export default Profile;