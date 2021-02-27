import styles from './styles.module.sass';
import {useState, useEffect} from 'react';
import TitleAndButtonsBar from './TitleAndButtonsBar';
import AppBar from '../AppBar';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Details from './Details';
import Bookings from './BookingsSection';
import {useRouter} from 'next/router'
// import {useSession} from 'next-auth/client'
import axios from 'axios'
import { useSWRInfinite } from 'swr';

export default function ListingDetailsAndBookings({listing, 
  toggleHandler, userDetails}) {
  const [state, setState] = useState(<Details listing={listing}/>);
  const [userId, setUserId] = useState(null)
  // const [session ] = useSession()
  
  function toggleHandler(which) {
    if (which==='details') {
      setState(<Details listing={listing}/>);
    } else {
      setState(<Bookings />);
    }
  }

  useEffect(() => {
    setState(<Details listing = {listing} />)
  }, [listing.length !== 0])

  /* const email = session.user.email
  const name = session.user.name
  const img = session.user.image
  const socialLogin = {
    method: 'post',
    url: 'http://localhost:3000/users/socialLogin',
  }

  const router = useRouter()

  useEffect(() => {
    axios(Object.assign({}, socialLogin, { data: { email: email, userName: name, image: img } }))
    .then(res => getUserId(res))
    .catch((err) => console.log(err))
  }, [])

  function getUserId (response) {
    if (response.data.data.user) {
      setUserId(response.data.data.user.id)
      // console.log(response.data.data.user)
      return true
    }else if (response.data.data.userResult) {
      setUserId(response.data.data.userResult.id)
      // console.log(response.data.data.userResult)
      return true
    }
    return false
  }

  console.log(userId) */

  return (
      <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px'}}
      variant='outlined'>
        <AppBar userDetails = {userDetails} />

        <Divider />

        <TitleAndButtonsBar heading={listing.name} id = {listing.id} toggleHandler={toggleHandler}/>

        <Divider />

        {state}
      </Paper>      
  );
};
