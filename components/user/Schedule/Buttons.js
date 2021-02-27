import React, {useState, useEffect} from 'react'
import styles from './Schedule.module.sass'
import Button from '@material-ui/core/Button';
// import { TrendingUpTwoTone } from '@material-ui/icons';

const defaultState =  {
    month: false,
    schedule: true
}

const Buttons = ({tabSwitching}) => {
    const [tabSwitch, setTabSwitch] = useState(defaultState)

    const tabSwitchHandler = (event) => {
        const newSwitch = {...defaultState}
        newSwitch.schedule = false
        newSwitch[event] = true
        setTabSwitch(newSwitch)
        tabSwitching(event)
        return tabSwitch.month
    }


    return (
        <div className = {styles.tabs}>
            <Button className = {tabSwitch.month ? styles.isActive :  styles.btns} color="default" variant = "contained" onClick =  {(e) => tabSwitchHandler('month')}>Month</Button>
            <Button className = {tabSwitch.schedule ? styles.isActive :  styles.btns} color="default" variant = "contained" onClick =  {(e) => tabSwitchHandler('schedule')}>Schedule</Button>
        </div>
    )
}

export default Buttons