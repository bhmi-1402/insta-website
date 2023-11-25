import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {  useSelector } from 'react-redux';
import M from 'materialize-css'

const Home = () => {
    const date = useSelector((state)=>state.user.date);
const dispatch = useDispatch();

    const [data,setData]=useState([])
  useEffect(()=>{
    fetch('http://localhost:8000/allpost',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        setData(result.posts)
    })
  },[])
  const likePost=(id)=>{
    fetch("http://localhost:8000/like",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")

        },
        body:JSON.stringify({
postId:id
        })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
    })
  }



  const unlikePost=(id)=>{
    fetch("http://localhost:8000/unlike",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")

        },
        body:JSON.stringify({
postId:id
        })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
    })
  }


  
 return (


<div className='home'>

    {
        data.map(item=>{
return(

<div className='card home-card' key={item._id}>
{/* <h5>{item.postedBy.name}</h5> */}
<div className="card-image">
    <img src={item.photo}></img>
</div>
<div className='card-content'>
<i class="material-icons">favorite</i>
<i class="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
<i class="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
    <h6>{item.likes.length} likes</h6>
    <h6>{item.title}</h6>
    <p>{item.body}</p>
    <input type="text" placeholder='add a comment'></input>
</div>
</div>)
        })
    }
    
    
</div>
 )
}

export default Home;