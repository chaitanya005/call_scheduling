import styles from './styles.module.sass';
import CalendarIcon from '../../../public/images/CalenderGrey.svg';
import ClockIcon from '../../../public/images/ClockGrey.svg';
import moment from 'moment';
import {useEffect} from 'react';
import currencyService from '../../../lib/currencyService';


const dollarChar = '\u0024';
const rupeeChar = '\u20B9';

export default function OrderSummary({listing, timingRows, date,
  startTime, endTime, formDataUpdater}) {
  const price = listing.price;
  const tax = (5*listing.price)/100;
  const total = tax + price;

  let currencySymbol = rupeeChar;
  if (currencyService.getDefaultCurrency()!=='rupee') {
    currencySymbol = dollarChar;
  }
  useEffect(() => {
    formDataUpdater({price: total});
  }, []);

  return (
    <div>
      <div className={styles.heading}>Order Summary</div>

      <div className={styles.infoRow}>
        <div className={styles.detailsColumn}>

          <div className={styles.listingName}>{listing.name}</div>

          {listing.serviceType!==2 ? timingRows:
          <div>
            <div>
              <CalendarIcon />{' ' + moment(date).format('MMMM Do YYYY')}
            </div>

            <div>
              <ClockIcon />
              {' '+ moment(startTime, 'HH:mm').format('hh:mm A') +
              ' to '+ moment(endTime, 'HH:mm').format('hh:mm A')
              }
            </div>
          </div>
          }

        </div>
        {listing.price !== null? 
        <div>{currencySymbol + price}</div>
        :
        <div>{currencySymbol + listing.pricePerEntry}</div>
        }
      </div>

      {/* <InfoRow heading='Discount:' value={currencySymbol + '0'}/> */}
      <InfoRow heading='Platform Fee:' value={currencySymbol+tax} isBold={false} />
      <InfoRow heading='Total:' value={currencySymbol+total} isBold={true} /> 
    </div>
  );
}

function InfoRow({heading, value, isBold}) {
  return (
    <div className={styles.infoRow}>
      <div className={isBold? styles.infoRowHeadingBold :
      styles.infoRowHeading}>{heading}</div>
      <div className={isBold? styles.infoRowValueBold :
      styles.infoRowValue}>{value}</div>
    </div>
  );
}
