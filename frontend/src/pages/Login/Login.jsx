import React, { useState } from 'react'
import twitterImage from '../../assets/images/X.png'
import auth from '../../firebase.init'
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import XIcon from '@mui/icons-material/X';
import { GoogleButton } from "react-google-button";
import './Login.css'
import { Link,useNavigate } from 'react-router-dom';


function Login() {
  
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  // const [error, setError] = useState(''); 
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  if (user || googleUser) {
    navigate('/');
  }
  if (error || googleError) {
    console.log(error || googleError)
  }
  if (loading || googleLoading) {
    console.log('loading...')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email,password);
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  }

  return (
    <div className='login-container'>
      <div className="image-container">
        <img className='image' src={twitterImage} alt="" />
      </div>
      <div className="form-container">
        <XIcon className='Twitter-icon' style={{backgroundColor: 'black' , color: 'white'}} />
        <h2 className="heading">Happening Now</h2>
        <h3 className="heading1">Join X Today</h3>
        <form onSubmit={handleSubmit}>
          
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
              minLength={6}
              maxLength={15}
            />
            
          
              <button className='btn' type='submit'>
                Login
              </button>
            
        </form>

          <hr/>
          <div className="google-button">
            <GoogleButton 
            className='g-btn'
            type='light'
            onClick={handleGoogleSignIn}
            />
            <div className='signUpText'>
              Don't have an account?
              <Link
              to='/signup'
              style={{
                textDecoration: 'none',
                color: 'skyblue',
                font: '600',
                marginLeft: '5px'
              }}
              >
              Sign up
              </Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login