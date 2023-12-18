import React ,{useEffect, useState}from 'react'
import { useDispatch } from 'react-redux'
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../store/userSlice'
import path from '../../path';

const Profile = () => {
    const [userProfile,setProfile] =useState(null)
    
    const data = useSelector((state)=>state.user.data);
    console.log(data)
const dispatch = useDispatch();
const {userid} = useParams()
console.log(userid)
const [showFollow,setShowFollow]=useState(data?!data.following.includes(userid):true);



useEffect(() => {
    fetch(path+`/user/${userid}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    .then(res => res.json())
    .then(result => {
        console.log(result);
        setProfile(result);
    })
    .catch(error => {
        console.error("Error fetching user data:", error);
        
    });
}, []);
const followUser = ()=>{
    fetch(path+'/follow',{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            followId:userid
        })
    }).then(res=>res.json())
    .then(data=>{
    console.log(data)
    dispatch(updateUser(data.following,data.followers))
        // dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
         localStorage.setItem("user",JSON.stringify(data))
         setProfile((prevState)=>{
            
             return {

                 ...prevState,
                 user:{
                     ...prevState.user,
                     followers:[...prevState.user.followers,data._id]
                    }
             }
         })
         setShowFollow(false)
    })
}
const unfollowUser = ()=>{
    fetch(path+'/unfollow',{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            unfollowId:userid
        })
    }).then(res=>res.json())
    .then(data=>{
    console.log(data)
    dispatch(updateUser(data.following,data.followers))
        // dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
         localStorage.setItem("user",JSON.stringify(data))
         setProfile((prevState)=>{
            const newFollower = prevState.user.followers.filter(item=>item != data._id )
             return {
                 ...prevState,
                 user:{
                     ...prevState.user,
                     followers:newFollower
                    }
             }
         })
         setShowFollow(false)
    })
}







 return (
    <>
    {userProfile ?
    <div style={{maxwidth:"550px",margin:"0px auto"}}>
    <div style={{
        display:"flex",
        justifyContent:"space-around",
        margin:"18px 0px",
        borderBottom:"1px solid grey"

    }}>
    <div>
        <img style={{width:"140px",height:"140px",borderRadius:'80px'}}
        src={userProfile.user.pic}/>
    </div>
    <div>
    <h4>{userProfile.user.name}</h4>
                   <h6>{userProfile.user.email}</h6>

       <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
        <h6>{userProfile.posts.length} posts</h6>
        <h6>{userProfile.user.followers.length} followers</h6>
                       <h6>{userProfile.user.following.length} following</h6>

       </div>
       {showFollow?
       <button style={{
                       margin:"10px"
                  }} className="btn waves-effect waves-light #f48fb1 pink lighten-3"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>:
                    <button style={{
                       margin:"10px"
                  }} className="btn waves-effect waves-light #f48fb1 pink lighten-3"
                    onClick={()=>unfollowUser()}
                    >
                       UnFollow
                    </button>
}
    </div>



    
    
    </div>
    <div className="gallery">
        {
            userProfile.posts.map(item=>{
                return(
                    <img key={item._id} className='item' src={item.photo} alt={item.title}></img>
                )
                

            })
        }

</div>
</div>
    :<h2>loading...!</h2>}
    
    </>
 )
}

export default Profile;