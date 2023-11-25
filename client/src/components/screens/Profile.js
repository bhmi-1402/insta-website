import React ,{useEffect, useState}from 'react'
import { useDispatch } from 'react-redux'
import {  useSelector } from 'react-redux';

const Profile = () => {
    const data = useSelector((state)=>state.user.data);
const dispatch = useDispatch();
const [mypics,setPics] =useState([])
useEffect(()=>{
    fetch('http://localhost:8000/mypost',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        setPics(result.mypost)
    })
  },[])
  



 return (
    <div style={{maxwidth:"550px",margin:"0px auto"}}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"

        }}>
        <div>
            <img style={{width:"140px",height:"140px",borderRadius:'80px'}}
            src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"/>
        </div>
        <div>
           <h4> {data?data.name:"loading"}</h4>
           <div style={{display:"flex", justifyContent:"space-around", width:"108%"}}>
            <h5>40 post</h5>
            <h5>40 followers</h5>
            <h5>40 following</h5>
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