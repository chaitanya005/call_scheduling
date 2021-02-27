import {useRouter} from 'next/router';
import ListingDetails from '../../components/listings/Details';
import api from '../../lib/api';
import {useState, useEffect} from 'react';
import styles from './styles.module.sass';
// import CustomerView from '../component/listing'

export default function listing() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [advImg, setAdvImg] = useState('')
  const [flag, setFlag] = useState(0)
  const id = router.query.id;
  const userId = router.query.seristo_userId

  useEffect(() => {
    api.getListingForAdvisor(userId).then(
        (response) => {
          // console.log(response)
          updateListings(response.data.data.anotherTask);
          setAdvImg(response.data.data.advisorProfile)
        },
    ).catch(
        (error) => {
          // alert('There was an error fetching some listings. '+error.toString());
        },
    );

  }, [userId]);


  function updateListings(data) { // adds data to listings state
    setListings(data);
  }



  //TODO
  let notFound = ''
  
  function noListing() {
    setFlag(flag + 1)
    if (flag == listings.length) {
      notFound = ( <div>No Listings Found</div> )
    }
  }


  return (
    <div className={styles.outermost}>
      {listings && listings.map(list => (
        <div>
          {list.id == id ? 
            <div>
            <ListingDetails listing = {list} advImg = {advImg} />
            </div>  
          : 
            ''
          }
        </div>
      ))}

      
      
    </div>
  );
}


