import SideBar from '../../components/user/sideNavSection';
import Dashboard from '../../components/user/Dashboard/Dashboard'
// import { signin, signout, useSession } from 'next-auth/client';
import Login from '../../components/user/Login/Login'

const DashboardPage = () => {
  // const [session, loading] = useSession();

  // console.log(session.user)

  return (

    <div>
    <div style={{display: 'flex', flexDirection: 'row',
        backgroundColor: '#2242A4',
        width: '100vw', height: '100vh'}}>
      <SideBar selectedButtonName='dashboard'/>
      <div style={{flex: 5.5, margin: '20px'}}>
        <Dashboard />
      </div>
    </div>
    </div>
  );
};

export default DashboardPage;
