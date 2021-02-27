import styles from './styles.module.sass';
import Popover from '@material-ui/core/Popover';
import AddCircleIcon from '../../../../../public/images/Add.svg';
import Button from '@material-ui/core/Button';
import PopoverCard from './Popover';
import DeleteIcon from '../../../../../public/images/TrashGrey.svg';
import {useState} from 'react';


export default function Scheduling({formData, formDataUpdater}) {
  // popover handling starts here
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAddTiming = (e) => { // handles slot popover
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => { // handles slot popover
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // popover handling ends here

  let defaultSlots = [];
  let defaultFormTimings = [];
  if (formData.MformTimings!==undefined) {
    defaultFormTimings = formData.MformTimings;
  }
  const defaultSlotElements = [];
  if (formData.Mslots!==undefined) {
    defaultSlots = formData.Mslots;

    for (let i=0; i<defaultSlots.length; i++) {
      if (defaultSlots[i]===undefined) {
        continue;
      }
      defaultSlotElements.push(<SlotRow
        index={i}
        key={defaultSlots[i].length}
        startDate={defaultSlots[i].startDate}
        startTime={defaultSlots[i].startTime}
        endTime={defaultSlots[i].endTime}
        repeatSetting={defaultSlots[i].repeatSetting}
        endsSetting={defaultSlots[i].endsSetting}
        slotDeleter={deleteSlot}
      />);
    }
  }
  const [formTimings, setFormTimings] = useState(defaultFormTimings);
  const [slots, setSlots] = useState(defaultSlots);
  const [slotElements, setSlotElements] = useState(defaultSlotElements);

  function slotAdder(startDate, startTime, endTime,
      repeatSetting, endsSetting, formTiming) {
    const newSlots = slots;
    newSlots.push({startDate, startTime, endTime, repeatSetting, endsSetting});
    const newSlotElements = [];
    for (let i=0; i<slots.length; i++) {
      if (slots[i]!==undefined) {
        newSlotElements.push(<SlotRow
          index={i}
          key={slots[i].length}
          startDate={slots[i].startDate}
          startTime={slots[i].startTime}
          endTime={slots[i].endTime}
          repeatSetting={slots[i].repeatSetting}
          endsSetting={slots[i].endsSetting}
          slotDeleter={deleteSlot}
        />);
      } else {
        newSlotElements.push(undefined);
      }
    }
    const newFormTimings = [...formTimings, formTiming];
    setSlotElements(newSlotElements);
    setSlots(newSlots);
    setFormTimings(newFormTimings);
    formDataUpdater({Mslots: newSlots});

    for (let i=0; i<newFormTimings.length; i++) {
      if (newFormTimings[i]===undefined) {
        continue;
      }
      if (newFormTimings[i].selectedWeekDays===undefined) {
        continue;
      }
      newFormTimings[i].selectedWeekDays =
      [...newFormTimings[i].selectedWeekDays];
    }

    formDataUpdater({MformTimings: newFormTimings});
  }


  function deleteSlot(index) {
    const newSlots = slots;
    delete newSlots[index];
    const newFormTimings = formTimings;
    delete newFormTimings[index];

    const newSlotElements = [];
    for (let i=0; i<newSlots.length; i++) {
      if (newSlots[i]!==undefined) {
        newSlotElements.push(<SlotRow
          index={i}
          key={newSlots[i].length}
          startDate={newSlots[i].startDate}
          startTime={newSlots[i].startTime}
          endTime={newSlots[i].endTime}
          repeatSetting={newSlots[i].repeatSetting}
          endsSetting={newSlots[i].endsSetting}
          slotDeleter={deleteSlot}
        />);
      } else {
        newSlotElements.push(undefined);
      }
    }
    setFormTimings(newFormTimings);
    setSlotElements(newSlotElements);
    setSlots(newSlots);
    formDataUpdater({Mslots: newSlots});
    formDataUpdater({MformTimings: newFormTimings});
  }

  return (
    <div>
      <div className={styles.headingMain}>Membership Schedule</div>

      <div className={styles.heading}>Timings
        <span className={styles.star}>*</span></div>
      <div>
        {slotElements}
      </div>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={handleAddTiming}
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
          slotAdder={slotAdder} formTimings={formTimings}/>
      </Popover>
    </div>
  );
}

function SlotRow({index, startDate, startTime, endTime,
  repeatSetting, endsSetting, slotDeleter}) { // days is a set.
  return (
    <div className={styles.slotRow}>
      <div className={styles.slot}>
        <div>
          {'from ' + startDate}
        </div>
        <div className={styles.timing}>
          {`${startTime} - ${endTime}`}</div>
        <div>
          {repeatSetting}
        </div>
        <div>
          {endsSetting}
        </div>
      </div>
      <DeleteIcon className={styles.deleteIcon}
        onClick={() => slotDeleter(index)}/>
    </div>
  );
}
