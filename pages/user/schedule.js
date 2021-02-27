import SideBar from '../../components/user/sideNavSection';
import Schedule from '../../components/user/Schedule/Schedule'
// import { signin, signout, useSession } from 'next-auth/client';
import Login from '../../components/user/Login/Login'
import {useState, useEffect} from 'react'
import api from '../../lib/api'
import axios from 'axios'
import { useRouter } from 'next/router'

const SchedulesPage = () => {
  // const [session, loading] = useSession();
  const [listings, setListings] = useState([]);
  // const [type2Listings, setType2Listings] = useState([]);
  // const [type3Listings, setType3Listings] = useState([]);
  // const [type4Listings, setType4Listings] = useState([]);
  // const [type5Listings, setType5Listings] = useState([]);
  // const [userId, setUserId] = useState(null)

  // const socialLogin = {
  //   method: 'post',
  //   url: 'http://localhost:3000/users/socialLogin',
  // }
  

  // let email, name, img, page


  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      var data = JSON.parse(localStorage.getItem('userInfo'))
    } else {
      router.push('/')
    }
  }, [])

  

  // function updateListings(data) { // adds data to listings state
  //   setListings(data);
  // }

  /* if (session) {
    email = session.user.email
    name = session.user.name
    img = session.user.image
    page = (
      <div>
        <div style={{display: 'flex', flexDirection: 'row',
        backgroundColor: '#2242A4',
        width: '100vw', height: '100vh'}}>
          <SideBar selectedButtonName='schedule'/>
          <div style={{flex: 5.5}}>
            <Schedule  />
          </div>
        </div>
      </div>
    )
  } */


  function updateListings(data) { // adds data to listings state
    const newListings = listings;
    for (let i=0; i<data.length; i++) {
      newListings.push(data[i]);
    }
    setListings(newListings);
  }

  

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'row',
      backgroundColor: '#2242A4',
      width: '100vw', height: '100vh'}}>
        <SideBar selectedButtonName='schedule'/>
        <div style={{flex: 5.5}}>
          <Schedule  />
        </div>
      </div>
    </div>
  );
};

export default SchedulesPage;


// {!session  ? 
//       <div style={{display: 'flex', flexDirection: 'row',
//           backgroundColor: '#2242A4',
//           width: '100vw', height: '100vh'}}>
//           <div style={{flex: 5.5}}>
//               <Login />
//           </div>
//         </div>
//     : }