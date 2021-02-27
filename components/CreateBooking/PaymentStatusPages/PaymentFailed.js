import PaymentFailedImage from '../../../public/images/PaymentFailedImage.svg';
import PaymentFailedSymbol from
  '../../../public/images/PaymentFailedSymbol.svg';
import Divider from '@material-ui/core/Divider';
import styles from './styles.module.sass';

export default function PaymentFailed({message}) {
  return (
    <div className={styles.outermost}>
      <div><PaymentFailedImage /></div>

      <div className={styles.titleRow}>
        <PaymentFailedSymbol />
        <span className={styles.title}>
            Payment Failed
        </span>
      </div>

      <div className={styles.textSection}>
        <div className={styles.boldText}>
          <div>{message}</div>
          <br />
          <br />
          {'Looks like your payment didn\'t go through. Please try again'}
        </div>

        <Divider />

        <div className={styles.helpText}>
        Need Help? Contact our support team...pending implementation
        </div>
      </div>
    </div>
  );
}

