import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from "axios";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './EditProfile.css';
import { useState } from 'react';
import { UserContext } from '../../../App';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 8,
};

function EditChild({ dob, setDob }) {
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className='birthdate-section' onClick={handleOpen}>
        <button className='edit-title'>Edit</button>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 300 }}>
          <div className='text'>
            <h2>Edit date of birth?</h2>
            <p>This can only be changed a few times.<br />
              Make sure you enter the age of the <br />
              person using the account. </p>
            {/* <Button className='e-button'>Edit</Button> */}
            <input
              type="date"
              onChange={e => setDob(e.target.value)}
            />
            <Button className='e-button' onClick={() => { setOpen(false); }}>Close</Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}


function EditProfile({ user, loggedInUser, fetchUserData }) {

  const { displayName, setDisplayName, bio, setBio, location, setLocation,
   website, setWebsite, open, setOpen, dob, setDob} = useContext(UserContext);

  const handleSave = async () => {
    const editedInfo = {
      displayName:displayName ? displayName : loggedInUser?.displayName ,
      bio: bio ? bio : loggedInUser?.bio,
      location: location ? location : loggedInUser?.location,
      website: website ? website : loggedInUser?.website,
      dob: dob ? dob : loggedInUser?.dob
    }
    if (editedInfo) {
      await axios.patch(`https://twitter-project-354k.onrender.com/userUpdates/${user?.email}`, editedInfo)
      .then(fetchUserData);
      setOpen(false)
    }
  }

  return (
    <div >
      <button onClick={() => { setOpen(true) }} className="Edit-profile-btn" >Edit profile</button>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <div className='header'>
            <IconButton onClick={() => { setOpen(false); }} ><CloseIcon /></IconButton>
            <h2 className='header-title'> Edit Profile</h2>
            <button className='save-btn' onClick={handleSave}>Save</button>
          </div>
          <form className='fill-content'>
            <TextField className='text-field' fullWidth label="Name" id="fullWidth" variant='filled' onChange={(e) => setDisplayName(e.target.value)} defaultValue={loggedInUser[0]?.displayName ? loggedInUser[0].displayName : ''} />
            <TextField className='text-field' fullWidth label="Bio" id="fullWidth" variant='filled' onChange={(e) => setBio(e.target.value)} defaultValue={ loggedInUser[0]?.bio ? loggedInUser[0].bio : ''} />
            <TextField className='text-field' fullWidth label="Location" id="fullWidth" variant='filled' onChange={(e) => setLocation(e.target.value)} defaultValue={loggedInUser[0]?.location ? loggedInUser[0].location : ''} />
            <TextField className='text-field' fullWidth label="Website" id="fullWidth" variant='filled' onChange={(e) => setWebsite(e.target.value)} defaultValue={loggedInUser[0]?.website ? loggedInUser[0].website : ''} />
          </form>
          
          <div className='birthdate-section'>
            <p><strong>D.O.B</strong></p>
            <p>:</p>
            {
              loggedInUser[0]?.dob ?
                <p>{loggedInUser[0].dob}</p> :
                <p>
                  {
                    dob?dob:'Add your Date of birth'
                  }
                </p>
            }
            <EditChild dob={dob} setDob={setDob} />
          </div>
          <div className='last-section'>
            
            <div className='last-btn'>
              <h2>Switch to professional </h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default EditProfile;
