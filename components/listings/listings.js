import ListingsList from './listingsList';
import ListingsGrid from './listingGrid';
import {Loading} from '../loading&Error';

export default function Listings({listings, format, listingClickHandler, userId, userName}) {
  if (listings.anotherTask && listings.anotherTask.length===0) {
    return <div style={{padding: '10px'}}>
      {'You do not have any listing of this type. Click on '+
      '\'CREATE NEW LISTING\' ' +
    'to create one.'}
    </div>;
  } else if (listings && listings[0]==='loading') {
    return <Loading />;
  }

  if (format==='blocks') { // for block view
    return <ListingsGrid listings={listings}
      cardClickHandler={listingClickHandler} userId = {userId} name={userName} />;
  } else { // For list View
    return <ListingsList listings={listings}
      rowClickHandler={listingClickHandler} />;
  }
}


