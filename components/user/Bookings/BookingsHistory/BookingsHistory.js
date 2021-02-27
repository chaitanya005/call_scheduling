import React, { Component } from 'react'
import AppBar from '../../AppBar/AppBar'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import styles from './BookingsHistory.module.sass'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LeftArrow from '../../../../public/images/leftarrow.svg'
import Link from 'next/link'
import BookingsIcon from '../../../../public/images/Bookings.svg';
import CalenderIcon from '../../../../public/images/CalenderIcon.svg';
import ListingIcon from '../../../../public/images/ListingIcons.svg';
import Transaction from './TransactionStatus'
import Modal from '../Modal/Modal'
import moment from 'moment'



function DateAndTime ({date}) {
    const d = moment(date).format('MM/DD/YYYY')
    const time = moment(date).format('HH:mm')
    // console.log(d)
    return (
        <React.Fragment>
            {d} at {time} 
        </React.Fragment>
    )
}


class BookingsHistory extends Component {

    state = {
        isCancelClicked: false,
        isRescheduleClicked: false
    }
    
    cancelHandler = () => {
        this.setState({
            isCancelClicked: true
        })
    }

    cancelling = () => {
        this.setState({
            isCancelClicked: false
        })
    }

    rescheduleHandler = () => {
        this.setState({isRescheduleClicked: true})
    }

    rescheduleCancelHandler = () => {
        this.setState({isRescheduleClicked: false})
    }


    render() {

        // console.log(this.props.bookings)
    return (

        
        <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px',}}
            variant='outlined'>
        <AppBar />

        <Divider />

        <div className = {styles.bookingsDetails}>
                <h3>BookingsDetails {/* #B97{this.props.id} */}</h3>
        </div>
        
        <Divider />
        <Modal show = {this.state.isCancelClicked} button = 'cancel' modalClosed = {this.cancelling} />
        <Modal show = {this.state.isRescheduleClicked} button = 'reschedule' modalClosed = {this.rescheduleCancelHandler} />


        <div className = {styles.BackDrop}>

      

        <div className = {styles.div} >
                <div className = {styles.id}>
                <Link href =  "/user/bookings" >
                    <div className = {styles.backTo}><LeftArrow style = {{marginRight: '10px'}} />Bookings</div>
                </Link>
                
                {/* <div className = {styles.buttons}>
                    <Button className =  {styles.btn} style = {{width: '148px'}} color="default">
                        <div style = {{color: '#484F56'}}>Go to Latest Event</div>
                    </Button>
                    <Button className =  {styles.btn} color="default">
                        <div style = {{color: '#484F56'}} onClick = {this.rescheduleHandler}>Reschedule</div></Button>
                    <Button className =  {styles.btn} color="default" onClick = {this.cancelHandler}>
                        <div style = {{color: '#484F56'}}>Cancel</div>
                    </Button>
                </div> */}

                </div>
           </div>
           <div style ={{overflow: 'auto', height: '510px'}}>

           {this.props.bookings.length !== 0 ? 
            <div>
            {this.props.bookings.map(booking => (
                <div key = {booking.id}>
                {this.props.id == booking.id ?
                 <div>
                    <div>
                             <Grid container >
                             <Grid  className = {styles.grid}>
                                 <Grid container  spacing={5}>
                                         <Grid item>
                                             <Paper className = {styles.card}>
                                                 <div style = {{display: 'flex', flexDirection: 'row'}}>
                                                     <div className = {styles.circle}> 
                                                         <BookingsIcon className = {styles.bookingsIcon} />
                                                     </div>
                                                     <div  style = {{marginTop: '7%', marginLeft: '40%'}}>Booking</div>
                                                 </div>
             
                                                 <div className = {styles.bookingDetails}>
                                                     <div><b>#B{booking.listingId}{booking.id}</b></div>
                                                     <div>
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
                                                     <DateAndTime date = {booking.createdAt} />
                                                 </div>
                                             </Paper>
                                         </Grid>
                                       {/* <Grid item>
                                             <Paper className = {styles.card}>
                                                 <div style = {{display: 'flex', flexDirection: 'row'}}>
                                                     <div className = {styles.circleEvent}> 
                                                         <CalenderIcon className = {styles.bookingsIcon} />
                                                     </div>
                                                     <div  style = {{marginTop: '7%', marginLeft: '40%'}}>Event</div>
                                                 </div>
             
                                                 <div className = {styles.bookingDetails}>
                                                     <div style = {{marginTop: '10%'}}><b>#E97{booking.id}</b></div>
                                                     <div  style = {{width: '200px', marginRight: '-40%'}}>{booking.listingDate} {booking.listingTime}</div>
                                                 </div>
                                             </Paper>
                                         </Grid> */}
  
                                          <Grid item>
                                             <Paper className = {styles.card}>
                                                 <div style = {{display: 'flex', flexDirection: 'row'}}>
                                                     <div className = {styles.circleListing}> 
                                                         <ListingIcon className = {styles.bookingsIcon} />
                                                     </div>
                                                     <div  style = {{marginTop: '7%', marginLeft: '40%'}}>Event</div>
                                                 </div>
             
                                                 <div className = {styles.bookingDetails}>
                                                    <div><b>{booking.name}</b></div>
                                                        {booking.serviceType == 2 ? 
                                                            <div className={styles.addition}>
                                                                Time Bound Event
                                                            </div>
                                                        :
                                                        <div>
                                                            {booking.serviceType == 3 ? 
                                                                <div className={styles.addition}>
                                                                    One Time Event
                                                                </div>
                                                            :
                                                                <div>
                                                                    {booking.serviceType  == 4 ?
                                                                        <div className={styles.addition}>
                                                                            Project Based Service
                                                                        </div>
                                                                    :
                                                                    <div className={styles.addition}>
                                                                        Membership
                                                                    </div>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                        }
                                                    <div>{moment(booking.listingDate).format('MM/DD/YYYY')} at {moment(booking.listingTime).format('hh:mm A')}</div>
                                                 </div>
                                             </Paper>
                                         </Grid>
                                  </Grid>
                              </Grid>
                          </Grid>    
                 </div>
                </div>
                : "" }
                </div>
             ))}
            
            </div> : ''
            }
            
         
             
          <div>
       
            <Transaction id = {this.props.id} bookings = {this.props.bookings}/>
    {/*
            <div className = {styles.activityLog}>
                <h4>Activity Log</h4>
                <Divider />

                <div>
                <p style = {{fontSize: '12px', fontWeight: '600'}}>OCTOBER 1, 2020</p>
                
                <div className  = {styles.activites}>
                    <p>Event marked as complete by admin</p>
                    <p style = {{marginLeft:  '58%' }}>5:00 pm</p>
                </div>

                <div className  = {styles.activites}>
                    <p>Customer transaction success</p>
                    <p style = {{marginLeft:  '63.7%' }}>1:40 pm</p>
                </div>

                <div className  = {styles.activites}>
                    <p>Transaction reminder send to customer</p>
                    <p style = {{marginLeft:  '54.7%' }}>10:00 am</p>
                </div>

                <div className  = {styles.activites}>
                    <p>Event duplicated to create Event #41245  </p>
                    <p style = {{marginLeft:  '54%' }}>9:40 am</p>
                </div>

                
                </div>
          
            </div>
          */}          
          
            </div>


          
            

            </div>

        </div>
        </Paper>

    
    )
            }
}

export default BookingsHistory