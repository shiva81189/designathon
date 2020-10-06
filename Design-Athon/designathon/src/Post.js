import React, { useState } from 'react'
import { Button, Avatar, Grid,Input } from '@material-ui/core';
import './Post.css'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


function Post({username, Category, Location, Skills, ApplyBy }) {

    const [open, setOpen] = useState(false)
    const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

    const resumeUpload = () => {
        setOpen(true)
    }

    return (

        <Grid item xs={12} md={6} lg={4}>
            <div className='post'>

            <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className='app_signup'>
              <center>
                <h2>Designathon</h2>
                <h4>Upload Resume</h4>
              </center>
                <Input type='file' />
                <Button type='submit'>Apply</Button>
            </form>

          </div>
        </Modal>

                <div className='post_header'>
                    <Avatar className='post_avatar' alt={username} src="/static/images/avatar/1.jpg" />
                    <h3>{username}</h3>
                </div>

                <div className='post_details'>
                    <h3><strong>Category:</strong><span> {Category}</span></h3>
                    <h3><strong>Location:</strong><span> {Location}</span></h3>
                    <h3><strong>Skills:</strong><span> {Skills}</span> </h3>
                    <h3><strong>Apply By:</strong><span> {ApplyBy}</span></h3>
                </div>

                <center className='apply_btn'>
                    <Button variant="contained" color="primary" onClick={resumeUpload}>
                        Apply Now
                    </Button>
                </center>

            </div>
        </Grid>
    )
}

export default Post
