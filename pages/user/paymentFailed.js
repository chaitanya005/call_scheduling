import {PaymentFailed} from '../../components/CreateBooking/PaymentStatusPages'
import { useRouter } from 'next/router'


const paymentFail = () => {
  const router = useRouter()
  console.log(router.query)
  return (
    <div>
      <div>
        <PaymentFailed message = {router.query.message}/>
      </div>
    </div>
  );
};

export default paymentFail;
