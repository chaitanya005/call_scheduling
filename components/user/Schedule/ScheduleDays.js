import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Divider from '@material-ui/core/Divider';
import styles from './ScheduleDays.module.sass'
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import api from '../Bookings/BookingsTable/apiCore'
import axios from 'axios'
import Modal from '../Bookings/Modal/Modal'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { getDate } from 'date-fns';
import { identity } from '@fullcalendar/react';
import apiCall from '../../../lib/api'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        // backgroundColor: 'green'
    },
}));
// const events = [
//     {
//         id: 1,
//         eventId: 1,
//         eventTime: '10-11am',   //events 
//         eventDuration: '1 hour',    //bookings
//         eventName: 'SOP Critique',      //events
//         category: 'Time bound Service', //events
//         customerName: 'Bessie Copper',  //bookings
//         paymentStatus: 'Paid',  //bookings
//         eventDate: '29',        //events
//         eventDay: 'Nov ,Sun',   //events
//     },
//     {
//         id: 2,
//         eventId: 2,
//         eventTime: '2-2:30pm',
//         eventDuration: '30 mins',
//         eventName: 'Master your resume',
//         category: 'One Time Event',
//         customerName: 'Bessie Copper',
//         paymentStatus: 'Paid',
//         eventDate: '1',
//         eventDay: 'Dec ,Tue',
//     },
//     {
//         id: 3,
//         eventId: 3,
//         eventTime: '9-10am',
//         eventDuration: '1 hour',
//         eventName: 'English Basics - Level 1',
//         category: 'One Time Event',
//         customerName: 'Bessie Copper',
//         paymentStatus: 'Paid',
//         eventDate: '2',
//         eventDay: 'Dec ,Wed',
//     },
//     {
//         id: 4,
//         eventId: 4,
//         eventTime: '10-11am',
//         eventDuration: '1 hour',
//         eventName: 'SOP Critique',
//         category: 'Time bound Service',
//         customerName: 'Bessie Copper',
//         paymentStatus: 'Paid',
//         eventDate: '3',
//         eventDay: 'Dec ,Thu',
//     },
//     {
//         id: 5,
//         eventId: 5,
//         eventTime: '10-11am',
//         eventDuration: '1 hour',
//         eventName: 'SOP Critique',
//         category: 'Time bound Service',
//         customerName: 'Bessie Copper',
//         paymentStatus: 'Paid',
//         eventDate: '3',
//         eventDay: 'Dec ,Thu',
//     },
//     {
//         id: 6,
//         eventId: 6,
//         eventTime: '10-11am',
//         eventDuration: '1 hour',
//         eventName: 'SOP Critique',
//         category: 'Time bound Service',
//         customerName: 'Bessie Copper',
//         paymentStatus: 'Paid',
//         eventDate: '2',
//         eventDay: 'Dec ,Wed',
//     },
//     {
//         id: 7,
//         eventId: 7,
//         eventTime: '10-11am',
//         eventDuration: '1 hour',
//         eventName: 'SOP Critique',
//         category: 'Time bound Service',
//         customerName: 'Bessie Copper',
//         paymentStatus: 'Paid',
//         eventDate: '28',
//         eventDay: 'Nov ,Sat',
//     },
// ]

const ScheduleDays = ({ startDate, endDate, todayClicked, id, listings }) => {


    const [bookings, setBookings] = useState([])
    const [events, setEvents] = useState([])
    // const [eventDetailsClicked, setEventDetailsClicked] = useState(false)
    const [open, setOpen] = useState(false);
    const [singleEvent, setSingleEvent] = useState()
    const [singleBooking, setSingleBooking] = useState([])
    const [listingDate, setListingDate] = useState(null)
    const [listingDay, setListingDay] = useState(null)
    const [userId, setUserId] = useState(null)
    // const [noOfBookings, ]

    // let length = 0
    const [bookingLength, setBookingLength] = useState(null)

    const classes = useStyles();

    var todayDate = new Date();
    var todaysDate = moment(todayDate).format("D")
    var todaysDay = moment(todayDate).format("MMM ,ddd")
    var currentDate = moment();

    if (endDate) {
        var weekStart = endDate.clone().startOf('week')
    } else if (startDate) {
        var weekStart = startDate.clone().startOf('week')
    } else {
        var weekStart = currentDate.clone().startOf('week')
    }

    if (todayClicked) {
        var weekStart = moment().clone().startOf('week')
    }

    var dates = []
    var days = []
    for (let i = 0; i <= 6; i++) {
        dates.push(moment(weekStart).add(i, 'days').format("D"))
        days.push(moment(weekStart).add(i, 'days').format("MMM ,ddd"))
    }
    // console.log(listings)

    var date = []

    for (let i = 0; i <= 6; i++) {
        date.push(moment(weekStart).add(i, 'days'))
    }

    if (listings && listings.length !== 0) {
        for (let listing = 0; listing < listings.length; listing++) {

        }
    }

    const loadBookings = async (id) => {
        await api.getBookings(id)
                .then(res => {
                    let data = res.data.data
                    setBookings(data)
                    callingFun(data)
                })
                .catch(function (error) {
                    console.log(error);
                })
       
    }

    const callingFun = (items)  => {
        var length = {}
        // console.log(items)
        /* for (let listing of listings) {
            console.log(listing.id)
            var count = 0;
            for (let booking of items) {
                console.log(booking.id)
                if (listing.id === booking.listingId){
                    count++;
                }
            }
            length[listing.id] = count
        } */

        listings.map((listing) => {
            var count = 0
            items.map(item => {
                if (listing.id === item.listingId) {
                    count++
                }
            })
            length[listing.id] = count
        })

        // console.log(length)
        setBookingLength(length)
    }

    useEffect(() => {
       callingFun(bookings)
    //    if (bookingLength)
    }, [bookings.length === 0 ])

    // console.log(bookingLength && Object.keys(bookingLength), bookingLength && Object.values(bookingLength))

    

    useEffect(() => {
        // console.log(id)
        if (id !== null) {
            loadBookings(id)
        }
    }, [id])

    const eventDetails = (event) => {
        setSingleEvent(event)
        console.log(bookings)
        for (let booking = 0; booking < bookings.length; booking++) {
            if (bookings[booking].listingId == event.id) {
                setSingleBooking(bookings[booking])
                console.log(singleBooking)
            }
        }
        setOpen(!open)
    }

    // console.log(singleEvent)

    const eventDetailsClose = () => {
        setOpen(false)
    }

    

    return (

        <div className={styles.scheduleDays} style={{ overflow: 'auto' }}>
        <Modal show = {open} singleEvent = {singleEvent} singleBooking = {singleBooking} button = 'eventDetails' modalClosed = {eventDetailsClose} />
            {date.map((date, i) => (
                <div key={i}>
                    {moment(date).format('D') === todaysDate && moment(date).format('MMM ,ddd') === todaysDay ?
                        <Paper className={styles.divs}>
                            <div className={styles.todaySchedules} >
                                {moment(date).format('D')}
                            </div>
                            <div className={styles.todaysDay} style={{ width: '100px', marginBottom: '50px' }}>{moment(date).format('MMM ,ddd')}</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {listings && listings.map(event => (
                                    <div key={event.id}>
                                        <div> 
                                        {event.serviceType == 5 ?
                                            <div>
                                                {moment(date).format('YYYY-MM-D') == event.slots.map(slot => slot.startDate) ?
                                                    <Grid style={{ width: '500px', cursor: 'pointer' }} onClick={() => eventDetails(event)}>
                                                        <div>
                                                            <div style={{ display: 'flex' }}>
                                                                <div style={{ marginLeft: '5%', marginTop: '15px' }}>
                                                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="8" cy="8" r="8" fill="#2242A4" />
                                                                    </svg>
                                                                </div>
                                                                <Grid item xs={4} className={styles.eventTime}>
                                                                    <div style={{ width: '100px', marginTop: '5px' }}> {event.slots.map(slot => slot.startTime)} - {event.slots.map(slot => slot.endTime)} </div>
                                                                    <div style={{ fontWeight: '400', color: '#858D95' }}>{event.eventDuration}</div>
                                                                </Grid>

                                                                <Grid item xs={4} className={styles.eventName}>
                                                                    <div className={styles.name}>{event.name}</div>
                                                                    <div className={styles.description}>Membership</div>
                                                                </Grid>

                                                                {bookings.map(booking  => (
                                                                    <div>
                                                                    {booking.listingId == event.id ?
                                                                    <Grid item xs={4} className  ={styles.eventName}>
                                                                        <div className = {styles.name}>{booking.customerName}</div>
                                                                        {booking.paymentStatus == 0  ? 
                                                                            <div className = {styles.description}>Paid</div> : 
                                                                            <div> 
                                                                                {event.paymentStatus  == 1 ? 
                                                                                    <div className = {styles.description}>Payment Processing</div>     
                                                                                : 
                                                                                <div className = {styles.description}>Payment Failed</div>  
                                                                            }
                                                                            </div>
                                                                        }
                                                                    </Grid> 
                                                                    : ''}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    : ''}
                                        </div> 
                                        : 
                                                <div>
                                                    {event.serviceType == 3 ? 
                                                        <div>
                                                            {moment(date).format('YYYY-MM-DD') == moment(event.date).format('YYYY-MM-DD') ? 
                                                            <Grid style={{ width: '800px', cursor: 'pointer' }} onClick= {() => eventDetails(event)} >
                                                            <div>
                                                        
                                                                <div style={{ display: 'flex' }}>
                                                                    <div style={{ marginLeft: '5%', marginTop: '15px' }}>
                                                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <circle cx="8" cy="8" r="8" fill="#2242A4" />
                                                                        </svg>
                                                                    </div>
                                                                    <Grid item xs={4} className={styles.eventTime}>
                                                                        <div style={{ width: '150px', marginTop: '5px' }}> {moment(event.startTime).format('hh:mm A')} - {moment(event.endTime).format('hh:mm A')} </div>
                                                                        <div style={{ fontWeight: '400', color: '#858D95' }}>{event.eventDuration}</div>
                                                                    </Grid>
    
                                                                    <Grid item xs={4} className={styles.eventName}>
                                                                        <div className={styles.name}>{event.name}</div>
                                                                        <div className={styles.description}>One Time Event</div>            
                                                                    </Grid>
                
                                                                                {/* TOOD When booking are there */}
                                                                                {/* bookings.map(booking  => (
                                                                                    <div>
                                                                                    {booking.listingId == event.id ?
                                                                                    <Grid item xs={4} className  ={styles.eventName}>
                                                                                        <div className = {styles.name}>
                                                                                        {booking.customerName}
                                                                                        </div>
                                                                                        {booking.paymentStatus == 0  ? 
                                                                                            <div className = {styles.description}>Paid</div> : 
                                                                                            <div> 
                                                                                                {event.paymentStatus  == 1 ? 
                                                                                                    <div className = {styles.description}>Payment Processing</div>     
                                                                                                : 
                                                                                                <div className = {styles.description}>Payment Failed</div>  
                                                                                            }
                                                                                            </div>
                                                                                         }
                                                                                    </Grid>  
                                                                                    : ''}
                                                                                    </div>
                                                                                )) */}
                                                                                
                                                                                {bookingLength && Object.keys(bookingLength).map((bookingId, i) => (
                                                                                    <div>
                                                                                        {bookingId == event.id ? 
                                                                                            <Grid item xs={4} className  ={styles.eventName}>
                                                                                                <div className = {styles.name}>
                                                                                                    {Object.values(bookingLength)[i] !== 0 ? 
                                                                                                        <React.Fragment>
                                                                                                        {Object.values(bookingLength)[i]} Members
                                                                                                        </React.Fragment> 
                                                                                                        : ''} 
                                                                                                </div>  
                                                                                            </Grid>  
                                                                                        : 
                                                                                            <div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                            : '' }
                                                        </div> 
                                                        : 
                                                        ''//TODO when the TimeBound booking has slots api
                                                    }
                                                </div>
                                        }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                        :
                        <Paper className={styles.divs}>
                            <div className={styles.schedules} >
                                {moment(date).format('D')}
                            </div>
                            <div className={styles.days} style={{ width: '100px', marginBottom: '50px' }}>{moment(date).format('MMM ,ddd')}</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {listings && listings.map(event => (
                                    <div key={event.id}>
                                        <div> 
                                        {event.serviceType == 5 ?
                                            <div>
                                                {moment(date).format('YYYY-MM-D') == event.slots.map(slot => slot.startDate) ?
                                                    <Grid style={{ width: '500px', cursor: 'pointer' }} onClick= {() => eventDetails(event)}>
                                                        <div>
                                                            <div style={{ display: 'flex' }}>
                                                                <div style={{ marginLeft: '5%', marginTop: '15px' }}>
                                                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="8" cy="8" r="8" fill="#2242A4" />
                                                                    </svg>
                                                                </div>
                                                                <Grid item xs={4} className={styles.eventTime}>
                                                                    <div style={{ width: '100px', marginTop: '5px' }}> {event.slots.map(slot => slot.startTime)} - {event.slots.map(slot => slot.endTime)} </div>
                                                                    <div style={{ fontWeight: '400', color: '#858D95' }}>{event.eventDuration}</div>
                                                                </Grid>

                                                                <Grid item xs={4} className={styles.eventName}>
                                                                    <div className={styles.name}>{event.name}</div>
                                                                    <div className={styles.description}>Membership</div>
                                                                </Grid>


                                                                {bookings.map(booking  => (
                                                                <div>
                                                                {booking.listingId == event.id ?
                                                                <Grid item xs={4} className  ={styles.eventName}>
                                                                    <div className = {styles.name}>{booking.customerName}</div>
                                                                    {booking.paymentStatus == 0  ? 
                                                                        <div className = {styles.description}>Paid</div> : 
                                                                        <div> 
                                                                            {event.paymentStatus  == 1 ? 
                                                                                <div className = {styles.description}>Payment Processing</div>     
                                                                            : 
                                                                            <div className = {styles.description}>Payment Failed</div>  
                                                                        }
                                                                        </div>
                                                                    }
                                                                </Grid> 
                                                                : ''}
                                                                </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    : ''}
                                            </div> : 
                                        
                                                    <div>
                                                        {event.serviceType == 3 ? 
                                                        <div>
                                                            {moment(date).format('YYYY-MM-DD') == moment(event.date).format('YYYY-MM-DD') ? 
                                                            <Grid style={{ width: '800px', cursor: 'pointer' }} onClick= {() => eventDetails(event)} >{/* TODO when bookings */}
                                                            <div>
                                                                <div style={{ display: 'flex' }}>
                                                                    <div style={{ marginLeft: '5%', marginTop: '15px' }}>
                                                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <circle cx="8" cy="8" r="8" fill="#2242A4" />
                                                                        </svg>
                                                                    </div>
                                                                    <Grid item xs={4} className={styles.eventTime}>
                                                                        <div style={{ width: '150px', marginTop: '5px' }}> {moment(event.startTime).format('hh:mm A')} - {moment(event.endTime).format('hh:mm A')} </div>
                                                                        <div style={{ fontWeight: '400', color: '#858D95' }}>{/* event.eventDuration */}</div>
                                                                    </Grid>
    
                                                                    <Grid item xs={4} className={styles.eventName}>
                                                                        <div className={styles.name}>{event.name}</div>
                                                                        <div className={styles.description}>One Time Event</div>            
                                                                    </Grid>
                
                
                                                                                {/* bookings.map(booking  => (
                                                                                    <div>
                                                                                    {booking.listingId == event.id ?
                                                                                    <Grid item xs={4} className  ={styles.eventName}>
                                                                                        <div className = {styles.name}>
                                                                                       
                                                                                        </div>
                                                                                        {booking.paymentStatus == 0  ? 
                                                                                            <div className = {styles.description}>Paid</div> : 
                                                                                            <div> 
                                                                                                {event.paymentStatus  == 1 ? 
                                                                                                    <div className = {styles.description}>Payment Processing</div>     
                                                                                                : 
                                                                                                <div className = {styles.description}>Payment Failed</div>  
                                                                                            }
                                                                                            </div>
                                                                                        }
                                                                                    </Grid> 
                                                                                    : '' //TODO when the TimeBound booking has slots api
                                                                                 }
                                                                                    </div>
                                                                                )) */}
                                                                                {bookingLength && Object.keys(bookingLength).map((bookingId, i) => (
                                                                                    <div>
                                                                                        {bookingId == event.id ? 
                                                                                            <Grid item xs={4} className  ={styles.eventName}>
                                                                                                <div className = {styles.name}>
                                                                                                {Object.values(bookingLength)[i] !== 0 ? 
                                                                                                    <React.Fragment>
                                                                                                    {Object.values(bookingLength)[i]} Members
                                                                                                    </React.Fragment> 
                                                                                                    : ''} 
                                                                                                </div>
                                                                                            </Grid>  
                                                                                        : 
                                                                                            <div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                            : '' }
                                                        </div> : ''}
                                                    </div>
                                            }
                                            </div>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    }

                    <Divider />
                </div>
            ))}
             
        </div>

    )
}

export default ScheduleDays


{/* <div className = {styles.scheduleDays} style = {{overflow: 'auto'}}>
          
            {dates.map((date, i) => (
                <div key = {i}>
                        {date === todaysDate && days[i] === todaysDay ? 
                                <div>
                                <Paper className  = {styles.divs}>
                                    <div className = {styles.todaySchedules} >
                                        {date}
                                    </div>
                                    <div className = {styles.todaysDay} style = {{width: '100px', marginBottom: '50px'}}>{days[i]}</div>

                                    <div style = {{display: 'flex', flexDirection: 'column'}}>
                                    {events.map(event => (
                                        <div key = {event.id}>
                                        {date == event.eventDate && days[i] == event.eventDay ? 
                                           <div>
                                                {bookings.map(booking =>(
                                                    <div key = {booking.id}>
                                                        {booking.id == event.id ?                                                           
                                                            <Grid style = {{ width:'500px', cursor: 'pointer'}} onClick= {() => eventDetails(event, booking)}>
                                                            <div>
                                                            <div style = {{display: 'flex'}}>
                                                                    <div style = {{marginLeft: '5%', marginTop: '15px'}}>
                                                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="8" cy="8" r="8" fill="#2242A4"/>
                                                                        </svg>                        
                                                                    </div>
                                                                    <Grid item xs={4} className  ={styles.eventTime}>
                                                                        <div style = {{width: '100px', marginTop: '5px'}}>{event.eventTime} </div>
                                                                        <div style ={{fontWeight: '400', color: '#858D95'}}>{booking.eventDuration}</div>
                                                                    </Grid>

                                                                    <Grid item xs={4} className = {styles.eventName}>
                                                                        <div className = {styles.name}>{event.name}</div>
                                                                        <div className = {styles.description}>{event.description}</div>
                                                                    </Grid>
                                                                    
                                                                    <Grid item xs={4} className  ={styles.eventName}>
                                                                        <div className = {styles.name}>{booking.name}</div>
                                                                        {booking.paymentStatus == 2  ? 
                                                                            <div className = {styles.description}>Paid</div> : 
                                                                            <div> 
                                                                                {booking.paymentStatus  == 1 ? 
                                                                                    <div className = {styles.description}>Payment Processing</div>     
                                                                                : 
                                                                                <div className = {styles.description}>Payment Failed</div>  
                                                                            }
                                                                            </div>
                                                                        }
                                                                    </Grid>
                                                                </div>
                                                                </div>
                                                            </Grid>
                                                        : ''}
                                                    </div>
                                                ))}
                                           </div>
                                        : ''}
                                           
                                        </div>
                                    ))}

                                    </div>
                                </Paper>
                                </div>
                                :
                                <div >
                                <Paper className  = {styles.divs}>
                                    <div className = {styles.schedules} >
                                        {date} 
                                    </div>
                                    <div className = {styles.days} style = {{width: '100px', marginBottom: '50px'}}>{days[i]}</div>

                                    <div style = {{display: 'flex', flexDirection: 'column'}}>
                                     
                                        {days.map(day => (
                                            <div key = {day}>
                                                {listings.map(event => (
                                                    <div key = {event.id}>
                                                        {event.slots.map(slot => getDate(slot.startDate))}
                                                        {date == event.eventDate && day == event.eventDay ?
                                                        <div> 
                                                            {bookings.map(booking => (                                                        
                                                                <div key ={booking.id}> 
                                                                    <Grid className = {styles.mainGrid} key = {booking.id}>
                                                                        <div style = {{display: 'flex'}} onClick = {() => eventDetails(event, booking)}>
                                                                            <div className = {styles.circle}>
                                                                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <circle cx="8" cy="8" r="8" fill="#2242A4"/>
                                                                                </svg>                        
                                                                            </div>
                                                                            <Grid item xs={4} className  ={styles.eventTime}>
                                                                                <div className  = {styles.time}>{event.eventTime}</div>
                                                                                <div className = {styles.duration}>{booking.eventDuration}</div>
                                                                            </Grid>
                                                                        
                                                                            <Grid item xs={4} className = {styles.eventName}>
                                                                                <div className = {styles.name}>{event.name}</div>
                                                                                <div className = {styles.description}>{event.description}</div>
                                                                            </Grid>
                                                                            
                                                                            <Grid item xs={4} className  ={styles.eventName}>
                                                                                <div className = {styles.name}>{booking.name}</div>
                                                                                {booking.paymentStatus == 2  ? 
                                                                                    <div className = {styles.description}>Paid</div> : 
                                                                                    <div> 
                                                                                        {booking.paymentStatus  == 1 ? 
                                                                                            <div className = {styles.description}>Payment Processing</div>     
                                                                                        : 
                                                                                        <div className = {styles.description}>Payment Failed</div>  
                                                                                    }
                                                                                    </div>
                                                                                }
                                                                                
                                                                            </Grid>
                                                                        </div>
                                                                        <br />
                                                                    </Grid>  
                                                                </div>
                                                            ))}
                                                        </div>    
                                                        : ""}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
            
                                    </div>
                                </Paper>
                                </div>
                                }
                    
                    <Divider />
                </div>
            ))}

            <Modal show = {open} singleEvent = {singleEvent} singleBooking = {singleBooking} button = 'eventDetails' modalClosed = {eventDetailsClose} />
          
          
        </div> */}
