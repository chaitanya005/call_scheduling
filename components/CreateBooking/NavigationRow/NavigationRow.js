import styles from './styles.module.sass';

export default function NavigationRow({state, clickHandler}) {
  return (
    <div className={styles.outermost}>
      <div className={state==='booking details' ? styles.buttonSelected :
      styles.button}
      onClick={()=> clickHandler('booking details')}>
        Booking Details
      </div>

      {/* <div className={state==='booking details' ? styles.button :
      styles.buttonSelected}
      onClick={()=> clickHandler('payment info')}>
        Payment Info
      </div> */}
    </div>
  );
}
