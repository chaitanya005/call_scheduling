import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ListingsIcon from '@material-ui/icons/Reorder';
import ScheduleIcon from '@material-ui/icons/EventNote';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';
import SalesIcon from '@material-ui/icons/TrendingUp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import BookingsIcon from '../../public/images/bookingsIcon.svg';
import Logo from '../mainLogo';
import MessagesIcon from '@material-ui/icons/SmsOutlined';
import Link from 'next/link';
import styles from './sideNavSection.module.sass';
import SettingsIcon from '@material-ui/icons/Settings';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


export default function SideNav({selectedButtonName, screen}) {
  const buttonStyles = {
    dashboard: 'button',
    messages: 'button',
    listings: 'button',
    schedule: 'button',
    bookings: 'button',
    sales: 'button',
    profile: 'button',
    settings: 'button',
    payout: 'button',
    adminPayout: 'button',
    followers: 'button',
    customers: 'button',
  };
  buttonStyles[selectedButtonName] = 'selectedButton';

  return (
    <div className={styles.outermostBox}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.buttonsContainer}>
        {screen == "settings" || screen == "payout" ?
        <React.Fragment>
          <Link href='/user/settings' passhref>
          <button className={styles[buttonStyles.settings]}
            >
            <div className={styles.iconContainer}
              >
              <SettingsIcon className={styles.icon}/>
            </div>
            Settings
          </button>
          </Link>
          <Link href='/user/payout' passhref>
          <button className={styles[buttonStyles.payout]}>
            <div className={styles.iconContainer}>
              <MonetizationOnIcon className={styles.icon}/>
            </div>
            Payout
          </button>
          </Link>
        </React.Fragment>
        :

        <React.Fragment>
          {screen == 'admin' ?
          <React.Fragment>
            <button className={styles[buttonStyles.adminPayout]}>
            <div className={styles.iconContainer}>
              <MonetizationOnIcon className={styles.icon}/>
            </div>
              PayoutDashboard
            </button>
          </React.Fragment>
          :
          <React.Fragment>
            <Link href = '/user/dashboard' passhref>
            <button className={styles[buttonStyles.dashboard]}>
              <div className={styles.iconContainer}>
                <DashboardIcon className={styles.icon}/>
              </div>
              Dashboard
            </button>
            </Link>
            {/* <button className={styles[buttonStyles.messages]}
              >
              <div className={styles.iconContainer}
                >
                <MessagesIcon className={styles.icon}/>
              </div>
              Messages
            </button> */}

            <Link href='/user/listings' passhref>
              <button className={styles[buttonStyles.listings]}>
                <div className={styles.iconContainer}>
                  <ListingsIcon className={styles.icon}/>
                </div>
                <a>Listings</a>
              </button>
            </Link>
            <Link href='/user/schedule' passhref>
              <button className={styles[buttonStyles.schedule]}>
              <div className={styles.iconContainer}>
                <ScheduleIcon className={styles.icon}/>
              </div>
              Schedule
            </button>
            </Link>
            <Link href='/user/bookings' passhref>
              <button className={styles[buttonStyles.bookings]}>
                <div className={styles.iconContainer}>
                  <BookingsIcon className={styles.icon}/>
                </div>
                <a>Bookings</a>
              </button>
            </Link>

            {/* <button className={styles[buttonStyles.sales]}>
              <div className={styles.iconContainer}>
                <PeopleOutlineIcon className={styles.icon}/>
              </div>
              Customers
            </button> */}

            <Link href='/user/followers' passhref>
              <button className={styles[buttonStyles.followers]}>
                <div className={styles.iconContainer}>
                  <AddCircleOutlineIcon className={styles.icon}/>
                </div>
                Followers
              </button>
            </Link>

            {/* <button className={styles[buttonStyles.sales]}>
              <div className={styles.iconContainer}>
                <SalesIcon className={styles.icon}/>
              </div>
              Sales & Analytics
            </button> */}

            <Link href='/user/editprofile' passhref>
            <button className={styles[buttonStyles.profile]}>
              <div className={styles.iconContainer}>
              <ProfileIcon className={styles.icon}/>
              </div>
              Edit Profile
            </button>
            </Link>

            <Link href='/user/payout' passhref>
            <button className={styles[buttonStyles.payout]}>
              <div className={styles.iconContainer}>
                <MonetizationOnIcon className={styles.icon}/>
              </div>
              Payout
            </button>
            </Link>
          </React.Fragment>
          }
        </React.Fragment>
        }
      </div>
    </div>
  );
};
