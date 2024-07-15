import  { React, useCallback, useContext, useEffect } from 'react'
import './MainPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate}  from 'react-router-dom';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import AddLinkIcon from '@mui/icons-material/AddLink';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import EditProfile from "./../EditProfile/EditProfile";
import LockResetIcon from '@mui/icons-material/LockReset';
import Post from '../../Feed/Post/Post';
import axios from 'axios';
import { UserContext } from "../../../App";

const MainPage = ({user}) => {
  const navigate = useNavigate();

  const {posts, setPosts, isLoading, setIsLoading, isLoadingProfile,
   setIsLoadingProfile, loggedInUser, setLoggedInUser} = useContext(UserContext);

  const email = user?.email;
  const username = user?.email?.split('@')[0];

    const fetchUserData = useCallback(() => {
        fetch(`https://twitter-project-354k.onrender.com/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedInUser(data)
            });
    },[email,setLoggedInUser])

    useEffect(() => {
        fetchUserData();
    },[fetchUserData])

    const fetchUserPosts = useCallback(()=> {
      fetch(`https://twitter-project-354k.onrender.com/userPost?email=${user?.email}`)
    .then(res => res.json())
    .then(data => {
      setPosts(data)
    });
    },[user?.email,setPosts]);
    

  useEffect(() => {
    fetchUserPosts();
  },[fetchUserPosts]);

  const handleUploadCoverImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set('image', image);
    axios.post('https://api.imgbb.com/1/upload?key=c515d649f347076c34cf60963cb28ee7', formData)
    .then(res => {
      const url = res.data.data.display_url;
      const userCoverImage = {
        email: user?.email,
        coverImage: url
      }
      setIsLoading(false);
      if (url) {
        axios.patch(`https://twitter-project-354k.onrender.com/userUpdates/${user?.email}`, userCoverImage)
        .then(res => fetchUserData());
      }
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
    })
  }
  const handleUploadProfileImage = (e) => {
    setIsLoadingProfile(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set('image', image);
    axios.post('https://api.imgbb.com/1/upload?key=c515d649f347076c34cf60963cb28ee7', formData)
    .then(res => {
      const url = res.data.data.display_url;
      const userProfileImage = {
        email: user?.email,
        profileImage: url
      }
      setIsLoadingProfile(false);
      if (url) {
        axios.patch(`https://twitter-project-354k.onrender.com/userUpdates/${user?.email}`, userProfileImage)
        .then(res => fetchUserData());
      }
    })
    .catch(error => {
      console.log(error);
      setIsLoadingProfile(false);
    })
  }

  return (
    <div>
      <ArrowBackIcon className='arrow-icon' onClick={() => navigate('/')} />
      <h4 className='heading-4'>{username}</h4>
      <div className="mainProfile">
        <div className="profile-bio">
          {
            <div>
              <div className="coverImageContainer">
                <img src={loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' } alt='' className='coverImage'/>
                <div className="hoverCoverImage">
                  <label htmlFor='image' className='imageIcon' >
                  {
                    isLoading ? 
                    <LockResetIcon className='photoIcon photoIconDisabled' /> 
                    :
                    <CenterFocusWeakIcon className='photoIcon' />
                  }
                  </label>
                  <div className="imageIcon_tweetButton">
                    <input type="file" id='image' className='imageInput' placeholder='Image Input' onChange={handleUploadCoverImage} />
                  </div>
                </div>
              </div>
              <div className="avatar-img">
                <div className="avatarContainer">
                  <img src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" className="avatar" />
                
                  <div className="hoverAvatarImage">
                    <div className="imageIcon_tweetButton">
                      <label htmlFor="profileImage" className="imageIcon">
                        {
                          isLoadingProfile ? <LockResetIcon className={`photoIcon ${isLoadingProfile ? 'photoIconDisabled' : ''}`} /> :
                          <CenterFocusWeakIcon className='photoIcon' />
                        }
                      </label>
                      <input type="file" id='profileImage' onChange={handleUploadProfileImage} className="imageInput" />
                    </div>
                  </div>
                </div>
                <div className="userInfo">
                  <div>
                    <h3 className="heading-3" >
                      {loggedInUser[0]?.displayName ? loggedInUser[0]?.displayName : user && user?.displayName}
                    </h3>
                    <p className="usernameSection">@{username}</p>
                  </div>
                  <EditProfile user={user} loggedInUser={loggedInUser} fetchUserData={fetchUserData} />
                </div>
                  <div className="infoContainer">
                    {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ''}
                    <div className="locationAndLink">
                      {loggedInUser[0]?.location ? <p className='subInfo'><MyLocationIcon />{loggedInUser[0]?.location}</p>: ''}
                      {loggedInUser[0]?.website ? <p className='subInfo link'><AddLinkIcon />{loggedInUser[0]?.website}</p>: ''}
                    </div>
                  </div>
                  <h4 className="tweetsText">Tweets</h4>
                  <hr />
              </div>      
                  {
                    posts.map(p => <Post key={p._id} p = {p} />)
                  }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainPage