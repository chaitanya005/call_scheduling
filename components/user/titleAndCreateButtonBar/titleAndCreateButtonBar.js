import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import styles from './styles.module.sass';

export default function TitleAndNewListingBar() {
  return (
    <div className={styles.actionBar}>
      <Typography variant='h1'>
        Your Events
      </Typography>

      <Link href='/user/createNewListing' passHref>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
        >
          Create New Event
        </Button>
      </Link>
    </div>
  );
}

