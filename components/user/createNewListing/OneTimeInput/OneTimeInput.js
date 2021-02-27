import Paper from '@material-ui/core/Paper';
import SideInfoArea from '../InfoArea';
import Divider from '@material-ui/core/Divider';
import CurrencyBox from '..//CurrencyBox';
import styles from './OneTimeInput.module.sass';
import TimingRow from
  '../TimeBoundInput/Scheduling/AddTimingPopover/TimeInputRow';
import {useState, useEffect} from 'react';
import moment from 'moment';
import api from '../../../../lib/api';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'


export default function OneTimeEventInputSection({formData, formDataUpdater}) {
  const today = new Date();
  let defaultDate = today;
  if (formData.OTdate!==undefined) {
    defaultDate = formData.OTdate;
  }
  let defaultPrice = '';
  if (formData.OTprice!==undefined) {
    defaultPrice = formData.OTprice;
  }
  let defaultMaxParticipants = '';
  if (formData.OTmaxParticipants!==undefined) {
    defaultMaxParticipants = formData.OTmaxParticipants;
  }
  let defaultStartTime = new Date;
  if (formData.OTstartTime!==undefined) {
    defaultStartTime = formData.OTstartTime;
  }
  let defaultEndTime = new Date;
  if (formData.OTendTime!==undefined) {
    defaultEndTime = formData.OTendTime;
  }

  const [price, setPrice] = useState(defaultPrice);
  const [date, setDate] = useState(defaultDate);
  const [maxParticipants, setMaxParticipants] =
  useState(defaultMaxParticipants);
  const [clashMessage, setClashMessage] = useState('');
  const [startTime, setStartTime] = useState(defaultStartTime)
  const [endTime, setEndTime] = useState(defaultEndTime)

  useEffect(() => {
    formDataUpdater({
      OTdate: date,
    });
  }, []);

  function priceHandler(e) {
    const num = parseInt(e.target.value);
    if (Number.isInteger(num) && num >= 0) {
      setPrice(num);
      formDataUpdater({OTprice: num});
    } else {
      setPrice('');
      formDataUpdater({OTprice: undefined});
    }
  };
  function dateHandler(e) {
    // console.log(e)
    /* var date = e.toISOString()
    date = date.split('T')[0]
    var dateString = date.split('-')
    var year = dateString[0]
    var month = dateString[1]
    var day = dateString[2]
    console.log(year, month, day, dateString) */
    setDate(e);
    formDataUpdater({OTdate: e});
  };

  function timingHandler(startTime, endTime) {
    // check if this timing clashes with user's schedule

    // console.log(startTime, endTime)
    console.log(moment(startTime).format('HH:mm'), moment(endTime).format('HH:mm'))
    api.areTimingsClashing({
      startTime,
      endTime,
    }, 3) // 3 is serviceType
        .then((res) => {
          if (res.data.areClashing===true) {
            // setClashMessage('This timing clashes with your schedule');
            formDataUpdater({OTtimingAvailable: false});
          } else {
            // setClashMessage('You can use this timing');
            formDataUpdater({OTtimingAvailable: true});
          }
        })
        .catch((err) => {
          // setClashMessage('Can\'t connect to internet ' + err.toString());
        });
    formDataUpdater({OTstartTime: startTime, OTendTime: endTime});
  }

  function maxParticipantsHandler(e) {
    const num = parseInt(e.target.value);
    if (Number.isInteger(num) && num > 0 && num<100) {
      setMaxParticipants(num);
      formDataUpdater({OTmaxParticipants: num});
    } else {
      setMaxParticipants('');
      formDataUpdater({OTmaxParticipants: ''});
    }
  }

  const handleStartTime = (time) => {
    setStartTime(time)
    console.log((time))
    const startTime = new Date(time).toISOString()
    let timing =  startTime.replace(/^2021-02-10:/, '')
    // console.log(moment(startTime).format('HH:mm'))
    // formDataUpdater({OTstartTime: startTime}) 
    timingHandler(startTime, endTime)
  }

  const handleEndTime = (time) => {
    console.log(time)
    setEndTime(time)
    const endTime = new Date(time).toISOString()
    // formDataUpdater({OTendTime: endTime})
    timingHandler(startTime, endTime)
  }

  useEffect(() => {
    
  }, [])

  // console.log(formData)
  return (
    <Paper style={{margin: '10px 0px 0px 0px',
      borderRadius: '15px 15px 0px 0px'}}
    variant='outlined'>
      <Typography style={{padding: '15px'}} variant="h4" component="h2">
      One Time Workshop
      </Typography>
      <Divider />

      <div style={{display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', padding: '15px'}}>
        <SideInfoArea heading={'Session Details'}
          content={'Add the details of your session. This information including session date and timings cannot be changed once created. '}/>

        <div className={styles.rightSection}>
          <div className={styles.inputRow}>
            <div>
              <div style={{display: 'flex'}}>
                <div className={styles.heading}>
                  Price/entry<span className={styles.star}>*</span></div>
              </div>

              <div style={{display: 'flex'}}>
                <CurrencyBox formData={formData}
                  formDataUpdater={formDataUpdater}/>
                <input type='text' id="price" onChange={priceHandler}
                  value={price}
                  placeholder='Price/entry' className={styles.textField} />
              </div>
            </div>
            <div>
              <div>
                <div className={styles.heading}>
              Maximum Participants
                  <span className={styles.star}>*</span>
                </div>
                <input type='text' className={styles.textField}
                  value={maxParticipants}
                  onChange={maxParticipantsHandler} />
              </div>
            </div>
          </div>

          <div className={styles.inputRow}>
            <div>
              <div className={styles.heading}>Day of Event</div>
              {/* <input type="date" id="start" onChange={dateHandler}
                value={date} className={styles.datePicker}
                min={today} /> */}

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={date}
                      onChange={dateHandler}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between'}}>
            {/* <div>
              <div className={styles.heading}>Event Duration</div>
              <input type='text' onChange={durationHandler}
                defaultValue={formData.OTduration}
                placeholder='1 hr' className={styles.textField} />
            </div> */}

            <div className={styles.heading}>Event Timings
              <span className={styles.star}>*</span>
              {/* <TimingRow oldStartTime={defaultStartTime}
                oldEndTime={defaultEndTime}
                updater={timingHandler}/>  */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Start Time"
                      value={startTime}
                      onChange={handleStartTime}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="End Time"
                      value={endTime}
                      onChange={handleEndTime}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              <div className={styles.clashInfo}>
                {clashMessage}
              </div>
            </div> 

          </div>
        </div>
      </div>
    </Paper>
  );
}
