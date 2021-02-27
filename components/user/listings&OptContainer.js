import Listings from '../listings';
import TopBar from './AppBar/AppBar';
import ButtonsBar from './formatButtonsBar';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {useState, useEffect} from 'react';
import TitleAndCreateNewBar from
  './titleAndCreateButtonBar/titleAndCreateButtonBar';
import api from '../../lib/api';
// import {useSession} from 'next-auth/client'
import ListingCard from '../listings/ListingCard'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import styles from './sideNavSection.module.sass';
import { TrainOutlined } from '@material-ui/icons';
import { useRouter } from 'next/router'


// fetches all kinds of listing and stores them in separate arrays
export default function ListingsContainer({listingClickHandler}) {
  const [listingsFormat, setListingsFormat] = useState('blocks');
  const [listings, setListings] = useState([]);
  const [type2Listings, setType2Listings] = useState([]);
  const [type3Listings, setType3Listings] = useState([]);
  const [type4Listings, setType4Listings] = useState([]);
  const [type5Listings, setType5Listings] = useState([]);
  const [userId, setUserId] = useState(null)
  const router = useRouter()

  // const [session ] = useSession({
  //   email: "admin@gmail.com",
  //   name: "chai",
  //   image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Cat_img.jpg"
  // })
 
  // const email = session.email
  // const name = session.name
  // const img = session.image
  // const socialLogin = {
  //   method: 'post',
  //   url: 'http://localhost:3000/users/socialLogin',
  // }

  
  // useEffect(() => {
  //   axios(Object.assign({}, socialLogin, { data: { email: email, userName: name, image: img } }))
  //   .then(res => getUserId(res))
  //   .catch((err) => console.log(err))
  // }, []);

  

  

  // function getUserId (response) {
  //   if (response.data.data.user) {
  //       setUserId(response.data.data.user.id)
  //     // console.log(response.data.data.user)
  //       api.getListingForAdvisor(response.data.data.user.id)
  //       .then(
  //         (response) => (
  //           updateListings(response.data.data)
  //         )
  //       ).catch(err => console.log(err))
      
  //     return true
  //   }
  //   else if (response.data.data.userResult) {
  //       setUserId(response.data.data.userResult.id)
        // api.getListingForAdvisor(3)
        // .then(
        //   (response) => {
        //     let data = response.data.data
        //     // console.log(data)
        //     updateListings(data)
        //   }
        // ).catch(err => console.log(err))
  //         return true
  //   }
  //   return false
  // }


  useEffect(() => {

    if (localStorage.getItem('userInfo')) {
      var data = JSON.parse(localStorage.getItem('userInfo'))
      setUserId(data.userId)
      api.getListingForAdvisor(data.userId)
      .then(
        (response) => {
          let data = response.data.data
          // console.log(data)
          updateListings(data)
        }
      ).catch(err => console.log(err))
    } else {
      router.push('/')
    }
  }, [userId])

  

  // console.log(userId)

 

  function updateListings(data) { // adds data to listings state
    setListings(data);
  }
  // console.log(listings)

  function filteringHandler(type) {
    // setType(true)
    if (type==='all') {
      api.getListingForAdvisor(userId)
        .then(
          (response) => {
            let data = response.data.data
            updateListings(data)
          }
        ).catch(err => console.log(err))
    } else if (type==='timeBound') {
      api.getListings(userId, 2)
        .then(
          (response) => (
            setListings(response.data.data)
          )
        )
    } else if (type==='oneTime') {
      setListings(type3Listings);
      api.getListings(userId, 3)
        .then(
          (response) => (
            setListings(response.data.data)
          )
        )
    } else if (type==='project') {
      setListings(type4Listings);
      api.getListings(userId, 4)
        .then(
          (response) => (
            setListings(response.data.data)
          )
        )
    } else {
      setListings(type5Listings);
      api.getListings(userId, 5)
        .then(
          (response) => (
            setListings(response.data.data)
          )
        )
    }
  };

  function formattingHandler(format) {
    setListingsFormat(format);
  };

  return (
    <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px'}}
      variant='outlined'>

      <TopBar />

      <Divider />

      <TitleAndCreateNewBar />

      <Divider />

      <ButtonsBar filteringHandler={filteringHandler}
        formattingHandler={formattingHandler}/> 
        
      <Listings listings={listings}
        format={listingsFormat} listingClickHandler={listingClickHandler} userId = {userId} />
    </Paper>
  );
};
