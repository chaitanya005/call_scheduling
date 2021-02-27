import Divider from '@material-ui/core/Divider';
import styles from './styles.module.sass';
import OrderSummary from '../OrderSummary';
import NavigationRow from '../NavigationRow';
import BookingDetailsSection from '../BookingDetails';
import PaymentInfoSection from '../PaymentInfo';
import {useState, useEffect} from 'react';
import {PaymentFailed, PaymentSuccessful} from '../PaymentStatusPages';
import api from '../../../lib/api';
import { useRouter } from 'next/router'
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js'

// date, time parameters for time bound service only
export default function CreateBooking({listing, timingRows, date, startTime,
  endTime, userName, userId}) {
  
  
  let startDate, listingTime
  if (listing.serviceType == 5) {
    for (let i = 0; i < listing.slots.length; i++) {
      startDate = listing.slots[i].startDate
      listingTime = listing.slots[i].startTime
    }
  }

  if (listing.serviceType == 3) {
    startDate = listing.date
    listingTime = listing.startTime
  }

  // console.log(listing.questionSet)
  const [formData, setFormData] = useState({
    userId: userId,
    listingId: listing.id,
    answers:  [],
    name: listing.name,
    listingDate: startDate,
    listingTime: listingTime,
    questions: listing.questionSet,
  });

  
  const stripePromise = loadStripe('pk_test_51IJkBIKVdNkiM5krzjTWCPi4w0XAJAMBsHiSPdhyuXOVOb01GxHvnKZwcrbtvfWrsoRe9vl7RBjcFgfjmAyjVtQW00BebrYiaY');

  const handleClick = async (event) => {
    // Get Stripe.js instance
    /* const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch('http://localhost:3000/users/payment', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: 'muvvalachaitanya05@gmail.com', 
            name: 'test session', 
            price: 50,
            images: ['https://www.ge.com/news/sites/default/files/styles/full_header/public/Reports/2020-03/wind-onshore-48-158-3d-landscape-1-3000px.jpg?itok=MdBGJ3Tk'],
            listngId: 8
        })
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
    }
    console.log(result)
    localStorage.setItem("result",result) */
  };


  // const [session, loading] = useSession();
  // const [userId, setUserId] = useState(null)

  const [step, setStep] = useState('booking details');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const router = useRouter()
  function formDataUpdater(data) {
    const newFormData = formData;
    for (const propertyName in data) {
      if (data.hasOwnProperty(propertyName)) {
        newFormData[propertyName] = data[propertyName];
      }
    }
    setFormData(newFormData);
    // console.log(newFormData);
  }


  

  function validator() {
    if (listing.isEmailRequired &&
    (formData.email==='' || formData.email===undefined || (!formData.email.includes('@')) )) {
      alert('Enter valid email address');
      return false;
    }
    if (formData.phoneNumber==='' || formData.phoneNumber===undefined) {
      alert('Enter valid phone number');
      return false;
    }

    // validate all answers have been answered
    if (listing.questions) {
    for (let i=0; i<(listing.questions).length; i++) {
      if ((listing.questions[i]).isRequired===true) {
        const ans = formData.answers[i];
        if (ans===undefined || ans==='') {
          alert('Question number '+ (i+1) + ' is compulsory');
          return false;
        }
      }
    }
  }

    return true;
  }

  console.log(listing)
  console.log(formData)

  const buttonClickHandler = async (listing)  => {
    console.log(formData)
    localStorage.setItem('customerData', JSON.stringify(formData))
    if (step==='booking details') { // 'continue to payment' button clicked
      if (validator()===false) {
        return;
      }
      setError('');
      if (formData.price === 0) {
        console.log(formData)
        api.createBooking(formData)
            .then((res) => {
              console.log(res.data);
              if (res.data.success == 200)  {
                setTimeout(() => {
                  setStep({
                    status: 'payment successful',
                    message: res.data
                    })
                }, 1000)
                // setTimeout(() => {
                //   router.push({
                //     pathname: '/user/profile',
                //     query: { id: userId,  seristo_user: userName}
                //   })
                // }, 5000);
            } else {
              setStep({
                status: 'payment failed',
                message: res.data
              })
            }
            })
            .catch(err => {
              // console.log(err)
              setStep({
                status: 'payment failed',
                message: err
              })
            })
      } else {
          // setStep('payment info')
          const stripe = await stripePromise;      
          // Call your backend to create the Checkout Session
            const response = await fetch('http://localhost:3000/users/payment', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: formData.email, 
                    name: 'test session', 
                    price: formData.price,
                    images: ['https://www.ge.com/news/sites/default/files/styles/full_header/public/Reports/2020-03/wind-onshore-48-158-3d-landscape-1-3000px.jpg?itok=MdBGJ3Tk'],
                    listingId: listing.id,
                    phoneNumber: formData.phoneNumber
                })
            })

            const session = await response.json();

            if (session.id) {

              // console.log(session.id)
              // When the customer clicks on the button, redirect them to Checkout.
              const result = await stripe.redirectToCheckout({
                  sessionId: session.id,
              });

              if (result.error) {
                  // If `redirectToCheckout` fails due to a browser or network
                  // error, display the localized error message to your customer
                  // using `result.error.message`.
              }
              console.log(result)
              localStorage.setItem("result",result)
            } else {
              /* setStep({
                status: 'payment failed',
                message: session
              }) */
              router.push({
                pathname: '/user/paymentFailed',
                query: {message: session.message}
              })
            }
        }

      //---------------Stripe Payment----------------------------------------------
      
    } else { // 'Complete payment' button clicked
      console.log(formData)
      if  (formData.price!==0)  {
        // console.log(formData);
        // setProcessing(true);
        
        // setStep('payment in process'); don't have ui for pending payment
        /* api.createBooking(formData)
            .then((res) => {
              console.log(res.data);
              setTimeout(() => {
                setStep('payment successful' )
              }, 1000)
              // setTimeout(() => {
              //   router.push({
              //     pathname: '/user/profile',
              //     query: { id: userId,  seristo_user: userName}
              //   })
              // }, 5000);
            })
            .catch(err => {
              // console.log(err)
              setStep({
                status: 'payment failed',
                message: "All bookings are full"
              })
            }) */
      // check on card input if selected
      // 3rd party payment handling

        var image
        if (listing.coverImg === null) {
          image = 'https://www.ge.com/news/sites/default/files/styles/full_header/public/Reports/2020-03/wind-onshore-48-158-3d-landscape-1-3000px.jpg?itok=MdBGJ3Tk'
        } else {
          image = listing.coverImg
        }

        
        //---------------Stripe Payment-------------------------------------------
        const stripe = await stripePromise;

      
      // Call your backend to create the Checkout Session
        const response = await fetch('http://localhost:3000/users/payment', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: formData.email, 
                name: 'test session', 
                price: formData.price,
                images: ['https://www.ge.com/news/sites/default/files/styles/full_header/public/Reports/2020-03/wind-onshore-48-158-3d-landscape-1-3000px.jpg?itok=MdBGJ3Tk'],
                listngId: listing.id
            })
        });

        const session = await response.json();

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        }
        console.log(result)
        localStorage.setItem("result",result)

    }

      //---------------Stripe Payment----------------------------------------------
    }
  }

  function navigationHandler(which) {
    if (which==='payment info' && validator()===false) {
      setError('');
      return;
    }
    console.log(formData);
    setStep(which);
  }


  return (
    <div className={styles.outermost}>
      {step.status==='payment successful' ?
      <div>
        <PaymentSuccessful listing={listing} response= {step.message} />
      </div> :

      <div>
      {step.status==='payment failed' ? 
      <div>
        <PaymentFailed response= {step.message} />
      </div>
      : 
      <div>
        <div className={styles.topHeading}>Booking</div>
        <Divider />

        <div className={styles.sectionBelow}>
          <OrderSummary formDataUpdater={formDataUpdater}
            listing={listing} timingRows={timingRows}
            date={date} startTime={startTime} endTime={endTime} />
          

          <NavigationRow state={step} clickHandler={navigationHandler} />
          {step==='booking details' ?
            <BookingDetailsSection formDataUpdater={formDataUpdater}
              formData={formData} listing={listing} />
            :
            <div>
              <PaymentInfoSection formData={formData}
                formDataUpdater={formDataUpdater} /> 
            </div>
          }

          <div className={styles.proceedButtonContainer}>
            <button onClick={() => buttonClickHandler(listing)}
              className={`${styles.proceedButton} ${processing ? styles.disabled : null}`}>
              {step==='booking details' ?
            'Proceed to Payment' : 'Complete Payment'}
            </button>
          </div>
          <div className={styles.error}>{error}</div>
        </div>
      </div>
      }
      </div>
      }
    </div>
  );
}


