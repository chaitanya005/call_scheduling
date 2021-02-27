import PaymentSuccessfulImage from
  '../../../public/images/PaymentSuccessfulImage.svg';
import PaymentSuccessfulSymbol from
  '../../../public/images/PaymentSuccessfulSymbol.svg';
import styles from './styles.module.sass';
import {useRouter} from 'next/router'
import {useState} from 'react'

export default function PaymentSuccessful({ response}) {
  console.log(response)
  const router = useRouter()

  return (
    <div className={styles.outermost}>
      <div><PaymentSuccessfulImage /></div>

      <div className={styles.titleRow}>
        <PaymentSuccessfulSymbol />
        <span className={`${styles.title} ${styles.greenTitle}`}>
            Payment Successful!
        </span>
      </div>

      <div className={styles.textSection} >
        <div className={styles.thankYouText}>
          { response.booking.thankYouNote }
        </div>
        <div style = {{display: 'flex', flexDirection: 'row' }}>
          <div>Your booking ID: </div>
          <div style={{ color: '#2242A4', fontWeight: '600', fontSize: '17px', marginLeft:'1%'}}>{' '}  #B{response.booking.listingId }{response.booking.bookingId}</div>
        </div> 
        <div className={styles.extraInfo}>
          <p>
            Your booking has been created.</p>
          <p>You will be notified through email before the event starts.
          </p>
        </div>

        {/* <a href = {`http://localhost:3001/user/profile?id=${router.query.seristo_userId}&seristo_user=${router.query.seristo_user}`} style = {{textDecoration: 'none'}}>Back to home</a> */}
      </div>

    </div>
  );
}
