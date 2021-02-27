import React, {useState, useEffect} from 'react';
import styles from './styles.module.sass';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
// import {signin, signout, useSession} from 'next-auth/client';
import { useRouter } from 'next/router'

const TopBar2 = () => {
  // const [session, loading] = useSession();

  const [clicked, setClicked] = useState(false);
  // const [userInfo, setUserInfo] = useState([])
  const [userName, setUserName] = useState('')
  const [img, setImg] = useState('')

  const router = useRouter()

  const isClickHandler = () => {
    setClicked(!clicked);
  };

  //  let user, img
  /* if (session) {
    user = session.user.name
    img = session.user.image
  } */

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      var data = JSON.parse(localStorage.getItem('userInfo'))
      var userName = data.firstName + ' ' + data.lastName
      setUserName(userName)
      setImg(data.picture)
  } else {
      router.push('/')
  }
  }, [])


  const logout = () => {
    var userInfo = window.localStorage.userInfo
    console.log(JSON.parse(userInfo))
    userInfo = {}
    // window.localStorage.setItem('userInfo', JSON.parse(userInfo))
    window.localStorage.clear()
    setTimeout(() => {
      router.push('/')
    }, 2000);
    
  }

  

  

  return (
    <div className={styles.topBar}>

      {/* <input className = {styles.search} type = "text" placeholder = " Search..." /> */}


  
      <img className = {styles.profileImg} onClick = {isClickHandler} src = {img} />

      <div className = {styles.profileName} onClick = {isClickHandler} >{userName}</div>

      <div style ={{marginLeft: '0.5%'}}>
        <svg onClick = {isClickHandler} width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M0 0L5 5L10 0H0Z" fill="#ADB5BD"/>
        </svg>
      </div>


      <div style = {{display: 'flex'}}>
        <Fade in = {clicked}>
          <Paper className = {styles.dropDown} >
            {/* <div style = {{marginLeft: '10px'}}>
              <a href = "/user/settings" target = "_blank" style = {{textDecoration: 'none', color: '#000'}}>Manage Account</a>
            </div> */}
            
            
              <div className="signOutButton" style = {{marginLeft: '10px', cursor: 'pointer'}} onClick={logout} >Sign out</div>
          
          </Paper>
        </Fade>
      </div>
    </div>
  );
};

export default TopBar2;

