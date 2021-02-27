import React, { Component }from 'react'
import Paper from '@material-ui/core/Paper';
import styles from './TransactionStatus.module.sass'
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import classes from './svg.module.css'

var showOneTime
var showTwoTime

const events = [
    {
        eventId: '#E9719', 
        date: 'October 05 2020 10:30 AM',
        status: 'Upcoming'
    },
    {
        eventId: '#E9718', 
        date: 'October 05 2020 10:30 AM',
        status: 'Complete'
    },
    {
        eventId: '#E9717', 
        date: 'October 05 2020 10:30 AM',
        status: 'Upcoming'
    },
    {
        eventId: '#E9716', 
        date: 'October 05 2020 10:30 AM',
        status: 'Complete'
    },
    {
        eventId: '#E9715', 
        date: 'October 05 2020 10:30 AM',
        status: 'Upcoming'
    },
    {
        eventId: '#E9714', 
        date: 'October 05 2020 10:30 AM',
        status: 'Upcoming'
    },
]



class TransactionStatus extends Component {
    state = {
        showOne: false,
        showTwo: false,
    }


    componentDidMount() {
        showOneTime = setTimeout(() => {
                this.setState({showOne: true})
        },1500)

        showTwoTime = setTimeout(() => {
                this.setState({showTwo: true})
            },3000)
    }

    componentWillUnmount() {
        clearTimeout(showOneTime)
        clearTimeout(showTwoTime)
    }

    render() {
        var bookings = []
        
        for (let booking of this.props.bookings) {
            if (this.props.id == booking.id) {
                bookings.push(booking.paymentStatus)
            }
        }

        // console.log(this.props.bookings)
        

    return (
        <div >
            <Paper style = {{marginTop: '2%',marginLeft: '23%', width: '680px', height: '400px'}}>
            {this.props.bookings.map(booking => (
                <div className = {styles.Status}  key = {booking.id} >
                {this.props.id == booking.id ?
                    <div>
                    <div className = {styles.head}>Transaction Status</div>
                    <Divider className = {styles.divider}/>

                    <div className = {styles.id}>Transaction ID</div>
                    <div className = {styles.transactionID}>#15810</div>
                    {booking.paymentStatus == 1 ? 
                        <div>
                        <Alert severity="warning" className = {styles.transactionStatus}>Transaction Processing</Alert>
                        <div className  ={styles.transactionTime}>Oct 1, 2020 12:40 pm</div>
                        <div className = {styles.amount}>₹ {booking.price} {booking.pricePerEntry} </div>
                        </div>
                        
                        : 
                    <div>
                    {booking.paymentStatus == 0 ? 
                        <div>
                        <Alert severity="success" className = {styles.transactionStatus}>Transaction Success</Alert>
                        <div className  ={styles.transactionTime}></div>
                        <div className = {styles.amount}>₹ {booking.price} {booking.pricePerEntry}</div>
                        </div>
                        : 
                    
                        <div>
                        {booking.paymentStatus == 3 ? 
                            <div>
                            <Alert severity="error" className = {styles.transactionStatus}>Transaction Failed</Alert>
                            <div className  ={styles.transactionTime}>Oct 1, 2020 12:40 pm</div>
                            <div className = {styles.amount}>₹ {booking.price}</div>
                            </div>
                            : '' }

                        </div>
                    }
                    </div>
                    }
                    
                            <div key = {booking.id} >
                                    <div>
                                        {booking.paymentStatus == 1 ?
                                        <div  style = {{marginLeft: '4%', fontSize: '13px', }}>
                                            <div style = {{display: 'flex', flexDirection: 'row'}}>    
                                                <div className = {classes.meter9}>
                                                    <span style={{width:"100%", height:'50%'}}><span className={classes.progress9} style = {{background: '#EEC200'}}></span></span>
                                                </div>
                    
                                                <div className = {styles.circleOne}>
                                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="4" cy="4" r="4" fill="#EEC200"/>
                                                    </svg>
                                                </div>
                                                
                    
                                                {this.state.showTwo ?
                                                    <div className = {styles.circleTwo} style = {{marginLeft: '-17px'}}>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM5 7C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9H11C11.2652 9 11.5196 8.89464 11.7071 8.70711C11.8946 8.51957 12 8.26522 12 8C12 7.73478 11.8946 7.48043 11.7071 7.29289C11.5196 7.10536 11.2652 7 11 7H5Z" fill="#EEC200"/>
                                                    </svg>
                                                    </div>    
                                                : " " }

                                                <div>
                                                    <p>Customer transaction success</p>
                                                    <p>Payment received by Seristo</p>
                                                    <p>Money deposited to your bank account</p>
                                                </div>
                                            </div>
                                        </div>
                                        : 
                                        <div >
                                        {booking.paymentStatus == 0 ? 

                                        <div style = {{marginLeft: '4%', fontSize: '13px'}}>
                                            <div style = {{display: 'flex', flexDirection: 'row'}}>
                                                <div className = {classes.meter9}>
                                                    <span style={{width:"100%"}}><span className={classes.progress9}></span></span>
                                                </div>
                
                                        
                                                <div className = {styles.circleOne}>
                                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="4" cy="4" r="4" fill="#4CB039"/>
                                                </svg>
                                                </div>
                
                                                {this.state.showOne ? 
                                                
                                                <div className = {styles.circleTwo}>
                                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="4" cy="4" r="4" fill="#4CB039"/>
                                                </svg>
                                                </div>
                                                : ''
                                                
                                                }

                                                {this.state.showTwo ? 
                                                    <div className = {styles.circleThree}>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="8" cy="8" r="8" fill="#4CB039"/>
                                                    </svg>
                                                    </div>
                                                : '' }

                                                <div>
                                                    <p>Customer transaction success</p>
                                                    <p>Payment received by Seristo</p>
                                                    <p>Money deposited to your bank account</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        : 
                                            <div> 
                                            {booking.paymentStatus == 3 ? 
                                            
                                            <div style = {{marginLeft: '4%', fontSize: '13px'}}>
                                                <div style = {{display: 'flex', flexDirection: 'row'}}>
                                                    <div className = {styles.circleOne}>
                                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.94141 16C11.0631 16 13.098 15.1571 14.5983 13.6569C16.0986 12.1566 16.9414 10.1217 16.9414 8C16.9414 5.87827 16.0986 3.84344 14.5983 2.34315C13.098 0.842855 11.0631 0 8.94141 0C6.81967 0 4.78484 0.842855 3.28455 2.34315C1.78426 3.84344 0.941406 5.87827 0.941406 8C0.941406 10.1217 1.78426 12.1566 3.28455 13.6569C4.78484 15.1571 6.81967 16 8.94141 16ZM7.64841 5.293C7.4598 5.11084 7.2072 5.01005 6.94501 5.01233C6.68281 5.0146 6.432 5.11977 6.24659 5.30518C6.06118 5.49059 5.95601 5.7414 5.95373 6.0036C5.95145 6.2658 6.05225 6.5184 6.23441 6.707L7.52741 8L6.23441 9.293C6.1389 9.38525 6.06271 9.49559 6.0103 9.6176C5.9579 9.7396 5.93031 9.87082 5.92916 10.0036C5.928 10.1364 5.9533 10.2681 6.00358 10.391C6.05387 10.5139 6.12812 10.6255 6.22201 10.7194C6.3159 10.8133 6.42756 10.8875 6.55045 10.9378C6.67335 10.9881 6.80503 11.0134 6.93781 11.0123C7.07059 11.0111 7.20181 10.9835 7.32381 10.9311C7.44581 10.8787 7.55616 10.8025 7.64841 10.707L8.94141 9.414L10.2344 10.707C10.423 10.8892 10.6756 10.99 10.9378 10.9877C11.2 10.9854 11.4508 10.8802 11.6362 10.6948C11.8216 10.5094 11.9268 10.2586 11.9291 9.9964C11.9314 9.7342 11.8306 9.4816 11.6484 9.293L10.3554 8L11.6484 6.707C11.8306 6.5184 11.9314 6.2658 11.9291 6.0036C11.9268 5.7414 11.8216 5.49059 11.6362 5.30518C11.4508 5.11977 11.2 5.0146 10.9378 5.01233C10.6756 5.01005 10.423 5.11084 10.2344 5.293L8.94141 6.586L7.64841 5.293Z" fill="#DE3618"/>
                                                        </svg>                            
                                                    </div>
                                                    <div>
                                                        <p>Customer transaction success</p>
                                                        <p>Payment received by Seristo</p>
                                                        <p>Money deposited to your bank account</p>
                                                    </div>
                                                </div>
                                            </div>
                                            : '' }
                                            
                                            </div>
                                        }


                                        
                                        </div>
                                        } 
                                    </div>
                              
                                
                            </div>
                       
                            </div>
                            : ''}

{/*
                            <div className = {classes.meter9}>
                                <span style={{width:"100%"}}><span className={classes.progress9}></span></span>
                            </div>

                         
                            <div className = {styles.circleOne}>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#4CB039"/>
                            </svg>
                            </div>

                            {this.state.showOne ? 
                            
                            <div className = {styles.circleTwo}>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#4CB039"/>
                            </svg>
                            </div>
                            : ''
                            
                            }

                            {this.state.showTwo ? 
                                <div className = {styles.circleThree}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="8" fill="#4CB039"/>
                                </svg>
                                </div>
                            : '' }
                            */}

                            {/*<div className = {classes.meter9}>
                                <span style={{width:"100%", height:'50%'}}><span className={classes.progress9} style = {{background: '#EEC200'}}></span></span>
                            </div>

                            <div className = {styles.circleOne}>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#EEC200"/>
                            </svg>
                            </div>
                            

                            {this.state.showTwo ?
                                <div className = {styles.circleTwo} style = {{marginLeft: '-17px'}}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM5 7C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9H11C11.2652 9 11.5196 8.89464 11.7071 8.70711C11.8946 8.51957 12 8.26522 12 8C12 7.73478 11.8946 7.48043 11.7071 7.29289C11.5196 7.10536 11.2652 7 11 7H5Z" fill="#EEC200"/>
                                </svg>
                                </div>    
                            : " " }
                            */}

                      

                            {/*<div className = {styles.circleOne}>
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.94141 16C11.0631 16 13.098 15.1571 14.5983 13.6569C16.0986 12.1566 16.9414 10.1217 16.9414 8C16.9414 5.87827 16.0986 3.84344 14.5983 2.34315C13.098 0.842855 11.0631 0 8.94141 0C6.81967 0 4.78484 0.842855 3.28455 2.34315C1.78426 3.84344 0.941406 5.87827 0.941406 8C0.941406 10.1217 1.78426 12.1566 3.28455 13.6569C4.78484 15.1571 6.81967 16 8.94141 16ZM7.64841 5.293C7.4598 5.11084 7.2072 5.01005 6.94501 5.01233C6.68281 5.0146 6.432 5.11977 6.24659 5.30518C6.06118 5.49059 5.95601 5.7414 5.95373 6.0036C5.95145 6.2658 6.05225 6.5184 6.23441 6.707L7.52741 8L6.23441 9.293C6.1389 9.38525 6.06271 9.49559 6.0103 9.6176C5.9579 9.7396 5.93031 9.87082 5.92916 10.0036C5.928 10.1364 5.9533 10.2681 6.00358 10.391C6.05387 10.5139 6.12812 10.6255 6.22201 10.7194C6.3159 10.8133 6.42756 10.8875 6.55045 10.9378C6.67335 10.9881 6.80503 11.0134 6.93781 11.0123C7.07059 11.0111 7.20181 10.9835 7.32381 10.9311C7.44581 10.8787 7.55616 10.8025 7.64841 10.707L8.94141 9.414L10.2344 10.707C10.423 10.8892 10.6756 10.99 10.9378 10.9877C11.2 10.9854 11.4508 10.8802 11.6362 10.6948C11.8216 10.5094 11.9268 10.2586 11.9291 9.9964C11.9314 9.7342 11.8306 9.4816 11.6484 9.293L10.3554 8L11.6484 6.707C11.8306 6.5184 11.9314 6.2658 11.9291 6.0036C11.9268 5.7414 11.8216 5.49059 11.6362 5.30518C11.4508 5.11977 11.2 5.0146 10.9378 5.01233C10.6756 5.01005 10.423 5.11084 10.2344 5.293L8.94141 6.586L7.64841 5.293Z" fill="#DE3618"/>
                                </svg>                            
                        </div>*/}
 
                        </div>
                      
                        ))}
            </Paper>

                    <Paper style = {{marginTop: '2%',marginLeft: '23%', width: '680px',paddingBottom: '1%'}}>
                    {this.props.bookings.map(booking => (
                        <div className = {styles.Status}  key = {booking.id} >
                            {this.props.id == booking.id ?
                            <div>
                                <div className = {styles.head}>Booking specific questions</div>
                                <Divider className = {styles.divider}/>
                                <Grid container spacing={5}>
                                    <Grid item xs={8} style ={{marginLeft: '2%'}}>
                                        <div>
                                            {booking.customerName !== " " && booking.customerName !== null && booking.customerName !== "undefined undefined" ? 
                                                <>
                                                    <div className = {styles.questions}>Customer Name</div>
                                                    <div>
                                                        {booking.customerName}
                                                    </div>
                                                </>
                                            :'' }
                                        </div>
                                        <div className = {styles.questions}>Customer Email</div>
                                        <div>{booking.email}</div>
                                        <div className = {styles.questions}>Customer Phone Number</div>
                                        <div>{booking.phoneNumber}</div>
                                        {booking.questionSet && booking.questionSet.map((question, i) => (
                                            <div key = {i}>
                                                <div className = {styles.questions}>{question.text} </div>
                                                <div>{booking.answerSet[i]}</div>
                                            </div>
                                        ))}
                                        <div>
                                            {booking.orderNote ? 
                                                <div>
                                                    <div className = {styles.questions}>Special Note</div>
                                                    <div>{booking.orderNote}</div>
                                                </div>
                                            : '' }
                                        </div>
                                        
                                    
        
                                    {/* <div className = {styles.questions}>Attach relevant files</div>
                                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                                        <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M27.3759 11.4463H26.6076V7.73872C26.6076 7.7156 26.6039 7.6923 26.6008 7.66889C26.5996 7.52167 26.5528 7.37707 26.452 7.2625L20.2822 0.214611C20.2804 0.21281 20.2786 0.212171 20.2773 0.210196C20.2405 0.169121 20.1976 0.13496 20.1523 0.105388C20.1389 0.0963833 20.1254 0.0888306 20.1113 0.0810456C20.072 0.0596077 20.0304 0.04183 19.9875 0.0289905C19.9759 0.0257371 19.9654 0.0209731 19.9538 0.017952C19.9072 0.00691357 19.8588 0 19.8098 0H4.64683C3.95443 0 3.39193 0.563136 3.39193 1.25496V11.446H2.62371C1.63321 11.446 0.830078 12.2487 0.830078 13.2396V22.5668C0.830078 23.557 1.63321 24.3603 2.62371 24.3603H3.39199V30.745C3.39199 31.4368 3.95449 32 4.64689 32H25.3527C26.0445 32 26.6076 31.4369 26.6076 30.745V24.3603H27.376C28.3662 24.3603 29.1695 23.557 29.1695 22.5668V13.2399C29.1695 12.2491 28.3662 11.4463 27.3759 11.4463ZM4.64683 1.25519H19.1823V7.67569C19.1823 8.02235 19.4636 8.30314 19.8098 8.30314H25.3527V11.4467H4.64683V1.25519ZM20.0518 17.9534C20.0518 19.7472 19.3986 20.984 18.4936 21.749C17.5077 22.5692 16.0059 22.9583 14.1715 22.9583C13.0734 22.9583 12.2951 22.8887 11.7662 22.8195V13.616C12.5446 13.4911 13.5601 13.4216 14.6306 13.4216C16.4091 13.4216 17.5632 13.7416 18.4673 14.4223C19.44 15.1454 20.0518 16.299 20.0518 17.9534ZM3.68823 22.8612V13.616C4.3413 13.5053 5.25929 13.4216 6.55218 13.4216C7.85885 13.4216 8.79049 13.6718 9.41585 14.1726C10.0138 14.645 10.416 15.4237 10.416 16.3413C10.416 17.2592 10.111 18.0376 9.55447 18.5655C8.83163 19.2469 7.7613 19.553 6.50977 19.553C6.23218 19.553 5.98109 19.5388 5.78733 19.511V22.8614L3.68823 22.8612ZM25.3527 30.4053H4.64683V24.3603H25.3527L25.3527 30.4053ZM27.171 15.2288H23.5696V17.3698H26.9342V19.0938H23.5696V22.8612H21.4436V13.4911H27.171V15.2288Z" fill="#484F56"/>
                                        </svg>
        
                                        <div style = {{flexDirection: 'column', marginLeft: '10px'}}>
                                            <div style = {{fontWeight: 'bold', }}>Resume action verbs.pdf</div>
                                            <div style = {{margin: '2% 0', fontSize:'12px'}}>100kb</div>
                                        </div>
                                    </div> */}
                                </Grid>
                            </Grid>
                            </div>
                            : '' }
                        </div>
                        ))}
                    </Paper>
        </div>
    )
                        }
}

export default TransactionStatus



// <Paper style = {{marginTop: '2%',marginLeft: '23%', width: '680px', height: '400px'}}>
// <div className = {styles.Status}>
//     <div className = {styles.head}>Events in this booking</div>
//     <Divider className = {styles.divider}/>

//     <div className = {styles.columns}>
//         <Grid container spacing={3} className = {styles.columnsGrid}>
//             <Grid item xs={3}>
//             Event ID
//             </Grid>
//             <Grid item xs={6}>
//             Date
//             </Grid>
//             <Grid item xs={3}>
//             Event Status
//             </Grid>
//         </Grid>

//         <div className={styles.rows}>
//         {events.map(event => (
//         <Grid container spacing={3} className={styles.rows} key = {event.eventId}>
//             <Grid item xs={3}>
//             <a href="#" style={{ color: '#2242A4', textDecoration: 'none' }}>{event.eventId}</a>
//             </Grid>
//             <Grid item xs={6}>
//             {event.date}
//             </Grid>
//             <Grid item xs={3}>
//             {event.status === 'Upcoming' ?
//             <div className={styles.badge} style={{ backgroundColor: '#FFEA8A' }}>
//                     {event.status}
//             </div> 
//             : 
//             <div className={styles.badge} style={{ backgroundColor: '#bbe5b3' }}>
//                     {event.status}
//             </div>
//             }
                
//             </Grid>

//             <hr />
//         </Grid>
       
//         ))}
        
//         </div>
//     </div>

// </div>
// </Paper>