import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import M from 'materialize-css'

const Home = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const date = useSelector((state) => state.user.data);

    useEffect(()=>{
        if(!date){
            navigate('/');
        }
    },[]);

    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [])
    const likePost = (id) => {
        console.log(id);
        fetch("http://localhost:8000/like", {
            method: "post",
            headers: {

                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")

            },
            body: JSON.stringify({
                postId:id
            })

        }).then(res => res.json())
            .then(result => {
                console.log(result)
                  console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })

    }





    const unlikePost = (id) => {
        fetch("http://localhost:8000/unlike", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")

            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            //   console.log(result)
            const newData = data.map(item => {
                if (item._id == result._id) {
                    return result
                } else {
                    return item
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const makeComment = async (text,postId) => {
        // console.log(postId)
        try {
            console.log(text);
    
            const response = await fetch('http://localhost:8000/comment', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                },
                body: JSON.stringify({
                    postId,
                    text,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
    
            console.log(result);
    
            const newData = data.map((item) => (item._id === result._id ? result : item));
            setData(newData);
        } catch (error) {
            console.error("Error making comment:", error.message);
        }
    };
    
    
    
    
    const deletePost = async (postId) => {
        console.log(postId)
        try {
            const response = await fetch(`http://localhost:8000/deletepost/${postId}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                },
            });
    
            if (!response.ok) {
                throw new Error(`Error deleting post. Status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log(result);
    
            
            const newData = data.filter((item) => item._id !== result._id);
            setData(newData);
        } catch (error) {
            console.error("Error deleting post:", error.message);
        
        }
    };
    
    

    return (




        <div className='home'>
    {data?.map(item => (
        <div className='card home-card' key={item._id}>
            {/* <h5 style={{padding:"5px"}}>


                <Link to={item.postedBy._id !== date._id ? "/profile/"+item.postedBy._id:'/profile'}>
                    {item.postedBy.name}
                </Link>

            
                {item.postedBy._id == date._id && (
                    <i className="material-icons" style={{ float: "right" }} onClick={() => deletePost(item._id)}>
                        delete
                    </i>
                )}
            </h5> */}
            <div className="card-image">
                <img src={item.photo} alt={item.title} />
            </div>
            <div className='card-content'>
                <i className="material-icons">favorite</i>
                {item.likes.includes(date._id) ? (
                    <i className="material-icons" onClick={() => unlikePost(item._id)}>thumb_down</i>
                ) : (
                    <i className="material-icons" onClick={() => likePost(item._id)}>thumb_up</i>
                )}
                <h6>{item.likes.length} likes</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                {item.comments.map(record => (
                    <h6 key={record._id}>
                        {/* <span style={{ fontWeight: "500" }}>{record.postedBy.name}:</span> */}
                        {record.text}
                    </h6>
                ))}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                }}>
                    <input type="text" placeholder="add a comment" />
                </form>
            </div>
        </div>
    ))}
</div>

    )
}

export default Home;