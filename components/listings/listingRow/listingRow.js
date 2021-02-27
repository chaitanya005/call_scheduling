import Typography from '@material-ui/core/Typography';
import ThreeDotsImage from '../../../public/images/threeDots.svg';
import styles from './styles.module.sass';
import RedDot from '../../../public/images/RedDot.svg';
import GreenDot from '../../../public/images/GreenDot.svg';
import IconButton from '@material-ui/core/IconButton';
import currencyService from '../../../lib/currencyService';
import Popover from '@material-ui/core/Popover';
import OptionsPopover from '../OptionsPopover';
import {useState} from 'react';


const dollarChar = '\u0024';
const rupeeChar = '\u20B9';
export default function ListingRow({listing, rowClickHandler}) {
  console.log(listing);
  const [isVisibleOnProfile, setIsVisibleOnProfile] =
  useState(listing.isVisibleOnProfile);
  const [isActive, setIsActive] = useState(listing.isActive);
  let dot = <></>;
  if (listing.isActive===true) {
    dot = <GreenDot className={styles.dot}/>;
  } else {
    dot = <RedDot className={styles.dot}/>;
  }

  let currencySymbol = rupeeChar;
  if (currencyService.getDefaultCurrency()!=='rupee') {
    currencySymbol = dollarChar;
  }


  const [anchorEl, setAnchorEl] = useState(null);
  // options popover handling starts here
  const handleOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // options popover handling ends here

  function threeDotsUpdater(which, bool) {
    if (which==='isVisibleOnProfile') {
      setIsVisibleOnProfile(bool);
    } else {
      setIsActive(bool);
    }
  }
  return (
    <div onClick={() => rowClickHandler(listing)} className={styles.div}>

      <Typography variant="h5" component="h2">
        {dot}{listing.name}
      </Typography>
      <div className={styles.priceTag}>
        <Typography variant="h5" component="h2">
          {currencySymbol}{listing.price}
        </Typography>
      </div>
      <Typography variant="h5" component="h2">
        {listing.sales} sales
      </Typography>

      <Typography variant="h5" component="h2">
        {currencySymbol}{listing.sales*listing.price} Total
      </Typography>

      <IconButton area-describedby={id} onClick={handleOpen}>
        <ThreeDotsImage />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <OptionsPopover id={listing.id}
          isVisibleOnProfile={isVisibleOnProfile}
          isActive={isActive} updater={threeDotsUpdater}/>
      </Popover>

    </div>
  );
};

