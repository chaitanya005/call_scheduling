import Box from '@material-ui/core/Box';
import styles from './styles.module.sass';
import {useState} from 'react';

export default function Row({oldStartTime, oldEndTime, updater}) {
  let defaultTime11 = '01';
  if (oldStartTime!==undefined) {
    defaultTime11 = oldStartTime.substring(0, 2);
  }
  let defaultTime12 = '00';
  if (oldStartTime!==undefined) {
    defaultTime12 = oldStartTime.substring(3, 5);
  }
  let defaultTime21 = '01';
  if (oldStartTime!==undefined) {
    defaultTime21 = oldEndTime.substring(0, 2);
  }
  let defaultTime22 = '00';
  if (oldStartTime!==undefined) {
    defaultTime22 = oldEndTime.substring(3, 5);
  }
  const [time11, setTime11] = useState(defaultTime11);
  const [time12, setTime12] = useState(defaultTime12);
  const [time21, setTime21] = useState(defaultTime21);
  const [time22, setTime22] = useState(defaultTime22);

  const [startAM, setStartAM] = useState('AM');
  const [endAM, setEndAM] = useState('AM');

  function timeChangeHandler(e) {
    let value = e.target.value;
    if (isNaN(e.target.value)) {
      value = '00';
    }

    let time = parseInt(value);

    if (e.target.id==='1.1') {
      if (time<1) {
        time = '01';
      } else if (time>12) {
        time = time.toString()[1];
        if (time==='0') {
          time = '1';
        }
      }
      time = ('0' + time).slice(-2);
      setTime11(time);

      console.log(time, time12)
      updater(`${time}:${time12} ${startAM}`, `${time21}:${time22} ${endAM}`);
    } else if (e.target.id==='1.2') {
      if (time<0 || time>59) {
        time = '00';
      }
      time = ('0' + time).slice(-2);

      setTime12(time);

      updater(`${time11}:${time} ${startAM}`, `${time21}:${time22} ${endAM}`);
    } else if (e.target.id==='2.1') {
      if (time<1) {
        time = '01';
      } else if (time>12) {
        time = time.toString()[1];
        if (time==='0') {
          time = '1';
        }
      }
      time = ('0' + time).slice(-2);

      setTime21(time);


      updater(`${time11}:${time12} ${startAM}`, `${time}:${time22} ${endAM}`);
    } else if (e.target.id==='2.2') {
      if (time<0 || time>59) {
        time = '00';
      }
      time = ('0' + time).slice(-2);

      setTime22(time);

      updater(`${time11}:${time12} ${startAM}`, `${time21}:${time} ${endAM}`);
    }
  };

  function handleAMChange(whichTime, ampm) {
    console.log(ampm);
    if (whichTime==='start') { // startTime
      if (ampm==='AM') {
        setStartAM('AM');
      } else {
        setStartAM('PM');
      }
      updater(`${time11}:${time12} ${ampm}`, `${time21}:${time22} ${endAM}`);
    } else { // endTime
      if (ampm==='AM') {
        setEndAM('AM');
      } else {
        setEndAM('PM');
      }
      updater(`${time11}:${time12} ${startAM}`, `${time21}:${time22} ${ampm}`);
    }
  };

  return (
    <div className={styles.timingPopoverInputRow} >
      <Box display='flex' marginRight='10px'>
        <div className={styles.timeBlock}>
          <input className={styles.timeInputBox} value={time11}
            type='text' id="1.1" onChange={timeChangeHandler}/>
          <div>:</div>
          <input className={styles.timeInputBox} value={time12}
            type='text' id="1.2"
            onChange={timeChangeHandler}/>
        </div>

        <select className={styles.amDropdown} value={startAM}
          onChange={(e) => handleAMChange('start', e.target.value)}>
          <option id="am">AM</option>
          <option id="pm">PM</option>
        </select>
      </Box>

      <div>to</div>

      <Box display='flex' marginLeft='10px'>
        <Box className={styles.timeBlock}>
          <input className={styles.timeInputBox} value={time21}
            type='text' id="2.1" onChange={timeChangeHandler}/>
          <div>:</div>
          <input className={styles.timeInputBox} value={time22}
            type='text' id="2.2" onChange={timeChangeHandler}/>
        </Box>

        <select className={styles.amDropdown} value={endAM}
          onChange={(e) => handleAMChange('end', e.target.value)}>
          <option id="am">AM</option>
          <option id="pm">PM</option>
        </select>
      </Box>
    </div>);
}
