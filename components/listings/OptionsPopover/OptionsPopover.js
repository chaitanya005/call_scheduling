import SmallPause from '../../../public/images/SmallPause.svg';
import SmallEye from '../../../public/images/SmallEye.svg';
import SmallEdit from '../../../public/images/SmallEdit.svg';
import SmallLink from '../../../public/images/SmallLink.svg';
import api from '../../../lib/api';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import styles from './styles.module.sass';

export default function Options({id, isVisibleOnProfile, isActive, updater, listing}) {
  const [visible, setVisible] = useState(isVisibleOnProfile);
  const [active, setActive] = useState(isActive);
  const [user, setUser] = useState('')
  const [userId, setUserId] = useState('')
  const router = useRouter();
  function visibilityCheckboxHandler(e) {
    setVisible(e.target.checked);
    const data = {
      id: id,
      serviceType: listing.serviceType, 
      isVisibleOnProfile: e.target.checked,
    };
    // console.log(data)
    api.updateListing(data);
    updater('isVisibleOnProfile', e.target.checked);
  }

  function activeCheckboxHandler(e) {
    setActive(e.target.checked);
    const data = {
      id: id,
      serviceType: listing.serviceType,
      isActive: e.target.checked,
    };
    console.log(data)
    api.updateListing(data);
    updater('isActive', e.target.checked);
  }
  // console.log(isActive)

  function handleEdit(e) {
    router.push({ 
      pathname: '/user/createNewListing',
      query: { listingId: id}
    })
  }

  function handleCopyLink(e) {
    const link = 'http://localhost:3001/listings/'+ id + `?seristo_userId=${userId}&seristo_user=${user}`;
    navigator.clipboard.writeText(link);
    alert('Link Copied: ' + link);
  }

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      let data = JSON.parse(localStorage.getItem('userInfo'))
      // console.log(data)
      setUserId(data.userId)
      let userName = data.firstName +  ' ' + data.lastName
      setUser(userName)
    }
  }, [])

  // console.log(user, userId)
  // console.log(listing)

  return (
    <div className={styles.outermost} onClick={(e) => e.stopPropagation()}>
      <div className={styles.row} onClick={handleEdit}>
        <SmallEdit /> Edit
      </div>
      <div className={styles.row} onClick={handleCopyLink}>
        <SmallLink /> Copy Link
      </div>
      <div className={styles.row}>
        <SmallEye /> Visible on Profile
        <span>
          <input type='checkbox' checked={visible} className={styles.checkbox}
            onChange={visibilityCheckboxHandler}/>
        </span>
      </div>
      <div className={`${styles.row} ${styles.rowLast}`}>
        <SmallPause />  Set to Active
        <span>
          <input type='checkbox' checked={active} className={styles.checkbox}
            onChange={activeCheckboxHandler}/>
        </span>
      </div>
    </div>
  );
}
