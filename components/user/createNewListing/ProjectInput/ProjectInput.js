import Paper from '@material-ui/core/Paper';
import SideInfoArea from '../InfoArea';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import styles from './styles.module.sass';
import {useState, useEffect} from 'react';
import CurrencyBox from '../CurrencyBox';

export default function ProjectInputSection({formData, formDataUpdater, listing}) {
  console.log(listing)
  let defaultPrice = '';
  if (formData.Pprice!==undefined) {
    defaultPrice = formData.Pprice;
  }
  let defaultDuration = '';
  if (formData.Pduration!==undefined) {
    defaultDuration = formData.Pduration;
  }
  let defaultDurationType = '';
  if (formData.PdurationType!==undefined) {
    defaultDurationType = formData.PdurationType;
  }

  const [price, setPrice] = useState(defaultPrice);
  const [duration, setDuration] = useState(defaultDuration);
  const [durationType, setDurationType] = useState(defaultDurationType);

  useEffect(() => {
    formDataUpdater({PdurationType: 'Hours'});

    if (listing !== null && listing !== undefined) {
      setPrice(listing.price)
      formDataUpdater({Pprice: listing.price})
      setDuration(parseInt(listing.serviceDuration))
      formDataUpdater({Pduration: parseInt(listing.serviceDuration)})
      setDurationType(listing.serviceDuration)
      formDataUpdater({PdurationType: listing.serviceDuration})
    }
  }, [listing]);

  function priceHandler(e) {
    const num = parseInt(e.target.value);
    if (Number.isInteger(num) && num >= 0) {
      setPrice(num);
      formDataUpdater({Pprice: num});
    } else {
      setPrice('');
      formDataUpdater({Pprice: ''});
    }
  };


  function durationHandler(e) {
    const num = parseInt(e.target.value);
    if (Number.isInteger(num) && num >= 0) {
      setDuration(num);
      formDataUpdater({Pduration: num});
    } else {
      setDuration('');
      formDataUpdater({Pduration: ''});
    }
  };

  function durationTypeHandler(e) {
    setDurationType(e.target.value);
    formDataUpdater({PdurationType: e.target.value});
  }

  return (
    <Paper style={{margin: '10px 0px 0px 0px',
      borderRadius: '15px 15px 0px 0px'}}
    variant='outlined'>
      <Typography style={{padding: '15px'}} variant="h4" component="h2">
      Project Based Service
      </Typography>
      <Divider />
      <div style={{display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', padding: '15px'}}>
        <SideInfoArea heading={'Event Details'}
          content={'Basic Details for your listing descriptions'}/>
        <div style={{flex: '.6'}}>
          <div>
            <div className={styles.rightHeading}>Service Duration</div>
            <div className={styles.durationRow}>
              <input type='text'
                id="number" style={{flex: .2, borderRadius: '3px'}}
                onChange={durationHandler} value={duration}
                className={styles.textField} />

              <select className={styles.dropdown} value={durationType}
                onChange={durationTypeHandler}>
                <option id="0">Hours</option>
                <option id="1">Days</option>
                <option id="2">Weeks</option>
              </select>
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>
              <div style={{display: 'flex'}}>
                <div className={styles.rightHeading}>Total Price</div>
                <Typography color='error'>*</Typography>
              </div>
              <div style={{display: 'flex'}}>
                <CurrencyBox formData={formData}
                  formDataUpdater={formDataUpdater}/>
                <input type='text' id="price" onChange={priceHandler}
                  value={price}
                  placeholder='Price' className={styles.textField} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Paper>
  );
}
