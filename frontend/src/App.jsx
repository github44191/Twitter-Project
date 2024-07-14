import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import ProtectedRoute from './pages/ProtectedRoute';
import PageLoading from './pages/PageLoading';
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore'
import Bookmarks from './pages/Bookmarks/Bookmarks'
import Lists from './pages/Lists/Lists'
import Messages from './pages/Messages/Messages'
import More from './pages/More/More'
import Notifications from './pages/Notifications/Notifications'
import Profile from './pages/Profile/Profile'
import { useState, createContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';

export const UserContext = createContext();

function App() {

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState(''); 
  const [posts, setPosts] = useState([]);
  const [dob, setDob] = useState('');
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState('');
  const [username, setUserName] = useState('');
  const [post, setPost] = useState('');
  const [open, setOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div >
      <UserContext.Provider value={{email, setEmail, password, setPassword, user, displayName, bio, location, website, dob, posts, setDisplayName, setBio, setLocation, setWebsite, setPosts, setDob, name, setName, imageURL, setImageURL, isLoading, setIsLoading, username, setUserName, post, setPost, isLoadingProfile, setIsLoadingProfile, open, setOpen, loggedInUser, setLoggedInUser}}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route index element={<Feed />} />
          </Route>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route path='feed' element={<Feed />} />
            <Route path='explore' element={<Explore />} />
            <Route path='bookmarks' element={<Bookmarks />} />
            <Route path='lists' element={<Lists />} />
            <Route path='messages' element={<Messages />} />
            <Route path='more' element={<More />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='profile' element={<Profile />} />
          </Route>
            
          
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/page-loading' element={<PageLoading />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
