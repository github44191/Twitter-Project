import React, { useContext } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Widgets from './Widgets/Widgets'
import'./../App.css'
import auth from '../firebase.init';
import { signOut } from 'firebase/auth'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../App'

export default function Home() {

  const {user} = useContext(UserContext);
  const handleLogout = () => {
    signOut(auth);
  }

  function lolog() {
    console.log(user);
  }

    return (
    <div className='app'>
      <Sidebar handleLogout={handleLogout} onClick={lolog} user={user} />
      <Outlet />
      <Widgets />
    </div>
    )
}

