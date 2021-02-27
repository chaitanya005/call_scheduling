import SideBar from '../../components/user/sideNavSection';
import BookingsTable from 
  '../../components/user/Bookings/BookingsTable/Bookingstable';
import {makeStyles} from '@material-ui/core/styles';
// import { signin, signout, useSession } from 'next-auth/client';
import Login from '../../components/user/Login/Login'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'


const useStyles = makeStyles({
  'root': {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#2242A4',
    width: '100vw',
    height: '100vh',
  },
});


const BookingsPage = () => {

  /* const [session, loading] = useSession();
  const [userId, setUserId] = useState(null)

  const socialLogin = {
    method: 'post',
    url: 'http://localhost:3000/users/socialLogin',
  }

  let email, name, img

  if (session) {
    email = session.user.email
    name = session.user.name
    img = session.user.image
    axios(Object.assign({}, socialLogin, { data: { email: email, userName: name, image: img } }))
      .then((res) => getUserId(res))
      .catch((err) => console.log(err))
  }

  
  function getUserId (response) {
    if (response.data.data.user) {
      setUserId(response.data.data.user.id)
      return true
    }else if (response.data.data.userResult) {
      setUserId(response.data.data.userResult.id)
      return true
    }
    return false
  } */

  // console.log(userId)

  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      var data = JSON.parse(localStorage.getItem('userInfo'))
    } else {
      router.push('/')
    }
  }, [])


  return (
      <div>
        <div style={{display: 'flex', flexDirection: 'row',
          backgroundColor: '#2242A4',
          width: '100vw', height: '100vh'}}>

          <SideBar selectedButtonName='bookings'/>
          <div style={{flex: 5.5}}>
            <BookingsTable  />
          </div>
        </div>
      </div>
  );
};

export default BookingsPage;
