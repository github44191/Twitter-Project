import React, { useContext, useEffect } from 'react'
import {Avatar,Button} from '@mui/material'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import './Tweetbox.css'
import axios from 'axios'
import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

const Tweetbox = () => {

  const { post, setPost, user, name, setName, isLoading, setIsLoading, username, setUserName, imageURL, setImageURL, setPosts, loggedInUser} = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPosts = () => {
    fetch(`https://twitter-project-354k.onrender.com/post`)
        .then(res => res.json())
        .then(data => {
            setPosts(data); // Update posts only when fetched
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
  };

  useEffect(() => {
    fetchPosts();
  },[]);
  const email = user?.email;

  const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

   const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set('image', image)

    axios.post('https://api.imgbb.com/1/upload?key=c515d649f347076c34cf60963cb28ee7', formData)
    .then(res => {
      const responseData = res;
      setImageURL(responseData.data.data.display_url);
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
    })
  }

  const handleTweet =(e) => {
    e.preventDefault();
    if(user.providerData[0].providerId === 'password') {
      fetch(`https://twitter-project-354k.onrender.com/loggedInUser?email=${email}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setName(data[0].displayName)
        setUserName(data[0].username)
      })
    }
    else {
      setName(user?.displayName);
      setUserName(user?.email.split('@')[0]);
    }
    if (name) {
      const userPost = {
        profilePhoto: userProfilePic,
        name,
        username,
        email,
        post: post,
        image: imageURL
      }
      setPost('');
      setImageURL('');
      fetch('https://twitter-project-354k.onrender.com/post', {
        method: "POST",
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify(userPost),
      })
      .then(res => res.json())
      .then(data => {
          fetchPosts();
          // console.log(data);
      })
      .catch(error => console.log(error))
    }
    }

  return (
    <div className='tweetBox'>
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar src={userProfilePic} onClick={() => {
              navigate('/home/profile');
          }} />
          <input 
          className='inputText'
          type="text"
          placeholder="What's Happening"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">

            {
              isLoading? <p>Uploading Image...</p> : <p>{imageURL? 'Image Uploaded' : <AddPhotoAlternateOutlinedIcon /> }</p>
            }
          </label>
          <input
                    type="file"
                    id='image'
                    className="imageInput"
                    onChange={handleUploadImage}
                />
          <Button style={{backgroundColor: 'var(--twitter-background)'}} className="tweetBox__tweetButton" type='submit'>
            Tweet
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Tweetbox