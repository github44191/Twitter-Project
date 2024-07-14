import React, { useState } from 'react'
import twitterImage from '../../assets/images/X.png'
import auth from '../../firebase.init'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import XIcon from '@mui/icons-material/X';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleButton } from "react-google-button";
import './Login.css'
import axios from 'axios';


function Signup() {
  
  const [username, setUserName] = useState(''); 
  const [displayName, setDisplayName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  // const [error, setError] = useState(''); 
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  if (user || googleUser) {
    navigate('/');
   
  }
  if (error || googleError) {
    console.log(error)
  }
  if (loading || googleLoading) {
    console.log('loading...')
  }

  const handleSubmit = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(email,password);

    const user = {
      username,
      displayName,
      email
    };
    axios.post(`http://localhost:5000/register`, user);
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle();
    // const googleUser = {
    //   username: googleUser.username.auth.email.split('@')[0],
    //   displayName: googleUser.username.auth.displayName,
    //   email: googleUser.username.auth.email
    // }
    console.log(googleUser);
    axios.post(`http://localhost:5000/register`, user)
  }
  return (
    <>
      <div className='login-container'>
        <div className="image-container">
          <img className='image' src={twitterImage} alt="" />
        </div>
        <div className="form-container">
          <div className="form-box">
            <XIcon className='Twittericon' style={{backgroundColor:'black',color: 'white'}}/>
            <h2 className="heading">Happening Now</h2>
            <h3 className="heading1">Join X Today</h3>
            <form onSubmit={handleSubmit}>
              <input 
                type="text"
                className='display-name'
                placeholder='@username'
                onChange={(e) => setUserName(e.target.value)}
                required
                />
              <input 
                type="text"
                className='display-name'
                placeholder='Enter Full Nmae'
                onChange={(e) => setDisplayName(e.target.value)}
                required
                />
              <input 
                type="email"
                className='email'
                placeholder='Email Address'
                onChange={(e) => setEmail(e.target.value)}
                required
                />
              <input 
                type="password"
                className='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
                />
              <div className='btn-Login'>
                <button className='btn' type='submit'>
                  Sign up
                </button>
              </div>
            </form>
          </div>
          
          <hr/>
          <div className="google-button">
            <GoogleButton 
            className='g-btn'
            type='light'
            onClick={handleGoogleSignIn}
            />
          </div>
          <div>
            Already have an account?
            <Link
            to='/login'
            style={{
              textDecoration: 'none',
              color: 'skyblue',
              font: '600',
              marginLeft: '5px'
            }}
            >
            Login
            </Link>
          </div>
        </div> 
      </div> 
    </>
         
  );
}

export default Signup