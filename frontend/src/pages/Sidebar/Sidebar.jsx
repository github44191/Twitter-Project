import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarOptions from "./SidebarOptions";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from '@mui/material/Divider';
import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CustomeLink from "./CustomeLink";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";


function Sidebar({ handleLogout, user }) {

  const email = user?.email;
  const fetchUserData = () => {
    fetch(`https://twitter-project-1-axzc.onrender.com/loggedInUser?email=${email}`)
        .then(res => res.json())
        .then(data => {
            setLoggedInUser(data)
        });
}
  useEffect(() => {
    fetchUserData();
  },[])
  const [anchorEl, setAnchorEl] = useState(false);
  const openMenu = Boolean(anchorEl);
  const {loggedInUser, setLoggedInUser} = useContext(UserContext);
  const navigate = useNavigate();
 
  const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  const result = user?.email.split('@')[0];

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    //console.log(e.currentTarget);
  };
  const handleClose = () => {
    // console.log(user);
    setAnchorEl(null);
  };
  return (

    <div className="sidebar">
      <TwitterIcon className="sidebar_twitterIcon" />
      <CustomeLink to='/home/feed'>
        <SidebarOptions active Icon={HomeIcon} text="Home" />
      </CustomeLink>
      <CustomeLink to='/home/explore'>
        <SidebarOptions Icon={SearchIcon} text="Explore" />
      </CustomeLink>
      <CustomeLink to='/home/notifications'>
        <SidebarOptions Icon={NotificationsNoneIcon} text="Notifications" />
      </CustomeLink>
      <CustomeLink to='/home/messages'>
        <SidebarOptions Icon={MailOutlineIcon} text="Messages" />
      </CustomeLink>
      <CustomeLink to='/home/bookmarks'>
        <SidebarOptions Icon={BookmarkBorderIcon} text="Bookmarks" />
      </CustomeLink>
      <CustomeLink to='/home/lists'>
        <SidebarOptions Icon={ListAltIcon} text="Lists" />
      </CustomeLink>
      <CustomeLink to='/home/profile'>
        <SidebarOptions Icon={PermIdentityIcon} text="Profile" />
      </CustomeLink>
      <CustomeLink to='/home/more'>
        <SidebarOptions Icon={MoreIcon} text="More" />
      </CustomeLink>
      <Button variant='outlined' className='sidebar_tweet'>
        Tweet
      </Button>

      <div className="Profile_info">
        <Avatar src={userProfilePic}/>
        <div className="user_info subUser_info">
          <div className="userDiv">
            <h4>{loggedInUser[0]?.displayName ? loggedInUser[0].displayName : user && user.displayName}</h4>
            <h5>@{result}</h5>
          </div>
        </div>
          <IconButton
            size='small'
            sx={{ml: 2 }}
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={openMenu ? 'basic-menu' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu id='basic-menu' anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
            <MenuItem className='Profile__info1'  onClick={() => {
              navigate('/home/profile');
              handleClose();
            }}>
              <Avatar src={userProfilePic}/>
              <div className="user_info subUser_info">
                <div className="userDiv">
                  <h4>{loggedInUser[0]?.displayName ? loggedInUser[0].displayName : user && user.displayName}</h4>
                  <h5>@{result}</h5>
                </div>
                <ListItemIcon className='done_icon'>
                  <DoneIcon />
                </ListItemIcon>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem>
              Add an existing account
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout @{result}</MenuItem>
          </Menu>


      </div>
    </div>
  )
}

export default Sidebar