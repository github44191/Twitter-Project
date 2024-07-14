import React, { useContext } from 'react'
import './../page.css'
import MainPage from './MainPage/MainPage'
import { UserContext } from '../../App';

const Profile = () => {

  const { user} = useContext(UserContext);

  return (
    <div className="profilePage">
      <MainPage user={user} />
    </div>
  )
}

export default Profile