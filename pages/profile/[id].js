import {useRouter} from 'next/router';
import api from '../../lib/api';
import {useState, useEffect} from 'react';
import styles from './styles.module.sass';

export default function profilePage() {
  const router = useRouter();
  const id = router.query.id;
  const [profile, setProfile] = useState();
  useEffect(() => {
    api.getPofile(id)
        .then((res) => {
          setProfile(res.data.profile);
          console.log(res.data.profile);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return (
    <div className={styles.outermost}>
      {profile!==undefined ? JSON.stringify(profile) : null}
    </div>
  );
}


