import SideBar from '../../components/user/sideNavSection';
// import Dashboard from '../../components/user/Dashboard/Dashboard'
// import { signin, signout, useSession, getSession } from 'next-auth/client';
import Login from '../../components/user/Login/Login'   
import ProfileEdit from '../../components/user/EditProfile/editProfile'
import {useEffect, useState} from 'react'
import axios from 'axios'

const EditProfile = () => {


  return (
    <div>
        <div style={{display: 'flex', flexDirection: 'row',
        backgroundColor: '#2242A4',
        width: '100vw', height: '100vh'}}>
          <SideBar selectedButtonName='profile'/>
            <div style={{flex: 5.5, margin: '20px'}}>
              <ProfileEdit  />
            </div>
        </div>
    </div>
  );
};

export default EditProfile;
