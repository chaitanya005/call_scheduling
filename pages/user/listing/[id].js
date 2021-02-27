import SideBar from '../../../components/user/sideNavSection';
// import Login from '../../components/user/Login/Login'
import ListingBookingsAndDetailsPage from
  '../../../components/user/ListingDetailed'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import api from '../../../lib/api'

const ListingDetail = () => {
    const router = useRouter()
    const [listing, setListing] = useState([])
    const [isLoggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userInfo')){
            const data = JSON.parse(localStorage.getItem('userInfo'))
            // console.log(router.query.id, data.userId)
            setLoggedIn(true)
            api.getListingForAdvisor(data.userId)
                .then(res => {
                  console.log(res.data)
                  getListing(res.data.data)
                })
                .catch(err => console.log(err))
        }else {
            router.push('/')
        }
    }, [router.query.id])

    const getListing = (listings) => {
        for (let listing of listings) {
            if (listing.id == router.query.id) {
                setListing(listing)
            }
        }
    }

  return (
    <div>
    {isLoggedIn ?
        <div style={{display: 'flex', flexDirection: 'row',
        backgroundColor: '#2242A4',
        width: '100vw', height: '100vh'}}>
          <SideBar />
            <div style={{flex: 5.5, margin: '20px'}}>
              <ListingBookingsAndDetailsPage  tailsPage listing = {listing} />
            </div>
        </div>
    : ''}
    </div>
  );
};

export default ListingDetail;
