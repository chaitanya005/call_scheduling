import Paper from '@material-ui/core/Paper';
import SideInfoArea from '../InfoArea';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SchedulingSection from './Scheduling';
import {useState, useEffect} from 'react';
import CurrencyBox from '../CurrencyBox';
import styles from './styles.module.sass';

export default function TimeBoundEventInputSection({formData,
  formDataUpdater, listing}) {
  let defaultSlots = new Set();
  let defaultPrice = '';
  let defaultDuration = '';
  let defaultDurationType = 'minutes';
  if (formData.TBslots!==undefined) {
    defaultSlots = formData.TBslots;
  }
  if (formData.TBprice!==undefined) {
    defaultPrice = formData.TBprice;
  }
  if (formData.TBduration!==undefined) {
    defaultDuration = formData.TBduration;
  }
  if (formData.TBdurationType!==undefined) {
    defaultDurationType = formData.TBdurationType;
  }


  const [slots, setSlots] = useState(defaultSlots);
  const [price, setPrice] = useState(defaultPrice);
  const [duration, setDuration] = useState(defaultDuration);
  const [durationType, setDurationType] = useState(defaultDurationType);

  useEffect(() => {
    formDataUpdater({
      TBdurationType: durationType,
    });
  }, []);

  function slotUpdater(slot) {
    // save recieved time slot
    if (slots.has(slot)) {
      slots.delete(slot);
    } else {
      setSlots(slots.add(slot));
    }
    formDataUpdater({TBslots: slots});
  };

  function priceUpdater(e) {
    const num = parseInt(e.target.value);
    if (Number.isInteger(num) && num >= 0) {
      setPrice(e.target.value);
      formDataUpdater({TBprice: e.target.value});
    } else {
      setPrice('');
      formDataUpdater({TBprice: ''});
    }
  };

  function durationUpdater(e, kind) {
    if (kind==='integer') {
      const num = parseInt(e.target.value);
      if (Number.isInteger(num) && num>0) {
        setDuration(num);
        formDataUpdater({TBduration: num});
      } else {
        setDuration('');
        formDataUpdater({TBduration: ''});
      }
    } else {
      setDurationType(e.target.value);
      formDataUpdater({TBdurationType: e.target.value});
    }
  };

  useEffect(() => {
    if (listing !== null && listing !== undefined){
      setPrice(listing.price)
      formDataUpdater({TBprice: listing.price})
      // console.log(listing)
      const num = parseInt(listing.serviceDuration)
      setDuration(num)
      formDataUpdater({TBduration: num})
      const type = listing.serviceDuration.replace(/[0-9]/g, '')
      setDurationType(type)
      formDataUpdater({TBdurationType: type})
    }
  }, [listing])

  // console.log(durationType)

  return (
    <Paper style={{margin: '10px 0px 0px 0px',
      borderRadius: '15px 15px 0px 0px'}}
    variant='outlined'>
      <Typography style={{padding: '15px'}} variant="h4" component="h2">
      Time Bound Service
      </Typography>
      <Divider />
      <div style={{display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', padding: '15px'}}>
        <SideInfoArea heading={'Service Timings'}
          content={'Basic Details for your listing descriptions'}/>
        <div className={styles.rightSection}>
          <div className={styles.inputRow}>
            <div>
              <div className={styles.rightHeading}>
                <span>Price
                  <span className={styles.required}>*</span></span>
              </div>
              <div className={styles.price}>
                <CurrencyBox formData={formData}
                  formDataUpdater={formDataUpdater}/>
                <input type='text' className={styles.textField}
                  placeholder='Price/session' value={price}
                  onChange={priceUpdater} />
              </div>
            </div>

            <div>
              <div className={styles.rightHeading}>Session Duration
                <span className={styles.required}>*</span>
              </div>
              <div className={styles.durationInput}>
                <input type='text' className={styles.textField}
                  value={duration}
                  onChange={(e) => durationUpdater(e, 'integer')} />
                <select className={styles.durationOptions} value={durationType}
                  onChange={(e) => durationUpdater(e, 'string')}>
                  <option>Minutes</option>
                  <option>Hours</option>
                </select>
              </div>
            </div>

          </div>

          <SchedulingSection formData={formData}
            formDataUpdater={formDataUpdater} listing = {listing} />
        </div>
      </div>
    </Paper>
  );
}
