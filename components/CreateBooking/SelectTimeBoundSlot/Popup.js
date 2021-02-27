import styles from './styles.module.sass';
import {useState, useEffect} from 'react';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DeleteIcon from '../../../public/images/TrashGrey.svg';
import api from '../../../lib/api';
import moment from 'moment';
import axios from 'axios'

export default function SelectSlotPopup({id, continueHandler}) {
  const [date, setDate] = useState(null);
  const [error, setError] = useState('');
  const [slots, setSlots] = useState([]);// recieved with api
  const [slotBlocks, setSlotBlocks] = useState([]);// options shown for a date
  const [selectedSlots, setSelectedSlots] = useState([]);// passed to next stage
  const [slotElements, setSlotElements] = useState([]);// rows of selected slots

  function slotAdder(startTime, endTime, date) {
    const newSlots = selectedSlots;
    newSlots.push({startTime, endTime, date});

    const newSlotElements = [];

    for (let i=0; i<selectedSlots.length; i++) {
      if (selectedSlots[i]!==undefined) {
        newSlotElements.push(<SlotRow
          index={i}
          key={selectedSlots[i].length}
          startTime={selectedSlots[i].startTime}
          endTime={selectedSlots[i].endTime}
          days={selectedSlots[i].date}
          slotDeleter={deleteSlot}
        />);
      } else {
        newSlotElements.push(undefined);
      }
    }
    setSlotElements(newSlotElements);
    setSelectedSlots(newSlots);
  }


  function deleteSlot(index) {
    const newSlots = selectedSlots;
    delete newSlots[index];

    const newSlotElements = [];
    for (let i=0; i<newSlots.length; i++) {
      if (newSlots[i]!==undefined) {
        newSlotElements.push(<SlotRow
          index={i}
          key={newSlots[i].length}
          startTime={newSlots[i].startTime}
          endTime={newSlots[i].endTime}
          days={newSlots[i].date}
          slotDeleter={deleteSlot}
        />);
      } else {
        newSlotElements.push(undefined);
      }
    }

    setSlotElements(newSlotElements);
    setSelectedSlots(newSlots);
  }

  // const slotTest = {
  //   method: 'post',
  //   url: 'http://localhost:3000/users/testingSlots',
  //   data: slots
  // }

  useEffect(() => {
    console.log(slots)
    setSlots(slots)
    // axios(slotTest)
      // .then((res) => console.log(res))
  }, [slots])

  function onSlotClicked(index) { // index of slots
    slotAdder(slots[index].substring(0, 2), slots[index].substring(0, 2), date);
  }


  function slotBlocksCreator(newSlots) {
    // const slotBlocks = new Array(newSlots.length);
    // for (let i=0; i<newSlots.length; i++) {
      /* slotBlocks[i] = (
       <div className={styles.slotBlock}
          onClick={() => onSlotClicked(i)}>
          <div className={styles.unselectedSlot}>
            {newSlots[i]}
          </div>
        </div>
      ) */
     
    // }
    // console.log(slots)
    setSlotBlocks(newSlots);
    setSlots(newSlots);
  }




  function handleContinue() {
    if (selectedSlots.length===0) {
      setError('Please select a slot');
      return;
    }
    // to check if all elements are undefined
    // which means no slot selected
    let flag = 'invalid';
    for (let i=0; i<selectedSlots.length; i++) {
      if (selectedSlots[i]!==undefined) {
        flag = 'valid';
      }
    }
    if (flag==='invalid') {
      setError('Please select a slot');
      return;
    }

    continueHandler(date, selectedSlots);
  }

  function handleDateSelection(dateStr) {
    api.getFreeSlots(id, dateStr)
        .then((res) => {
          setSlots(res.data.slots);
          slotBlocksCreator(res.data.slots);
        })
        .catch(() => {
          // todo
        });
    setDate(dateStr);
  }

  return (
    <div className={styles.outermost}>
      <div className={styles.heading}>
        Select Slot
      </div>

      <div className={styles.subheading}>
        Select Date
      </div>

      <Calendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

        headerToolbar={{
          left: 'today prev,next',
          center: 'title',
          right: 'month',
        }}
        selectable={true}
        initialView="dayGridMonth"

        dateClick={(info) => {
          handleDateSelection(info.dateStr);
        }}
      />

      <div className={styles.subheading}>
        Select time
      </div>

      <div className={styles.slotsContainer}>
        {/* slotBlocks */}
        {slotBlocks.map((slot, i) => (
          <div className={styles.slotBlock} onClick={() => onSlotClicked(i)}>
            <div className={styles.unselectedSlot} >
              {slot}
            </div>
          </div>  
        ))}
        
      </div>
      <div>
        {slotElements}
      </div>
      <div className={styles.errorMessage}>
        {error}
      </div>
      <div className={styles.continueButtonContainer}>
        <div className={styles.continueButton}
          onClick={handleContinue}>
        Continue to booking
        </div>
      </div>
    </div>
  );
}


function SlotRow({index,
  startTime, endTime, date, slotDeleter}) {
  return (
    <div className={styles.slotRow}>
      <div className={styles.slot}>
        <div className={styles.timing}>
          {`${startTime} - ${endTime}` + ' ' +
          `${moment(date).format('MMMM Do YYYY')}`}</div>
      </div>
      <DeleteIcon className={styles.deleteIcon}
        onClick={() => slotDeleter(index)}/>
    </div>
  );
}
