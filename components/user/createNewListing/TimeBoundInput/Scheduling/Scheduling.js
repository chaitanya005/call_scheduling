import PopoverCard from './AddTimingPopover';
import AddCircleIcon from '../../../../../public/images/Add.svg';
import Button from '@material-ui/core/Button';
import styles from './styles.module.sass';
import Popover from '@material-ui/core/Popover';
import {useState, useEffect} from 'react';
import DeleteIcon from '../../../../../public/images/TrashGrey.svg';

export default function Scheduling({formData, formDataUpdater, listing}) {
  // popover handling starts here
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => { // handles slot popover
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => { // handles slot popover
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // popover handling ends here

  let defaultSlots = [];
  const defaultSlotElements = [];
  const [slots, setSlots] = useState(defaultSlots);
  const [slotElements, setSlotElements] = useState(defaultSlotElements);

  useEffect(() => {
    if (listing !== null && listing !== undefined) {
      setSlots(listing.serviceSchedule)
      // console.log(listing.serviceSchedule)
      if (listing.serviceSchedule){ 
        // for (let i = 0;  i <  listing.serviceSchedule.length; i++) {
        //   defaultSlotElements.push(<SlotRow
        //     index={i}
        //     key={listing.serviceSchedule[i].length}
        //     startTime={listing.serviceSchedule[i].startTime}
        //     endTime={listing.serviceSchedule[i].endTime}
        //     days={listing.serviceSchedule[i].days}
        //     slotDeleter={deleteSlot}
        //   />)
        // }
        defaultSlots = listing.serviceSchedule

        for (let i=0; i<defaultSlots.length; i++) {
          if (defaultSlots[i]===undefined) {
            continue;
          }
          defaultSlotElements.push(<SlotRow
            index={i}
            key={defaultSlots[i].length}
            startTime={defaultSlots[i].startTime}
            endTime={defaultSlots[i].endTime}
            days={defaultSlots[i].days}
            slotDeleter={deleteSlot}
          />);
        }
      }
      setSlotElements(defaultSlotElements)
      setSlots(listing.serviceSchedule)
      formDataUpdater({TBslots: listing.serviceSchedule})
      // console.log(defaultSlots, defaultSlotElements, slotElements)
    }
  }, [listing])

  
  if (formData.TBslots!==undefined) {
    defaultSlots = formData.TBslots;
    for (let i=0; i<defaultSlots.length; i++) {
      if (defaultSlots[i]===undefined) {
        continue;
      }
      defaultSlotElements.push(<SlotRow
        index={i}
        key={defaultSlots[i].length}
        startTime={defaultSlots[i].startTime}
        endTime={defaultSlots[i].endTime}
        days={defaultSlots[i].days}
        slotDeleter={deleteSlot}
      />);
    }
  }



  function slotAdder(startTime, endTime, days) {
    const newSlots = slots;
    console.log(slots)
    newSlots.push({startTime, endTime, days});

    const newSlotElements = [];
    for (let i=0; i<slots.length; i++) {
      if (slots[i]!==undefined) {
        newSlotElements.push(<SlotRow
          index={i}
          key={slots[i].length}
          startTime={slots[i].startTime}
          endTime={slots[i].endTime}
          days={slots[i].days}
          slotDeleter={deleteSlot}
        />);
      } else {
        newSlotElements.push(undefined);
      }
    }
    setSlotElements(newSlotElements);
    setSlots(newSlots);
    formDataUpdater({TBslots: newSlots});
  }


  function deleteSlot(index) {
    const newSlots = slots;
    delete newSlots[index];

    const newSlotElements = [];
    for (let i=0; i<newSlots.length; i++) {
      if (newSlots[i]!==undefined) {
        newSlotElements.push(<SlotRow
          index={i}
          key={newSlots[i].length}
          startTime={newSlots[i].startTime}
          endTime={newSlots[i].endTime}
          days={newSlots[i].days}
          slotDeleter={deleteSlot}
        />);
      } else {
        newSlotElements.push(undefined);
      }
    }

    setSlotElements(newSlotElements);
    setSlots(newSlots);
    formDataUpdater({TBslots: newSlots});
  }

  return (
    <div>
      <div className={styles.heading}>Service Schedule
        <span className={styles.required}>*</span>
      </div>
      <div className={styles.subHeading}>
      Click on Add Timing Button to add service timings to your schedule.
      </div>
      <div>
        {slotElements}
      </div>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={handleClick}
      >
        Add New Timing
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <PopoverCard className={styles.popover} closer={handleClose}
          slotAdder={slotAdder}/>
      </Popover>
    </div>
  );
}

function SlotRow({index,
  startTime, endTime, days, slotDeleter, listing}) { // days is a set.
  let daysString = 'every ';
  days.forEach((day) => {
    daysString = daysString + day + ', ';
  });

  // console.log('slotRow')
  

  daysString = daysString.slice(0, -2); // remove ', ' from the end


  return (
    <div className={styles.slotRow}>
      <div className={styles.slot}>
        <div className={styles.timing}>
          {`${startTime} - ${endTime}`}</div>
        <div>
          {daysString}
        </div>
      </div>
      <DeleteIcon className={styles.deleteIcon}
        onClick={() => slotDeleter(index)}/>
    </div>
  );
}
