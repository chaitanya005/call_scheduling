import React, { Component } from 'react'
import TimeSvg from '../../../../public/images/time.svg'
import Location from '../../../../public/images/location.svg'
import Ruppee from '../../../../public/images/ruppee.svg'
import EventNotify from '../../../../public/images/EventNotify.svg'
import EventMessages from '../../../../public/images/eventMessages.svg'
import EventActionNotify from '../../../../public/images/eventActionNotify.svg'
import EventDetails from '../../../../public/images/eventDetails.svg'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid';
import styles from './Modal.module.sass'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Modal from './Modal'
import api from '../BookingsTable/apiCore'
import Bookings from '../BookingsTable/Bookings'
import moment from 'moment'

class Details extends Component {
    state = {
        dropDown: '',
        notifyTime: '',
        payoutMethodSelected: false,
        open: false,
        booking: [],
        bookings: [],
    }

    handleChange = (event) => {
        this.setState({
            dropDown: event.target.value
        })

    };

    handleNotifyTime = (event) => {
        this.setState({
            notifyTime: event.target.value
        })
    }

    handleShowDetails = (name, email, phone) => {
        // console.log(name, email, phone)
        const singleBooking = {name, email, phone}
        this.setState({
            open: true,
            booking: singleBooking
        })
    }

    handleDetailsClose = () => {
        this.setState({
            open: false
        })
    }

    componentDidMount() {
        if (localStorage.getItem('userInfo')) {
            var data = JSON.parse(localStorage.getItem('userInfo'))
            // console.log(data)
            api.getBookings(data.userId).then(
                (response) => {
                // console.log(response)
                this.setState({
                    bookings:  response.data.data
                })
                },
            ).catch(
                (error) => {
                    alert('There was an error fetching some listings. '+error.toString());
                },
            );
        }
    }

    render() {
        // console.log(this.props.singleEvent)
        // const booking = this.props.singleBooking
        const event = this.props.singleEvent
        // console.log(event)
        // console.log(this.state.booking)
        return (
            <div>
            <Modal show={this.state.open}  booking = {this.state.booking} button='userDetails' modalClosed={this.handleDetailsClose} />

                <div style = {{width: '450px'}}>
                    <h4>Event Details</h4>

                    <Divider />

                    {/* <Button className={styles.eventDetailsbtn}>Overview</Button> */}
                    {/* <Button className={styles.eventDetailsbtn} style={{ backgroundColor: '#E8EBEE', color: '#000' }}>Messages</Button> */}
                    {this.props.button == 'eventDetails' ?
                        <div>
                            {event.serviceType == 5 ?
                                <div>
                                    <div style={{ marginLeft: '5%' }}>
                                    <h2 style={{ marginBottom: '0%' }}>{event.name}</h2>
                                    <p>Membership</p> 
                                    

                                    <div className={styles.eventAttributes}>
                                        <div>
                                            <TimeSvg />
                                        </div>
                                        {event.slots.map(slot => (
                                            <React.Fragment>
                                                <div style={{ marginLeft: '2%', }}>Timing:</div>
                                                <div style={{ marginLeft: '1%', }}>{slot.startDate}</div>
                                                <div style={{ margin: '2% 1%', width: '3px', height: '3px', borderRadius: '5px', background: '#33393F' }}></div>
                                                <div>{slot.startTime} - {slot.endTime}</div>
                                                {/* <div style={{ margin: '2% 1%', width: '3px', height: '3px', borderRadius: '5px', background: '#33393F' }}></div>
                                                <div>{}</div> */}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                        
                                        

                                        <div className={styles.eventAttributes}>
                                            <div>
                                                <Ruppee />
                                            </div>
                                            <div className={styles.eventCharas}>Price: ₹ {event.price}</div>
                                        </div>

                                        <div className={styles.eventAttributes}>
                                            <div>
                                                <Location />
                                            </div>
                                            <div className={styles.eventCharas}>Location: Google Meet {event.eventLink} </div>
                                        </div>


                                        {/* <div className={styles.eventAttributes}>
                                            <div>
                                                <EventNotify />
                                            </div>
                                            <div className={styles.eventCharas}>
                                                <select
                                                    value={this.state.dropDown}
                                                    onChange={this.handleChange}
                                                    className={styles.dropDown}>
                                                    <option value="notification">Notification</option>
                                                    <option value="email">Email</option>
                                                </select>
                                                <input type="text" className={styles.inputField} />
                                                <select
                                                    value={this.state.notifyTime}
                                                    onChange={this.handleNotifyTime}
                                                    className={styles.dropDown}>
                                                    <option value="minutes">minutes</option>
                                                    <option value="hours">hours</option>
                                                    <option value="days">days</option>
                                                    <option value="weeks">weeks</option>
                                                </select>
                                            </div>
                                        </div> */}

                                    </div>

                                </div>
                            :  
                                <div>
                                    {event.serviceType == 3 ? 
                                        <div>
                                        <div style={{ marginLeft: '5%' }}>
                                        <h2 style={{ marginBottom: '0%' }}>{event.name}</h2>
                                        <p>One Time Event</p> 
                                        
    
                                        <div className={styles.eventAttributes}>
                                            <div>
                                                <TimeSvg />
                                            </div>
                                                <React.Fragment>
                                                    <div style={{ marginLeft: '2%', }}>Timing:</div>
                                                    <div style={{ marginLeft: '1%', }}> {event.date} </div>
                                                    <div style={{ margin: '2% 1%', width: '3px', height: '3px', borderRadius: '5px', background: '#33393F' }}></div>
                                                    <div>{moment(event.startTime).format('hh:mm A')} - {moment(event.endTime).format('hh:mm A')}</div>
                                                    {/* <div style={{ margin: '2% 1%', width: '3px', height: '3px', borderRadius: '5px', background: '#33393F' }}></div>
                                                    <div>{}</div> */}
                                                </React.Fragment>
                                        </div>
                                            
                                            
    
                                            <div className={styles.eventAttributes}>
                                                <div>
                                                    <Ruppee />
                                                </div>
                                                <div className={styles.eventCharas}>Price: ₹ {event.price}</div>
                                            </div>
    
                                            <div className={styles.eventAttributes}>
                                                <div>
                                                    <Location />
                                                </div>
                                                <div className={styles.eventCharas}>Location: {event.eventLink} </div>
                                            </div>
    
    
                                            <div className={styles.eventAttributes}>
                                                <div>
                                                    <EventNotify />
                                                </div>
                                                <div className={styles.eventCharas}>
                                                    <select
                                                        value={this.state.dropDown}
                                                        onChange={this.handleChange}
                                                        className={styles.dropDown}>
                                                        <option value="notification">Notification</option>
                                                        <option value="email">Email</option>
                                                    </select>
                                                    <input type="text" className={styles.inputField} />
                                                    <select
                                                        value={this.state.notifyTime}
                                                        onChange={this.handleNotifyTime}
                                                        className={styles.dropDown}>
                                                        <option value="minutes">minutes</option>
                                                        <option value="hours">hours</option>
                                                        <option value="days">days</option>
                                                        <option value="weeks">weeks</option>
                                                    </select>
                                                </div>
                                            </div>
    
                                        </div>
    
                                    </div> 
                                    : ''}
                                </div>
                            }

                            
                            
                            <div className={styles.columns}>
                                <Grid container spacing={3} className={styles.columnsGrid}>
                                    <Grid item xs={4}>
                                        Customer Name
                                </Grid>
                                    <Grid item xs={4}>
                                        Payment Status
                                </Grid>
                                    <Grid item xs={4}>
                                        Actions
                                </Grid>
                                </Grid>
                            </div>

                            
                            <div>
                            {this.state.bookings.map(booking => (
                            <div>
                            {booking.listingId === event.id ? 
                            <Grid
                                container spacing={3}
                                className={styles.rows}
                            >
                                <Grid item xs={4}>
                                    <Link href=""><div style={{ cursor: 'pointer' }}>
                                    {booking.customerName !== " " && booking.customerName !== null && booking.customerName !== "undefined undefined" ? 
                                            <div>
                                                {booking.customerName}
                                            </div>
                                        : 
                                            <div>
                                                {booking.email !== null ? 
                                                    <div>
                                                        {booking.email}
                                                    </div>
                                                : 
                                                    <div>
                                                        {booking.phoneNumber}
                                                    </div>
                                            }
                                            </div>
                                        }
                                    </div>
                                    </Link>
                                </Grid>
                                <Grid item xs={4}>
                                    {booking.paymentStatus == '0' ?
                                        <div className={styles.badge} style={{ backgroundColor: '#bbe5b3' }}>
                                            Paid
                                            </div> :
                                        <div>
                                            {booking.paymentStatus == '1' ?
                                                <div className={styles.badge} style={{ backgroundColor: '#FFEA8A' }}>
                                                    Payment Processing
                                                    </div> :
                                                <div>
                                                    {booing.paymentStatus == '3' ?
                                                        <div className={styles.badge} style={{ backgroundColor: '#FEADA5' }}>
                                                            Payment Failed
                                                            </div> : ""
                                                    }</div>
                                            }
                                        </div>
                                    }
                                </Grid>
                                <Grid item xs={4} style={{ display: 'flex', flexDirection: 'row', margin: '-5px 0' }}>
                                    <div className={styles.eventActions}>
                                        <div className={styles.actionSvg} onClick={() => this.handleShowDetails(booking.customerName, booking.email, booking.phoneNumber)}><EventDetails /></div>
                                    </div>
                                    <div className={styles.eventActions}>
                                        <div className={styles.actionSvg}><a href= {`mailto:${booking.email}?subject=Event Name: ${event.name}, Event Date: ${event.date}`}><EventMessages /></a></div>
                                    </div>
                                    {/* <div className={styles.eventActions}>
                                        <div className={styles.actionSvg}><EventActionNotify /></div>
                                    </div> */}
                                </Grid>
                            </Grid>
                            : '' }
                            </div>
                            ))}
                            </div>
                            
                               
                        </div>
                        
                        : 
                        ''
                    }

                    {/* <div className={styles.functionBtns}>
                        <Button className={styles.btn} onClick={this.props.modalClosed} style={{ border: '1px solid #2242A4', background: '#2242A4' }} color="default">
                            <div style={{ color: '#fff' }}>Save</div>
                        </Button>
                        <Button className={styles.btn} style={{ border: '1px solid #2242A4', width: '125px', background: '#fff' }} color="default">
                            <div style={{ color: '#2242A4' }}>Reschedule</div>
                        </Button>
                        <Button className={styles.btn} style={{ background: '#fff', border: '1px solid #2242A4' }} color="secondary">
                            <div style={{ color: '#2242A4', }}>Cancel</div>
                        </Button>
                    </div> */}

                </div>



                
            </div>
        )
    }
}

export default Details
