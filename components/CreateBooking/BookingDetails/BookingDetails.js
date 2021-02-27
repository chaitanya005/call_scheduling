import ServiceSpecificQuestions from './ServiceSpecificQuestions';
import BillingDetails from './BillingDetails';
import styles from './styles.module.sass';

export default function BookingDetailsSection({
  formData, formDataUpdater, listing}) {
  return (
    <div>
     <ServiceSpecificQuestions formDataUpdater={formDataUpdater}
        formData={formData} listing={listing}/>
      <div className={styles.billingBox}>
        <BillingDetails listing={listing} 
          formData={formData} formDataUpdater={formDataUpdater}/>
      </div>
    </div>
  );
}
