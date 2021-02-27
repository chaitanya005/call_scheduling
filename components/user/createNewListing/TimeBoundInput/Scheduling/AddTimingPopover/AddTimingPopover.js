import TimeInputRow from './TimeInputRow';
import styles from './styles.module.sass';
import CheckIcon from '../../../../../../public/images/CheckIcon.svg';
import {useState} from 'react';

export default function TimePopover({timings, closer, slotAdder}) {
  const [days, setDays] = useState(new Set());
  const [startTime, setStartTime] = useState('00:00 AM');
  const [endTime, setEndTime] = useState('00:00 AM');
  const [error, setError] = useState('');

  function handleDays(e) {
    const newSet = days;
    if (newSet.has(e.target.id)) {
      newSet.delete(e.target.id);
    } else {
      newSet.add(e.target.id);
    }

    setDays(newSet);
  };

  function handleTimeUpdate(stTime, enTime) {
    setStartTime(stTime);
    setEndTime(enTime);
  }

  function onClickSave() {
    if (days.size===0) {
      setError('Please select at least one day.');
      return;
    }
    if (startTime===endTime) {
      setError('Start and end time can\'t be same.');
      return;
    }
    slotAdder(startTime, endTime, days);
    closer();
  };

  return (
    <div className={styles.timingPopover}>

      <div className={styles.timingPopoverHeading}>Event Timings</div>

      <TimeInputRow updater={handleTimeUpdate}/>
      <div>
        <div className={styles.timingPopoverHeading}>Days Of The Week</div>
        <div className={styles.daysRow}>
          <input id='Mon' type='checkbox' onClick={handleDays}/>
          <span>Mon</span>

          <input id='Tue' type='checkbox' onClick={handleDays} />
          <span>Tue</span>

          <input id='Wed' type='checkbox' onClick={handleDays} />
          <span>Wed</span>

          <input id='Thu' type='checkbox' onClick={handleDays}/>
          <span>Thu</span>

          <input id='Fri' type='checkbox' onClick={handleDays}/>
          <span>Fri</span>

          <input id='Sat' type='checkbox' onClick={handleDays}/>
          <span>Sat</span>

          <input id='Sun' type='checkbox' onClick={handleDays}/>
          <span>Sun</span>

        </div>

      </div>
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
