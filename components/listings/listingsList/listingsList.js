import ListingRow from './../listingRow';
import Typography from '@material-ui/core/Typography';
import styles from './styles.module.sass';
export default function ListingsList({listings, rowClickHandler}) {
  if (listings==='error') {
    return <div>error</div>;
  }
  const timeBoundListings = [];
  const projectListings = [];
  const membershipListings = [];
  const oneTimeListings = [];
  // to fill these arrays with respective listings
  for (const listing of listings) {
    if (listing.serviceType===2) {
      timeBoundListings.push(listing);
    } else if (listing.serviceType===3) {
      oneTimeListings.push(listing);
    } else if (listing.serviceType===4) {
      projectListings.push(listing);
    } else if (listing.serviceType===5) {
      membershipListings.push(listing);
    }
  }
  console.log(listings);
  // to change each arrays' elements to <ListingRow /> elements
  const timeBoundItems = timeBoundListings.map((listing) => (
    <ListingRow rowClickHandler={rowClickHandler} listing={listing}
      key={listing.id}/>
  ));
  const projectItems = projectListings.map((listing) => (
    <ListingRow rowClickHandler={rowClickHandler} listing={listing}
      key={listing.id}/>
  ));
  const oneTimeItems = oneTimeListings.map((listing) => (
    <ListingRow rowClickHandler={rowClickHandler} listing={listing}
      key={listing.id}/>
  ));
  const membershipItems = membershipListings.map((listing) => (
    <ListingRow rowClickHandler={rowClickHandler} listing={listing}
      key={listing.id}/>
  ));

  return (
    <div className={styles.container}>
      {/* <div>
        <Typography variant='h3'>Time Bound Event</Typography>
        {timeBoundItems}
      </div> */}
      <div>
        <Typography variant='h3'>One Time Event</Typography>
        {oneTimeItems}
      </div>
      {/* <div>
        <Typography variant='h3'>Project Based Service</Typography>
        {projectItems}
      </div>
      <div>
        <Typography variant='h3'>Membership</Typography>
        {membershipItems}
      </div> */}
    </div>
  );
}
