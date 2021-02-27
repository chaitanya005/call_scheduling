import SideBar from '../../components/user/sideNavSection';
import Settings from '../../components/user/Settings/Settings'
// import { signin, signout, useSession } from 'next-auth/client';
import Login from '../../components/user/Login/Login'
import {useEffect, useState} from 'react'

const SettingsPage = () => {
  // const [session, loading] = useSession();

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
        <SideBar screen = "settings"  selectedButtonName='settings' />
        <div style={{flex: 5.5}}>
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
