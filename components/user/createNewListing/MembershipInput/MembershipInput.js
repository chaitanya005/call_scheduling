import Paper from '@material-ui/core/Paper';
import SideInfoArea from '../InfoArea';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SchedulingSection from './Scheduling';
import CurrencyBox from '../CurrencyBox';
import {useState} from 'react';
import styles from './styles.module.sass';


export default function MembershipInputSection({formData, formDataUpdater}) {
  let defaultPrice = '';
  if (formData.Mprice!==undefined) {
    defaultPrice = formData.Mprice;
  }
  let defaultMaxParticipants = '';
  if (formData.MmaxParticipants!==undefined) {
    defaultMaxParticipants = formData.MmaxParticipants;
  }

  console.log(formData)
  const [price, setPrice] = useState(defaultPrice);
  const [maxParticipants, setMaxParticipants] =
  useState(defaultMaxParticipants);

  // useEffect(() => {
    
  // }, [])

  function handlePriceChange(e) {
    const num = parseInt(e.target.value);
    if (Number.isInteger(num) && num >= 0) {
      setPrice(num);
      formDataUpdater({Mprice: num});
    } else {
      setPrice('');
      formDataUpdater({Mprice: undefined});
    }
  }

  function handleMaxParticipants(e) {
    const num = parseInt(e.target.value);
    if (Number.isInteger(num) && num>0 && num<100) {
      setMaxParticipants(num);
      formDataUpdater({MmaxParticipants: num});
    } else {
      setMaxParticipants('');
      formDataUpdater({MmaxParticipants: undefined});
    }
  }


  return (
    <Paper style={{margin: '10px 0px 0px 0px',
      borderRadius: '15px 15px 0px 0px'}}
    variant='outlined'>
      <Typography style={{padding: '15px'}} variant="h4" component="h2">
      Membership
      </Typography>
      <Divider />
      <div style={{display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', padding: '15px'}}>
        <SideInfoArea heading={'Service Timings'}
          content={'Basic Details for your listing descriptions'}/>
        <div style={{flex: '.6'}}>
          <div style={{display: 'flex', flexDirection: 'row',
            margin: '10px 0px', justifyContent: 'space-between'}}>
            <div>
              <div className={styles.heading}>
              Maximum Participants
                <span className={styles.star}>*</span>
              </div>
              <input type='text' className={styles.textField}
                value={maxParticipants}
                onChange={
                  handleMaxParticipants
                } />
            </div>

            <div>
              <div style={{display: 'flex'}}>
                <div className={styles.heading}>Price / participant
                  <span className={styles.star}>*</span></div>
              </div>
              <div style={{display: 'flex'}}>
                <CurrencyBox formData={formData}
                  formDataUpdater={formDataUpdater}/>
                <input type='text'
                  onChange={
                    handlePriceChange
                  }
                  value={price}
                  className={styles.textField} />
              </div>
            </div>
          </div>

          <SchedulingSection formData={formData}
            formDataUpdater={formDataUpdater}/>
        </div>
      </div>
    </Paper>
  );
}
