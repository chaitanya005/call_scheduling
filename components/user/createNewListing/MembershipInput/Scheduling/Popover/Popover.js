import styles from './styles.module.sass';
import CheckIcon from '../../../../../../public/images/CheckIcon.svg';
import {useState} from 'react';
import TimingRow from
  '../../../TimeBoundInput/Scheduling/AddTimingPopover/TimeInputRow';
import moment from 'moment';
import api from '../../../../../../lib/api';
import CheckTimingOverlay from '../../../../../../components/LoadingOverlay';


export default function TimePopover({formTimings, closer, slotAdder}) {
  const today = moment().format('YYYY-MM-DD');
  const defualtRepeatSetting = {
    day: false,
    alternate: false,
    week: false,
    month: false,
    never: true,
    custom: false,
  };
  const defaultEndsSetting = {
    never: true,
    date: false,
    xEvents: false,
  };
  const overlayComponent = <CheckTimingOverlay message='verifying this
  timing does not clash' isFullScreen={false}/>;

  const [startDate, setStartDate] = useState(today);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [repeatSetting, setRepeatSetting] = useState(defualtRepeatSetting);
  const [daysOptions, setDaysOptions] = useState(<div></div>);
  const [days, setDays] = useState(new Set());
  const [endsSetting, setEndsSetting] = useState(defaultEndsSetting);
  const [customRepeatType, setCustomRepeatType] = useState('Days');
  const [customRepeatValue, setCustomRepeatValue] = useState('');
  const [customEndsValue, setCustomEndsValue] = useState('');
  const [customEndsDate, setCustomEndsDate] = useState(today);
  const [waitingOverlay, setWaitingOverlay] = useState(<div></div>);

  function handleStartDate(e) {
    setStartDate(e.target.value);
  }

  function timingHandler(stTime, enTime) {
    setStartTime(stTime);
    setEndTime(enTime);
  }

  function handleDays(e) {
    const newSet = days;
    if (newSet.has(e.target.id)) {
      newSet.delete(e.target.id);
    } else {
      newSet.add(e.target.id);
    }
    setDays(newSet);
  };

  function handleRepeatsSettingChange(which) {
    setDays(new Set());
    setDaysOptions(<div></div>);
    const newSetting = defualtRepeatSetting;
    newSetting.never = false;
    if (which==='day') {
      newSetting.day = true;
    } else if (which==='alternate') {
      newSetting.alternate = true;
    } else if (which==='week') {
      newSetting.week = true;
      setDaysOptions(<WeekCheckboxes updater={handleDays}/>);
    } else if (which==='month') {
      newSetting.month = true;
    } else if (which==='never') {
      newSetting.never = true;
    } else if (which==='custom') {
      newSetting.custom = true;
    }

    setRepeatSetting(newSetting);
  }

  function handleEndsSettingChange(which) {
    const newSetting = defaultEndsSetting;
    newSetting.never = false;
    if (which==='never') {
      newSetting.never = true;
    } else if (which==='date') {
      newSetting.date = true;
    } else {
      newSetting.xEvents = true;
    }
    setEndsSetting(newSetting);
  }

  function customRepeatValueChangeHandler(e) {
    // check if it is valid
    const num = parseInt(e.target.value);
    if (Number.isInteger(num) && num > 0) {
      setCustomRepeatValue(num);
    } else {
      setCustomRepeatValue('');
    }
  }

  function customRepeatTypeChangeHandler(e) {
    setCustomRepeatType(e.target.value);
    if (e.target.value==='Weeks') {
      setDaysOptions(<WeekCheckboxes updater={handleDays}/>);
    } else { // hide weekdays checkboxes
      setDaysOptions(<div></div>);
    }
  }

  function customEndsDateChangeHandler(e) {
    setCustomEndsDate(e.target.value);
  }

  function customEndsValueChangeHandler(e) {
    const num = parseInt(e.target.value);
    if (Number.isInteger(num) && num > 0) {
      setCustomEndsValue(num);
    } else {
      setCustomEndsValue('');
    }
  }

  function onClickSave() {
    // perform basic checks
    if (startTime===endTime) {
      setError('Start and end time can\'t be same.');
      return;
    }
    if ((repeatSetting.week===true ||
        (customRepeatType==='Weeks' && repeatSetting.custom===true)) &&
        days.size===0) {
      setError('Please select at least one day.');
      return;
    }
    if (repeatSetting.custom===true && customRepeatValue==='') {
      setError('Please enter some repeat period.');
      return;
    }
    if (endsSetting.xEvents===true && customEndsValue==='') {
      setError('Please enter some number of events.');
      return;
    }
    if (endsSetting.date===true && moment(customEndsDate).isBefore(startDate)) {
      setError('Start date can\'t be after end date.');
      return;
    }
    // show waiting and check if this timing clashes
    setWaitingOverlay(overlayComponent);

    const formTiming = {
      startDate,
      startTime,
      endTime,
    };
    let repeatsString = '';
    let endsString = '';

    if (endsSetting.never===true) {
      formTiming.endsAfter = 'never';
      endsString = 'never ends';
    } else if (endsSetting.date===true) {
      formTiming.endsAfter = customEndsDate;
      endsString = 'ends ' + moment(customEndsDate).format('MMM Do YYYY');
    } else {
      formTiming.endsAfter = customEndsValue;
      endsString = 'ends After ' + customEndsValue + ' events';
    }

    if (repeatSetting.day===true) {
      formTiming.repeatType = 'day';
      formTiming.repeatPeriod = 1;
      repeatsString = 'repeats everyday';
    } else if (repeatSetting.alternate===true) {
      formTiming.repeatType = 'day';
      formTiming.repeatPeriod = 2;
      repeatsString = 'repeats alternate days';
    } else if (repeatSetting.week===true) {
      formTiming.repeatType = 'week';
      formTiming.repeatPeriod = 1;
      formTiming.selectedWeekDays = days;
      repeatsString = 'every ';
      days.forEach((day) => {
        repeatsString = repeatsString + day + ', ';
      });

      repeatsString = repeatsString.slice(0, -2); // remove ', ' from the end
    } else if (repeatSetting.month===true) {
      formTiming.repeatType = 'month';
      formTiming.repeatPeriod = 1;
      repeatsString = 'every month';
    } else if (repeatSetting.never===true) {
      formTiming.repeatType = 'never';
      repeatsString = 'never repeats';
    } else {
      formTiming.repeatPeriod = customRepeatValue;
      repeatsString = 'every ' + customRepeatValue +' '+ customRepeatType;
      if (customRepeatType==='Weeks') {
        formTiming.repeatType = 'week';
        formTiming.selectedWeekDays = days;
        days.forEach((day) => {
          repeatsString = repeatsString + day + ', ';
        });
        repeatsString = '(' + repeatsString.slice(0, -2) + ')';
      } else if (customRepeatType==='Months') {
        formTiming.repeatType = 'month';
      } else {
        formTiming.repeatType = 'day';
      }
    }


    const allTimings = {...formTimings, ...formTiming};

    api.areTimingsClashing(allTimings, 5) // 5 is serviceType
        .then((res) => {
          if (res.data.areClashing===false) { // does not clash
            createTiming();
            setTimeout(() => closer(), 2100); // runs after overlay is removed
          } else {
            setError(`This timing clashes with your schedule`);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setWaitingOverlay(<div></div>);
          setError(`There was an error.
          Please check your internet connection and try again.`);
          return;
        })
        .finally(() => {
          setTimeout(() => setWaitingOverlay(<div></div>), 2000);
        });

    // this handles both UI updation and formData change
    const createTiming = () => {
      slotAdder(moment(startDate).format('MMM Do YYYY'), startTime,
          endTime, repeatsString, endsString, formTiming);
    };
  };

  return (
    <div className={styles.timingPopover}>
      {waitingOverlay}
      <div>

        <div className={styles.firstRow}>
          <div className={styles.timingPopoverHeading}>Select Date</div>
          <input type='date' min={today} value={startDate}
            onChange={handleStartDate} className={styles.datePicker}/>
        </div>

        <div className={styles.timingPopoverHeading}>Event Timings</div>

        <TimingRow updater={timingHandler} />

        {/* repeatType radios start here */}
        <div className={styles.repeatTypeColumn}>
          <div className={styles.timingPopoverHeading}>
          Service Repeats Every</div>

          <div className={styles.table}>

            <div className={styles.child}>
              <input type="radio" className={styles.checkbox}
                onChange={() => handleRepeatsSettingChange('day')}
                checked={repeatSetting.day}/>
              <span>Day</span>
            </div>
            <div className={styles.child}>
              <input type="radio"
                onChange={() => handleRepeatsSettingChange('alternate')}
                checked={repeatSetting.alternate}
                className={styles.checkbox} />
              <span>Alternate Day</span>
            </div>
            {/* week starts here */}
            <div className={styles.child}>
              <input type="radio" checked={repeatSetting.week}
                onChange={() => handleRepeatsSettingChange('week')}
                className={styles.checkbox} />
              <span>Week</span>
            </div>

            {/* week ends here */}

            <div className={styles.child}>
              <input type="radio" checked={repeatSetting.month}
                onChange={() => handleRepeatsSettingChange('month')}
                className={styles.checkbox} />
              <span>Month</span>
            </div>
            <div className={styles.child}>
              <input type="radio" className={styles.checkbox}
                onChange={() => handleRepeatsSettingChange('never')}
                checked={repeatSetting.never} />
              <span>Never</span>
            </div>
            <div className={styles.lastChild}>
              <input type="radio" className={styles.checkbox}
                onChange={() => handleRepeatsSettingChange('custom')}
                checked={repeatSetting.custom} />
              <span>Custom</span>
            </div>
            {repeatSetting['custom'] ? <CustomInput value={customRepeatValue}
              type={customRepeatType}
              valueChangeHandler={customRepeatValueChangeHandler}
              typeChangeHandler={customRepeatTypeChangeHandler}/> :
              null
            }

            {daysOptions}
          </div>
        </div>
        {/* repeatType radios end here */}


      </div>

      {/* ends after section starts here */}
      <div>
        <div className={styles.timingPopoverHeading}>Ends</div>
        <div className={styles.table}>
          <div className={styles.child}>
            <input type="radio" checked={endsSetting.xEvents}
              className={styles.checkbox} onChange={() =>
                handleEndsSettingChange('xEvents')
              }/>

            <div className={styles.timingPopoverHeading}>After</div>

            <input type='text' className={styles.bottomTextField}
              value={customEndsValue} onChange={customEndsValueChangeHandler}/>
            <div className={styles.timingPopoverHeading}>no. of events</div>
          </div>

          <div className={styles.child}>
            <input type="radio" checked={endsSetting.date}
              className={styles.checkbox} onChange={() =>
                handleEndsSettingChange('date')
              }/>
            <input type="date" id="start"
              className={styles.datePicker}
              min={today} value={customEndsDate}
              onChange={customEndsDateChangeHandler}/>
          </div>

          <div className={styles.child}>
            <input type="radio" checked={endsSetting.never}
              className={styles.checkbox} onChange={() =>
                handleEndsSettingChange('never')
              }/>
            <div className={styles.timingPopoverHeading}>Never</div>
          </div>
        </div>
      </div>
      {/* 'ends after' section ends here */}
      <div className={styles.error}>{error}</div>

      <div>
        <button className={styles.saveTimingButton}
          onClick={() => onClickSave()}
        >
          <CheckIcon />  Save Timing
        </button>
      </div>
    </div>
  );
}


// days selection row
function WeekCheckboxes({updater}) {
  return (
    <div>

      <div className={styles.daysRow}>
        <input id='Mon' type='checkbox' onClick={updater}/>
        <span>Mon</span>

        <input id='Tue' type='checkbox' onClick={updater} />
        <span>Tue</span>

        <input id='Wed' type='checkbox' onClick={updater} />
        <span>Wed</span>

        <input id='Thu' type='checkbox' onClick={updater}/>
        <span>Thu</span>

        <input id='Fri' type='checkbox' onClick={updater}/>
        <span>Fri</span>

        <input id='Sat' type='checkbox' onClick={updater}/>
        <span>Sat</span>

        <input id='Sun' type='checkbox' onClick={updater}/>
        <span>Sun</span>

      </div>
    </div>
  );
}

function CustomInput({valueChangeHandler,
  typeChangeHandler, value, type}) {
  return (
    <div className={styles.customInput}>
      <input type='text' value={value} className={styles.bottomTextField}
        onChange={valueChangeHandler} />
      <span>
        <select value={type} className={styles.dropdown}
          onChange={typeChangeHandler}>
          <option>Days</option>
          <option>Weeks</option>
          <option>Months</option>
        </select>
      </span>
    </div>
  );
}

