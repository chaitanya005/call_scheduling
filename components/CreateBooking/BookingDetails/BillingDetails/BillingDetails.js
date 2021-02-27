import styles from './styles.module.sass';
import {useState} from 'react';

export default function BillingDetails({listing, formData, formDataUpdater}) {
  let defaultFirstName = '';
  if (formData.firstName!==undefined) {
    defaultFirstName = formData.firstName;
  }

  let defaultLastName = '';
  if (formData.lastName!==undefined) {
    defaultLastName = formData.lastName;
  }

  let defaultEmail = '';
  if (formData.email!==undefined) {
    defaultEmail = formData.email;
  }

  let defaultPhone = '';
  if (formData.phone!==undefined) {
    defaultPhone = formData.phone;
  }

  let defaultOrderNotes = '';
  if (formData.orderNotes!==undefined) {
    defaultOrderNotes = formData.orderNotes;
  }

  // console.log(formData)

  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [email, setEmail] = useState(defaultEmail);
  const [phoneNumber, setPhone] = useState(defaultPhone);
  const [orderNotes, setOrderNotes] = useState(defaultOrderNotes);

  function inputHandler(which, value) {
    if (which==='first name') {
      setFirstName(value);
      formDataUpdater({firstName: value});
    } else if (which==='last name') {
      setLastName(value);
      formDataUpdater({lastName: value});
    } else if (which==='phoneNumber') {
      setPhone(value);
      formDataUpdater({phoneNumber: value});
    } else if (which==='email') {
      setEmail(value);
      formDataUpdater({email: value});
    } else if (which==='order notes') {
      setOrderNotes(value);
      formDataUpdater({orderNote: value});
    }
  }
  return (
    <div>
      <div className={styles.heading}>Billing Information</div>
      <div className={styles.subheading}>
        {'Fill the form below in order to send you the order\'s invoice'}
      </div>
      <div className={styles.formContainer}>
        <div className={styles.inputRow}>
          <div className={styles.inputPair}>
            <div className={styles.fieldHeading}>First Name</div>
            <input type='text' className={styles.textField}
              value={firstName}
              onChange={(e)=> inputHandler('first name', e.target.value)}/>
          </div>

          <div className={styles.inputPair}>
            <div className={styles.fieldHeading}>Last Name</div>
            <input type='text' className={styles.textField}
              value={lastName}
              onChange={(e)=> inputHandler('last name', e.target.value)}/>
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputPair}>
            <div className={styles.fieldHeading}>Email Address
              {listing.isEmailRequired ?
              <span className={styles.star}>*</span> : null}
            </div>
            <input type='text' className={styles.textField}
              value={email}
              onChange={(e)=> inputHandler('email', e.target.value)}/>
          </div>

          <div className={styles.inputPair}>
            <div className={styles.fieldHeading}>Phone
              <span className={styles.star}>*</span>
            </div>

            <input type='text' className={styles.textField}
              value={phoneNumber}
              onChange={(e)=> inputHandler('phoneNumber', e.target.value)}/>
          </div>
        </div>

        <div className={styles.inputPair}>
          <div className={styles.fieldHeading}>Special Notes:</div>
          <textarea value={orderNotes} placeholder='Write some notes...'
            onChange={(e)=> inputHandler('order notes', e.target.value)}
            className={styles.textField}/>
        </div>
      </div>
    </div>
  );
}
