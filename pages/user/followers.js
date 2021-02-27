import SideBar from '../../components/user/sideNavSection';
// import { signin, signout, useSession } from 'next-auth/client';
import Login from '../../components/user/Login/Login'
import Followers from '../../components/user/Followers/Followers'

const SettingsPage = () => {
  // const [session, loading] = useSession();

  return (
    <div>

      <div style={{display: 'flex', flexDirection: 'row',
        backgroundColor: '#2242A4',
        width: '100vw', height: '100vh'}}>
        <SideBar selectedButtonName='followers' />
        <div style={{flex: 5.5}}>
          <Followers />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
