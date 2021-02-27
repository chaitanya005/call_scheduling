import React from 'react'
import PayoutDashboard from '../../components/Admin/payoutDashboard/payoutDashboard'
import SideBar from '../../components/user/sideNavSection';

const AdminDashboard = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'row',
        backgroundColor: '#2242A4',
        width: '100vw', height: '100vh'}}>
        <SideBar screen='admin' selectedButtonName = "adminPayout"/>
          <div style={{flex: 5.5}}>
            <PayoutDashboard />
          </div>
        </div>
    )
}

export default AdminDashboard