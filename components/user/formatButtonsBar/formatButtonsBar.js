import BlockViewDarkIcon from '../../../public/images/blockViewDark.svg';
import BlockViewLightIcon from '../../../public/images/blockView.svg';
import ListViewDarkIcon from '../../../public/images/listViewDark.svg';
import ListViewLightIcon from '../../../public/images/listView.svg';
import {useState} from 'react';

import styles from './styles.module.sass';

const initialFilterState = {
  all: true,
  oneTime: false,
  timeBound: false,
  project: false,
  membership: false,
};


export default function buttonsBar({filteringHandler, formattingHandler}) {
  const [filterState, setfilterState] = useState(initialFilterState);
  const [icon, setIcon] = useState({
    blocks: <BlockViewLightIcon />,
    list: <ListViewDarkIcon />,
    color1: '#484F56',
    color2: 'inherit',
  });
  // change color of the button clicked and filter accordingly
  function filterClickHandler(name) {
    const newState = {...initialFilterState};
    newState.all = false;
    newState[name] = true; // show option as selected
    setfilterState(newState);
    filteringHandler(name); // callback to change listings accordingly
  }

  // change color of the button clicked and format accordingly
  function formatClickHandler(e, name) {
    if (name==='blocks') {
      setIcon({
        blocks: <BlockViewLightIcon />,
        list: <ListViewDarkIcon />,
        color1: '#484F56',
        color2: 'inherit',
      });
    } else {
      setIcon({
        blocks: <BlockViewDarkIcon />,
        list: <ListViewLightIcon />,
        color1: 'inherit',
        color2: '#484F56',
      });
    }
    formattingHandler(name);
  }

  return (
    <div className={styles.buttonBar}>

      {/* buttons that handle filter */}
      <div className={styles.buttonGroup}>
        <button className=
          {filterState.all? styles.filterActive : styles.filterInactive}
        name='all' onClick={() => filterClickHandler('all')}>
          All
        </button>

        {/* <div>
        <button className=
          {filterState.timeBound? styles.filterActive : styles.filterInactive}
        name="timeBound" onClick={() => filterClickHandler('timeBound')}>
          Time Bound Event
        </button>

        <button className=
          {filterState.oneTime? styles.filterActive : styles.filterInactive}
        name="oneTime" onClick={() => filterClickHandler('oneTime')}>
          One Time Event
        </button>

        <button className=
          {filterState.project? styles.filterActive : styles.filterInactive}
        name="project" onClick={() => filterClickHandler('project')}>
          Project Based Service
        </button>

        <button className=
          {filterState.membership? styles.filterActive : styles.filterInactive}
        name="membership" onClick={() => filterClickHandler('membership')}>
          Membership
        </button>
        </div> */}
      </div>


      {/* buttons that handle formatting */}
      {/* <div className={styles.listOrGrid}>
        <div className={styles.iconBox} style={{backgroundColor: icon.color1}}
          onClick={(e) => formatClickHandler(e, 'blocks')}>
          {icon.blocks}
        </div>

        <div className={styles.iconBox} style={{backgroundColor: icon.color2}}
          onClick={(e) => formatClickHandler(e, 'list')}>
          {icon.list}
        </div>
      </div> */}
    </div>
  );
};
