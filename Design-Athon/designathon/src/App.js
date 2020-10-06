import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Input, Grid } from '@material-ui/core'
import Post from './Post'
import { db, auth } from './firebase'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import PostingJob from './PostingJob'

//modal styles

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

//modal styles

function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(null)

  //mapping each and every doc in firebase 
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])
  //mapping each and every doc in firebase

  //userAuthentication using firebase

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser)
      } else {
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username])


  const signIn = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
      setEmail('')
      setPassword('')
    setLogin(false)
  }

  const ProfileCreated = (e) => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch(error => alert(error.message));
    setUsername('')
    setPassword('')
    setEmail('')
    setOpen(false)
  }

  //userAuthentication using firebase

  //onclick modal open functions
  const signUpBtn = () => {
    setOpen(true)
  }

  const loginBtn = (e) => {
    setLogin(true)
  }
  //onclick modal open functions

  return (
    <div className="App">
      <div className="xyz">
        {/* Modals */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className='app_signup'>
              <center>
                <h2>Designathon</h2>
              </center>
              <Input
                placeholder='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
              <Input
                placeholder='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <Input
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              <Button type='submit' onClick={ProfileCreated}  >Sign Up</Button>
            </form>

          </div>
        </Modal>

        <Modal
          open={login}
          onClose={() => setLogin(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className='app_signup'>
              <center>
                <h2>Designathon</h2>
              </center>
              <Input
                placeholder='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <Input
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              <Button onClick={signIn} >Login</Button>
            </form>

          </div>
        </Modal>
        
        {/* navbar */}
        <header className="App-header">
          <h2>Designathon</h2>
        </header>
        {user ? (
          <div className='logOut'>
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </div>
        ) : (
            <div className='signUpMenu'>
              <Button onClick={signUpBtn}>Sign Up</Button>
              <Button onClick={loginBtn}>Login</Button>
            </div>
          )}
          {/* navbar */}

      </div>

      <div className='post_job'>
        {user?.displayName ? (
          <PostingJob username={user.displayName} />
        ) : (
            <span></span>
          )}
      </div>


      <div className='posts_container'>
        <Grid container >
          {
            posts.map(({ id, post }) => (
              <Post key={id} username={post.username} Category={post.Category} Location={post.Location} Skills={post.Skills} ApplyBy={post.ApplyBy} />
            ))
          }
        </Grid>
      </div>


    </div>
  );
}

export default App;
