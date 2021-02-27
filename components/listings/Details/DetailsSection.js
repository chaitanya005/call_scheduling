import ImageSection from './ImagesSection';
import ListingInfoColumn from './ListingInfoColumn';
import Stars from './Stars';
import styles from './styles.module.sass';
import {useRouter} from 'next/router'

export default function DetailsSection({listing, isAdvisorSide, advImg}) {
  const router = useRouter()
  // console.log(router.query.seristo_userId)
  // console.log(router.query.seristo_user)
  
  return (
    <React.Fragment>
      <div>
        <div className={isAdvisorSide? styles.outermostBox : styles.outermostBoxCustomerSide}>
          <ImageSection image={listing.coverImage} />
          <div className={styles.title}>{listing.name}</div>
          <div style = {{display: 'flex'}} className={styles.advDiv} >
            <div className = {styles.advBy}>By</div>
            <div className = {styles.advImg}><img src = {advImg} className={styles.img} /></div>
            <div className={styles.advName} ><a href= {`http://localhost:3001/user/profile?id=${router.query.seristo_userId}&seristo_user=${router.query.seristo_user}`} className={styles.advLink} >{router.query.seristo_user}</a></div>
          </div>

          {/* {!isAdvisorSide ?
            <div className={styles.userRow}>By </div> :
            null
          } */}

          {/* <div className={styles.reviewRow}>
            <Stars rating={listing.avgRating} />
            {listing.totalReviews ? 
            <div className={styles.xReviews}>({listing.totalReviews} Reviews)</div>
            : <div className={styles.xReviews}>(No Reviews yet)</div> }
          </div> */}

          {/*   */}
          <div className={styles.textAndColumn}>
            <div className={styles.description} dangerouslySetInnerHTML={{__html: listing.description}}></div>
            <br />
            <ListingInfoColumn listing={listing} isAdvisorSide={isAdvisorSide} userId = {router.query.seristo_userId} userName = {router.query.seristo_user} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

