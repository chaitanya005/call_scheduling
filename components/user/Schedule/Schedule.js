import React ,{ useState, useEffect } from 'react'
import AppBar from '../AppBar/AppBar'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import styles from './Schedule.module.sass'
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru"; //to change the location of calender
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from "@material-ui/core/colors";
import Tabs from './Buttons'
import Schedules from './ScheduleDays'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import axios from 'axios'
import FullCalender from './Calendar/Calendar'
import api from '../../../lib/api'

var leftCount = 1
var rightCount = 1
let prevWeekEnd
let prevWeekStart 
let nextWeek
let prevWeek


const theme = createMuiTheme({
    palette: {
      primary: { light: blue[300], main: blue[500], dark: blue[700] },
    },
  });


const Schedule  = ({name, email, image}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [newTab, setNewTab] = useState('schedule')
    const [currTab, setCurrTab] = useState(newTab)
    const [currentDate, setCurrentDate] = useState(moment())
    const [userId, setUserId] = useState(null)
    const [todayClicked, setTodayClicked] = useState(false)
    const [weekStart, setWeekStart] = useState(currentDate.clone().startOf('week').format('MMM D'))
    const [weekEnd, setWeekEnd] = useState(currentDate.clone().endOf('week').format('MMM D, YYYY'))
    const [listings, setListings] = useState([]);

    // console.log(moment("2021-01-09"))
    // console.log(listings)

   /*  function getUserId(response) {
        if (response.data.data.user) {
            setUserId(response.data.data.user.id)
        } else if (response.data.data.userResult) {
            let id = response.data.data.userResult.id
            console.log(response.data.data.userResult.id)
            api.getListingForAdvisor(response.data.data.userResult.id).then(
                (response) => {
                  updateListings(response.data.data);
                },
              ).catch(
                  (error) => {
                    alert('There was an error fetching some listings. '+error.toString());
                  },
              );
            setUserId(id)
        }
        // console.log(response)   
    } */

    function updateListings(data) { // adds data to listings state
        setListings(data);
    }
    

    useEffect(() => {
        /* const socialLogin = {
            method: 'post',
            url: 'http://localhost:3000/users/socialLogin',
        }  
        // console.log(name, email, image)      
        axios(Object.assign({}, socialLogin, { data: { email: email, userName: name, image: image } }))
            .then(res => getUserId(res))
            .catch((err) => console.log(err)) */

        if (localStorage.getItem('userInfo')) {
            var data = JSON.parse(localStorage.getItem('userInfo'))
            setUserId(data.userId)
            // console.log(data)
            api.getListingForAdvisor(data.userId).then(
                (response) => {
                updateListings(response.data.data.anotherTask);
                },
            ).catch(
                (error) => {
                    alert('There was an error fetching some listings. '+error.toString());
                },
            );
        }

    }, [])

    // console.log(listings)

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const switchHandler = (event) => {
        setNewTab(event)
        setCurrTab (() => {
            return (prev => {
                console.log(prev.event)
            })
        })
       
    }

    const currentDayHandler = () => {

        setWeekStart(currentDate.clone().startOf('week').format('MMM D'))
        setWeekEnd(currentDate.clone().endOf('week').format('MMM D, YYYY'))
        setTodayClicked(true)
        // console.log(weekStart)
        // console.log(weekEnd)
    }

    const handleLeftArrow = () => {
        
        if (prevWeek !== undefined) {
            leftCount = 1
            prevWeekStart = prevWeek.subtract(leftCount, 'weeks').startOf('week').format('MMM D')
            prevWeekEnd = prevWeek.clone().endOf('week').format('MMM D, YYYY')
            nextWeek = prevWeek.clone().endOf('week')
            leftCount++
        }else {
            prevWeekStart = moment().clone().subtract(leftCount, 'weeks').startOf('week').format('MMM D')
            prevWeekEnd = moment().clone().subtract(leftCount, 'weeks').endOf('week').format('MMM D, YYYY')
            nextWeek = moment().clone().subtract(leftCount, 'weeks')
            leftCount++
        }
        setWeekStart(prevWeekStart)
        setWeekEnd(prevWeekEnd)
        setTodayClicked(false)
    }


    const hanldeRightArrow = () => {

        if  (nextWeek) {
            prevWeekStart = nextWeek.add(1, 'weeks').startOf('week').format('MMM D')
            prevWeekEnd = nextWeek.endOf('week').format('MMM D, YYYY')
            prevWeek = nextWeek
        } else {
            prevWeekStart = moment().clone().add(rightCount, 'weeks').startOf('week').format('MMM D')
            prevWeekEnd = moment().clone().add(rightCount, 'weeks').format('MMM D, YYYY')
            prevWeek = moment().clone().add(rightCount, 'weeks')
            rightCount++
        }

        setWeekStart(prevWeekStart)
        setWeekEnd(prevWeekEnd)
        setTodayClicked(false)
    }

    var currentWeek = moment();
    // console.log(currentWeek)
    var currWeekStart = currentWeek.clone().startOf('week').format('MMM')
    // console.log(currWeekStart)
    var currWeekEnd = currentWeek.clone().endOf('week').format('MMM D, YYYY')

     return (
        <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px',}}
            variant='outlined'>
        <AppBar  />


        <Divider />

        <div className = {styles.title}>
                <h1>My Schedule</h1>
        </div>

        <Divider />
        
        <div className = {styles.BackDrop}>
            <Paper style={{flex: 5.5, margin: '20px', marginTop: '10px', borderRadius: '15px',background: '#fff'}}>
                
            {newTab == 'schedule' ?   
            <div> 
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <div  style = {{marginLeft: '25%', marginTop: '1%', }}>
                        <button onClick = {currentDayHandler}  style = {{border: 'none',borderRadius: '3px',padding: '7px 10px', background: 'none', border: '1px solid #CDD3D9', color: '#484F56'}}>Today</button>
                    </div>
                    <div style = {{marginLeft: '3%', marginTop: '18px', display: 'flex'}}>
                        <div onClick = {handleLeftArrow}><KeyboardArrowLeftIcon  /></div>
                        <div onClick = {hanldeRightArrow}><KeyboardArrowRightIcon /></div>
                    </div>
                    <div className = {styles.headTime}>
                        
                        <div>{weekStart} - {weekEnd}</div>
          
                        
                        
                    </div>
                    {/*<Tabs tabSwitching = {switchHandler}/>*/}
                </div>
                <Divider />
        
                <div style = {{display: 'flex', flexDirection: 'row', }}>
             
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <MuiThemeProvider theme={theme}>
                            <div style={{overflow: 'hidden',  width: '32%' }}>
                                <Calendar
                                    date={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </div>
                        </MuiThemeProvider>
                    </MuiPickersUtilsProvider> */}
                    
                    <Divider orientation = "vertical" style = {{height: '480px'}}/>
                    
                    <Schedules  todayClicked = {todayClicked} startDate = {prevWeek} endDate = {nextWeek} id = {userId} listings = {listings} />                    
                </div>
                
                </div>
            :
        
        <div>
            <div style = {{display: 'flex', flexDirection: 'row'}}>
                <Tabs tabSwitching = {switchHandler}/>
            </div>
                <Divider />
            <div className = {styles.wrapper}>
                <div className = {styles['container-fluid']}>
                    <div className = {styles.row}>
                        <div className = {styles.col_12}>
                            <div className = {styles.card_body}>
                                <div className = {styles.row}>
                                    <FullCalender />
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>

            </div>
        }

            </Paper>
        </div>
        
        
      
        
        </Paper>
    )
}

export default Schedule




//{moment(selectedDate).format('MMM D YYYY')}