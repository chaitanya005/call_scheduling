import {useState} from 'react';
import styles from './styles.module.sass';

export default function PaymentInfo({formData, formDataUpdater}) {
  
  const [paymentChoice, setPaymentChoice] = useState('card');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryMonth, setCardExpiryMonth] = useState('');
  const [cardExpiryYear, setCardExpiryYear] = useState('');
  const [cardCVV, setCardCVV] = useState('');


  function handlePaymentOption(which) {
    if (which==='card') {
      formDataUpdater({paymentChoice: 'card'});
      setPaymentChoice('card');
    } else if (which==='netbanking') {
      formDataUpdater({paymentChoice: 'netbanking'});
      setPaymentChoice('netbanking');
    } else if (which==='paypal') {
      formDataUpdater({paymentChoice: 'paypal'});
      setPaymentChoice('paypal');
    }
  }

  function cardInputHandler(which, value) {
    if (which==='name') {
      setNameOnCard(value);
      formDataUpdater({nameOnCard: value});
    } else if (which==='number') {
      setCardNumber(value);
      formDataUpdater({cardNumber: value});
    } else if (which==='cvv') {
      setCardCVV(value);
      formDataUpdater({cardCVV: value});
    } else if (which==='month') {
      setCardExpiryMonth(value);
      formDataUpdater({cardExpiryMonth: value});
    } else if (which==='year') {
      setCardExpiryYear(value);
      formDataUpdater({cardExpiryYear: value});
    }
  }
  return (
    <div>
      <div className={styles.heading}>Payment Information</div>
      <div className={styles.subheading}>
        Choose a payment method from the options given below
      </div>

      <div className={styles.paymentOptions}>
        <div className={styles.radioRow}>
          <input type="radio" checked={paymentChoice==='card'}
            onChange={() => handlePaymentOption('card')}
            className={styles.checkbox} />
          <span>Credit or Debit Card</span>
        </div>

        <div className={styles.radioRow}>
          <input type="radio" checked={paymentChoice==='netbanking'}
            onChange={() => handlePaymentOption('netbanking')}
            className={styles.checkbox} />
          <span>Net banking</span>
        </div>

        <div className={styles.radioRow}>
          <input type="radio" checked={paymentChoice==='paypal'}
            onChange={() => handlePaymentOption('paypal')}
            className={styles.checkbox} />
          <span>PayPal</span>
        </div>
      </div>

      {/* card input starts */}
      {paymentChoice==='card' ?
      <div className={styles.formContainer}>
        <div className={styles.inputPair}>
          <div className={styles.fieldHeading}>Name on Card</div>
          <input type='text' className={styles.textField}
            value={nameOnCard}
            onChange={(e)=> cardInputHandler('name', e.target.value)}/>
        </div>


        <div className={styles.cardNumberRow}>
          <div className={styles.inputPair}>
            <div className={styles.fieldHeading}>Card Number</div>
            <input type='text' className={styles.textField}
              value={cardNumber}
              onChange={(e)=> cardInputHandler('number', e.target.value)}/>
          </div>

          <div className={styles.inputPairExpiry}>
            <div className={styles.fieldHeading}>Expiry</div>
            <div className={styles.expiry}>
              <input type='text' className={styles.textField}
                value={cardExpiryMonth} placeholder='MM'
                onChange={(e)=> cardInputHandler('month', e.target.value)}/>
              <input type='text' className={styles.textField}
                value={cardExpiryYear} placeholder='YYYY'
                onChange={(e)=> cardInputHandler('year', e.target.value)}/>
            </div>
          </div>

          <div className={styles.inputPair}>
            <div className={styles.fieldHeading}>CVV</div>
            <input type='text' className={styles.textField}
              value={cardCVV}
              onChange={(e)=> cardInputHandler('cvv', e.target.value)}/>
          </div>
        </div>
      </div> : null
      }
      {/* card input ends */}
    </div>
  );
}
