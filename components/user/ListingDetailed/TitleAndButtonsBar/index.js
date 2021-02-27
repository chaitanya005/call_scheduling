import Typography from '@material-ui/core/Typography';
import styles from './styles.module.sass';
import {useState} from 'react';
import EditIcon from '../../../../public/images/EditIcon.svg';
import PreviewIcon from '../../../../public/images/preview.svg';
import {useRouter} from 'next/router'

export default function ButtonsBar({heading='heading',
  onClickPreview, onClickEdit, onClickViewOption, toggleHandler, id}) {
  const [state, setState] = useState({
    bookings: 'unselectedButton',
    details: 'selectedButton',
  });
  function clickHandler(which) {
    if (which==='bookings') {
      setState({
        bookings: 'selectedButton',
        details: 'unselectedButton',
      });
    } else {
      setState({
        bookings: 'unselectedButton',
        details: 'selectedButton',
      });
    }
    toggleHandler(which);
  }
  const router = useRouter()

  const editListing = () => {
    // console.log(id)
    router.push({ 
      pathname: '/user/createNewListing',
      query: { listingId: id}
    })
  }
  

  return (
    <div className={styles.actionBar}>
      <div className={styles.leftPart}>
        <div className={styles.heading}>{heading}</div>
        {/* <button onClick={() => clickHandler('bookings')}
          className={styles[state.bookings]}>Bookings</button> */}
        <button onClick={() => clickHandler('details')}
          className={styles[state.details]}>Details</button>
      </div>
      <div>
        {/* <button className={styles.actionButton}>
          <PreviewIcon />Preview // todo
        </button> */}
        <button className={styles.actionButton} onClick = {editListing}>
          <EditIcon />Edit
        </button>
      </div>
    </div>
  );
};
