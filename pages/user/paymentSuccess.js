import {PaymentSuccessful} from '../../components/CreateBooking/PaymentStatusPages'
import api from '../../lib/api'
import Spinner from '../../components/LoadingOverlay'
import {useEffect, useState} from 'react'

const paymentSuccess = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState('')

  useEffect(() => {
    var data = JSON.parse(localStorage.getItem('customerData'))
    // console.log(data)
    api.createBooking(data)
      .then((res) => {
        console.log(res)
        setResponse(res.data.data)
        setIsLoading(false)
        localStorage.removeItem('customerData')
      })
      .catch(err => console.log(err))
  }, [])
    
  return (
    <div>
      {isLoading ? 
        <Spinner message = {'Loading...'} isFullScreen = {true} />
      :
      <div>
            <PaymentSuccessful  response = {response}  />
      </div>
      }
    </div>
  );
};

export default paymentSuccess;
