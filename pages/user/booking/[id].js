import SideBar from '../../../components/user/sideNavSection';
import BookingsHistory from '../../../components/user/Bookings/BookingsHistory/BookingsHistory';
import {makeStyles} from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import axios from 'axios'
import api from '../../../components/user/Bookings/BookingsTable/apiCore'
import React , {useState, useEffect } from 'react'
// import { signin, signout, useSession } from 'next-auth/client';
import Login from '../../../components/user/Login/Login'

const useStyles = makeStyles({
  'root': {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#2242A4',
    width: '100vw',
    height: '100vh',
  },

  'history': {
    overflow: 'auto',
    height: '400px'
  }
})

const HistoryPage = () => {

  const [bookings, setBookings] = useState([])
  const [events, setEvents] = useState([])
  const [paymentStatus, setPaymentStatus] = useState()
  // const [session, loading] = useSession();
  const [userId, setUserId] = useState(null)

  
    /* function getUserId (response) {
        if (response.data.data.user) {
          setUserId(response.data.data.user.id)
        }else if (response.data.data.userResult) {
          let id = response.data.data.userResult.id
          setUserId(id)
        }
    }

    const socialLogin = {
      method: 'post',
      url: 'http://localhost:3000/users/socialLogin',
    }
    
    let name, email, img
    if (session) {
      email = session.user.email
      name = session.user.name
      img = session.user.image
      axios(Object.assign({}, socialLogin, { data: { email: email, userName: name, image: img } }))
        .then(res => getUserId(res))
        .catch(err => console.log(err))
    } */


  useEffect(() => {

    if (localStorage.getItem('userInfo')) {
      var data = JSON.parse(localStorage.getItem('userInfo'))
      setUserId(data.userId)
      api.getBookings(data.userId)
      .then(res => {
          setBookings(res.data.data)
      })
      .catch(function (error) {
          console.log(error);
      })
    } else {
      router.push('/')
    }
  }, [])

  // console.log(bookings)

  
 const router = useRouter()
 const { id } = router.query

 const classes = useStyles()
  return (
    <div>
    <div className = {classes.root}>
      <SideBar />
      <div style={{flex: 5.5}}>
        <BookingsHistory id = {id} bookings = {bookings}  events = {events}/>
      </div>
    </div>
    </div>
    
  );
};

export default HistoryPage;

