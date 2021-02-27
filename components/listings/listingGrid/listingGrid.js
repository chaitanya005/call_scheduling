import Grid from '@material-ui/core/Grid';
import ListingCard from '../ListingCard';
import styles from './styles.module.sass';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react'
import api from '../../../lib/api'
// import {useSession} from 'next-auth/client'

export default function ListingsGrid({listings, cardClickHandler, name, seristoUserId}) {
  const router = useRouter()
  if (listings==='error') {
    return <div>error</div>;
  }

  const date = new Date()
 /*  console.log(date) */
  const d1 = new Date('2013-08-02T10:09:08Z')
  var diff = date - d1
 
  const events = listings.anotherTask

  return (
    <div>
    {router.pathname !== '/user/editprofile' && router.pathname !== '/user/profile' ?
    <div className={styles.container}>
      <Grid container spacing={1}>
        {events && events.map((listing) => (
          <Grid item xs={12} sm={6} md={4}
            key={listing.id}>
            <ListingCard listing={listing} onClickHandler={cardClickHandler} userId = {seristoUserId} userName = {name} />
          </Grid>
        ))}
      </Grid>
    </div>
    : 
      <Grid container spacing={1} style = {{width: '100%'}}>
          {listings.map((listing) => (
            <React.Fragment key={listing.id}>
              <IsExpired 
                time = {listing.endTime} 
                listingDate = {listing.date} 
                listing = {listing}
                userId = {seristoUserId}
                userName = {name}
              />
            </React.Fragment>
          ))}
      </Grid>     
  }
     
    </div>
  );
}

function IsExpired({time, listingDate, listing, userId, userName}){


  var endTime = listing.endTime.split('T')[1]
  var date = listing.date.split('T')[0]
  var endDate = date + 'T' + endTime

  useEffect(() => {
    const date = new Date()
  
    if (Date.parse(date) > Date.parse(endDate)) {
      const data = {
        id: listing.id,
        serviceType: listing.serviceType,
        isActive: false
      }
      api.updateListing(data)
        .then(res => {
          // console.log(res)
        })
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <React.Fragment>
      {listing.isActive && 
        <Grid item xs={12} sm={6} md={4}
        key={listing.id}>
        <ListingCard listing={listing} userId = {userId} userName = {userName} />
      </Grid>
      }
    </React.Fragment>
  )
}
