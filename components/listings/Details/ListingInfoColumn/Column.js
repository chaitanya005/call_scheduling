import styles from './styles.module.sass';
import CalendarIcon from '../../../../public/images/CalenderGrey.svg';
import ClockIcon from '../../../../public/images/ClockGrey.svg';
import GMeetIcon from '../../../../public/images/GMeet.svg';
import moment from 'moment';
import CartIcon from '../../../../public/images/SmallCart.svg';
import CreateBookingModal from '../../../../components/CreateBooking/Main';
import SelectTimeBoundSlot from
  '../../../../components/CreateBooking/SelectTimeBoundSlot';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {useState, useEffect} from 'react';
import currencyService from '../../../../lib/currencyService';
import { Repeat } from '@material-ui/icons';

const dollarChar = '\u0024';
const rupeeChar = '\u20B9';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
}));
export default function Column({listing, isAdvisorSide, userName, userId}) {
  // data common to all services
// console.log(listing)
  let currencySymbol = rupeeChar;
  if (currencyService.getDefaultCurrency()!=='rupee') {
    currencySymbol = dollarChar;
  }

  let oldPrice
  if (listing.serviceType == 3 || listing.serviceType == 5) {
   oldPrice = listing.price;
  }else {
    oldPrice = listing.price
  }
  let percentOFF = listing.percentOFF;
  if (percentOFF===undefined) {
    percentOFF = 0;
  }
  // const newPrice = oldPrice - (oldPrice*percentOFF)/100;
  var deliveryMode
  if (listing.serviceDelivery){
  deliveryMode = listing.serviceDelivery.type;
  }
  let locationLine = null;

  if (deliveryMode==='online') {
    const onlineMethod = listing.serviceDelivery.onlineMethodName;
    // locationLine = <span className={styles.gmeetText}>{listing.eventLink}</span>
    if (onlineMethod==='meet') {
      locationLine = <div>
        {/* <GMeetIcon className={styles.googleIcon} /> */} <span className={styles.gmeetText}>{listing.eventLink}</span>
      </div>
    } /* else if (onlineMethod==='personalLink') {
      locationLine = listing.serviceDelivery.personalLink;
    } else if (onlineMethod==='phone') {
      locationLine = listing.serviceDelivery.phone;
    } else if (onlineMethod==='adminPhone') {
      locationLine = listing.serviceDelivery.adminPhone;
    } */
  } else { // offline
    if (listing.serviceDelivery) {
      locationLine = listing.serviceDelivery.address;
    }
  }

  const [timeZone, setTimeZone] = useState('')

  var timez
  //getting Time Zone
  useEffect(() => {
    const date = new Date()
    const { 1: tz } = new Date(date).toString().match(/\((.+)\)/);
    
    // In Chrome browser, new Date().toString() is
    // "Thu Aug 06 2020 16:21:38 GMT+0530 (India Standard Time)"
  
    // In Safari browser, new Date().toString() is
    // "Thu Aug 06 2020 16:24:03 GMT+0530 (IST)"
    
 /*    var St = (listing.startTime)
    var dat = new Date(St)
    console.log(dat.toUTCString())
    var utcCutoff = moment.utc("20210214 16:30:00", 'YYYYMMDD HH:mm:ss')
    var displayCutoff = utcCutoff.clone().tz('Asia/Bangkok')
    console.log(utcCutoff.format('YYYYMMDD hh:mm:ssa Z'))
    console.log(displayCutoff.format('YYYYMMDD hh:mm:ssa Z').toLocaleString())
    timez = moment.tz.guess()
    var indoTime = moment.utc("2021-02-14 04:30").tz("Asia/Bangkok")
    var it = moment.tz("2021-02-14 04:30", 'Asia/Bangkok')
    console.log(moment(indoTime).format('HH:MM:SS'))
    console.log(moment(it).toLocaleString()) */
   /*  timez = moment.tz.guess()
    console.log(timez)
    var newYork = moment.utc(listing.startTime).tz(timez)
    var timeZones = moment.tz.names();
    console.log(newYork) */


    if (tz.includes(" ")) {
      console.log(tz)
      setTimeZone(tz)
      return {timeZone: tz
        .split(" ")
        .map(([first]) => first)
        .join("")};
    } else {
      console.log(tz)
      setTimeZone(tz)
      return tz;
    }
  }, [])

  // data specific to listing
  const priceTitle = 'Price';
  let durationTitle = 'Duration';
  let bookButtonTitle = 'Book';
  let timingRows = null;
  if (listing.serviceType===2) {// 2 time bound event
    const duration = listing.serviceDuration;
    timingRows = <div className={styles.timingRow}>
      <ClockIcon /><div className={styles.timing}>{duration}</div>
    </div>;
    bookButtonTitle = 'Book Slot';
  } else if (listing.serviceType===3) { // one time event
    durationTitle = 'Date & Duration';
    
    const date = moment(listing.date).format('MMMM Do YYYY');
    const timing = moment(listing.startTime).format('hh:mm A') +
    ' - ' + moment(listing.endTime).format('hh:mm A')
    timingRows =
    <div>
      <div className={styles.timingRow}>
        <ClockIcon className={styles.clockIcon} />
        <div className={styles.timing}>{timing}</div>
      </div>
      <div className={styles.timingRow}>
        <div className={styles.timing}>TZ: {timeZone}</div>
      </div>
      <div className={styles.timingRow}>
        <CalendarIcon className={styles.clockIcon} />
        <div className={styles.timing}>{date}</div>
      </div>
    </div>;
  } else if (listing.serviceType===4) {// project based
    durationTitle = 'Estimated Service Time';
    const duration = listing.serviceDuration;
    timingRows = <div className={styles.timingRow}>
      <ClockIcon />
      <div className={styles.timing}>{duration}</div>
    </div>;
  } else { // membership
    const slots = listing.slots;
    timingRows = <div className={styles.timingRow}>
      <ClockIcon />
      <div className={styles.timing}><SlotInfoRows slots={slots}/></div>
    </div>;
  }

  // Modal handling starts here
  const [modalBody, setModalBody] = useState(null);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100vh',
    overflow: 'scroll',
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function bookHandler(e) {
    if (listing.serviceType===2) {
      setModalBody(
       <div style={modalStyle} className={classes.paper}>
         <CreateBookingModal listing={listing} timingRows={timingRows} userName = {userName} userId = {userId} />
        </div>
      );
    } else {
      setModalBody(<div style={modalStyle} className={classes.paper}>
        {<CreateBookingModal listing={listing} timingRows={timingRows} userName = {userName} userId = {userId}/>}
      </div>);
    }
    handleOpen();
  }

  function onSlotSelected(date, startTime, endTime) {
    setModalBody(<div style={modalStyle} className={classes.paper}>
      {<CreateBookingModal listing={listing} date={date}
        startTime={startTime} endTime={endTime} userName = {userName} userId = {userId} />}
    </div>);
  }

  // modal handling ends here

  return (
    <div className={styles.outermostBox}>
      {<Modal
        open={open}
        onClose={handleClose}
      >
        {modalBody}
      </Modal>}
      {/* <div className={styles.OFFText}>{percentOFF} % OFF </div> */}
      <div>
        <div className={styles.priceRow}>
          <div className={styles.heading1}>{priceTitle + ':'}</div>
          {/* <div className={styles.oldPrice}>{oldPrice} USD</div> */}
          <div className={styles.newPrice}>{currencySymbol +' '+ oldPrice}</div>
        </div>
      </div>

      <div className={styles.dateTimeBox}>
        <div className={styles.heading2}>{durationTitle}</div>
        {timingRows}
      </div>
      {listing.serviceType!==2?
        <div>
          {/* <div className={styles.heading2}>Location</div>
          <div><span className={styles.gmeetText}>You will receive a mail with all the event details </span></div> */}
        </div> :
        
      <div>
        <div className={styles.heading2}>
          Next Available Slot: 
        </div>
        {<div>
        {listing.serviceSchedule.map(service => (
          <div> {service.days.map(day => (
            <div>{day}</div>
          ))} </div>
        ))}
        </div>}
      </div>
       }
      {!isAdvisorSide && listing.isActive ? // todo
        <div className={styles.bookButton} onClick={bookHandler}>
          <div className={styles.cartIconContainer}>
            <CartIcon  className={styles.cartIcon}/>
          </div>
          <span className={styles.bookButtonContainer}>
            {bookButtonTitle}
          </span>
        </div> :
        <div>
          {!isAdvisorSide ? 
          <h3>Sorry!! This listing is InActive you can't book this Listing.</h3>
          : ' '}
        </div>
      }
    </div>
  );
}


function SlotInfoRows({slots}) {
  if (slots) {
  // const repeatLines = new Array(slots.length);
  // const timingLines = new Array(slots.length);
  // const endLines = new Array(slots.length);
  // const slotsRows = new Array(slots.length);
  // const startDates = new Array(slots.length);

  // for (let i=0; i<slots.length; i++) {
  //   timingLines[i] = moment(slots[i].startTime, 'HH:mm:ss').format('hh:mm A') +
  //   ' - ' + moment(slots[i].endTime, 'HH:mm:ss').format('hh:mm A');

  //   startDates[i] = 'starts on ' +
  //   moment(slots[i].startDate).format('MMMM Do YYYY');

  //   repeatLines[i] = 'every ';
  //   if (slots[i].repeatPeriod>1) {
  //     repeatLines[i] = repeatLines[i] + slots[i].repeatPeriod + ' ';
  //   }
  //   if (slots[i].repeatType==='never') {
  //     repeatLines[i] = 'repeats never';
  //   } else if (slots[i].repeatType==='week') {
  //     if (slots[i].repeatPeriod===1) {
  //       repeatLines[i] = repeatLines + 'week: ';
  //     } else {
  //       repeatLines[i] = repeatLines[i] + 'weeks: ';
  //     }
  //     for (const day of slots[i].selectedWeekDays) {
  //       repeatLines[i] = repeatLines[i] + day + ', ';
  //     }
  //   } else if (slots[i].repeatType==='month') {
  //     if (slots[i].repeatPeriod===1) {
  //       repeatLines[i] = repeatLines[i] + 'month';
  //     } else {
  //       repeatLines[i] = repeatLines[i] + 'months';
  //     }
  //   } else if (slots[i].repeatType==='day') {
  //     repeatLines[i] = repeatLines[i] + 'days';
  //   }

  //   if (slots[i].endsAfter==='never') {
  //     endLines[i] = 'repeats forever';
  //   } else if ((slots[i].endsAfter).toString().includes('-')) {// date has '-'
  //     endLines[i] = 'till ' + moment(slots[i].endsAfter).format('MMMM Do YYYY');
  //   } else { // integer
  //     endLines[i] = 'ends after ' + slots[i].endsAfter + ' events';
  //   }

  //   slotsRows[i] =
  //   <div className={styles.membershipSlot}>
      // <div className={styles.slotFirstRow}>
      //   {repeatLines[i]}
      // </div>

      // <div className={styles.slotOtherRows}>
      //   {startDates[i]}
      // </div>

  //     <div className={styles.slotOtherRows}>
  //       {timingLines[i]}
  //     </div>

  //     <div className={styles.slotOtherRows}>
  //       {endLines[i]}
  //     </div>
  //   </div>;
  // }

  // return (
  //   <div>
  //     {slotsRows}
  //   </div>
  // );

    let startTime, endTime, repeat, startDate, endsAfter
    for(let i = 0; i < slots.length; i++) {
      startTime = slots[i].startTime
      startDate = slots[i].startDate
      endTime = slots[i].endTime
      repeat = slots[i].repeatType
      endsAfter = slots[i].endsAfter
    }
    return  (
      <React.Fragment>
        {slots.map(slot => (
          <div>
            <div className={styles.slotOtherRows}>
              {slot.startTime} - {slot.endTime}
            </div>
            <div className={styles.slotFirstRow}>
              Ends By: {slot.endsAfter}
            </div>
          </div>
        ))}
      </React.Fragment>
    )


  }else {
    return (
      <div></div>
    )
  }
}

