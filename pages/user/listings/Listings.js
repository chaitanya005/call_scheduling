import ListingsContainer from
  '../../../components/user/listings&OptContainer.js';
import SideNavSection from '../../../components/user/sideNavSection';
import {useState, useEffect, Component} from 'react';
import ListingBookingsAndDetailsPage from
  '../../../components/user/ListingDetailed';
import styles from './styles.module.sass';
// import { signin, signout, useSession, getSession } from 'next-auth/client';
import Login from '../../../components/user/Login/Login'
import { useRouter, withRouter } from 'next/router'
import { Link } from 'next/link'
import api from '../../../lib/api'
import moment from 'moment'
import momentTimezoneWithData from '../../../lib/moment-timezone-with-data.js';

function listingsPage(props) {
  // const [session, loading] = useSession();
  const [page, setPage] = useState(<ListingsContainer
    listingClickHandler={listingClickHandler}/>);
  // const [togglePage, setTogglePage] = useState(false)
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [timeZone, setTimeZone] = useState(null)

  function listingClickHandler(listing) {
    setPage(<React.Fragment><ListingBookingsAndDetailsPage listing={listing} /></React.Fragment>);
  }

  let currPage = ''


    const fetchingData = async () => {
      await fetch(process.env.BACKEND_URL + '/users/isLogin', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          authenticationId: router.query.user,
          email: ""
        })
      })
      .then(res => res.json())
      .then(async (val) => {
        console.log(val)
        const userDetails = val.userInfoObject
        await localStorage.setItem('userInfo', JSON.stringify(userDetails))
        localStorage.setItem('accessToken', val.access_token)
        setIsLoggedIn(true)
      })
      .catch(err => {
        // console.log(err)
      })
    }

    useEffect(() => {
      if (router.query.user !== undefined) {
        fetchingData()
        /* fetchData.json()
          .then(async (val) => {
            console.log(val)
            const userDetails = val.userInfoObject
            const varibale = await localStorage.setItem('userInfo', JSON.stringify(userDetails))
            localStorage.setItem('accessToken', val.access_token)
            setIsLoggedIn(true)
          })
          .catch(err => {
            // console.log(err)
          }) */
      }
    }, [router.query.user])

  
    useEffect(() => {
      const date = new Date()
      const { 1: tz } = new Date(date).toString().match(/\((.+)\)/);
      
      // In Chrome browser, new Date().toString() is
      // "Thu Aug 06 2020 16:21:38 GMT+0530 (India Standard Time)"
    
      // In Safari browser, new Date().toString() is
      // "Thu Aug 06 2020 16:24:03 GMT+0530 (IST)"
  
      // console.log(timeZones)
    
      if (tz.includes(" ")) {
        setTimeZone(tz)
        console.log(tz)

        return;
      } else {
        setTimeZone(tz)
        console.log(tz)
        return tz;
      }


     
    }, [])



  return (
    <div>
    <div className={styles.outerMost}>
        <SideNavSection selectedButtonName='listings'/> 
          {page}
      </div>
    </div>
    
  );
};




export default withRouter(listingsPage);
