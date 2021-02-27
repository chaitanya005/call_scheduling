import SideBar from '../../components/user/sideNavSection';
import Payout from '../../components/user/Settings/Payout'
// import { signin, signout, useSession } from 'next-auth/client';
import Login from '../../components/user/Login/Login'
import {useEffect, useState} from 'react'
import axios from 'axios'

const SettingsPage = () => {
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      var data = JSON.parse(localStorage.getItem('userInfo'))
      setUserId(data.userId)
    } else {
      router.push('/')
    }
  }, [])

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'row',
        backgroundColor: '#2242A4',
        width: '100vw', height: '100vh'}}>
        <SideBar  selectedButtonName='payout' />
        <div style={{flex: 5.5}}>
          <Payout userId = {userId} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
