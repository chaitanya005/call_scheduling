import React, { Component, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import styles from './BookingsTable.module.sass'
import Link from 'next/link'
// import {useSession} from 'next-auth/client'
import axios from 'axios'
import moment from 'moment'


export default function Bookings ({bookings, allEvents, filter}) {
    // const [userId, setUserId] = useState(null)

    // const [session ] = useSession()
 
    // const email = session.user.email
    // const name = session.user.name
    // const img = session.user.image
    // const socialLogin = {
    //     method: 'post',
    //     url: 'http://localhost:3000/users/socialLogin',
    // }


    // useEffect(() => {
    //     axios(Object.assign({}, socialLogin, { data: { email: email, userName: name, image: img } }))
    //     .then(res => getUserId(res))
    //     .catch((err) => console.log(err))
    // }, [])

    // function getUserId (response) {
    //     if (response.data.data.user) {
    //       setUserId(response.data.data.user.id)
    //       // console.log(response.data.data.user)
    //       return true
    //     }else if (response.data.data.userResult) {
    //       setUserId(response.data.data.userResult.id)
    //       // console.log(response.data.data.userResult)
    //       return userId
    //     }
    //     return false
    // }
    
    // const d = 

        const myFilters = filter.category
        // const events = props.events
        // const bookings = props.bookings
        // const allEvents = props.allEvents

        console.log(allEvents)

        // console.log(bookings)
        return (
            <div>

                {allEvents[0] === undefined ?
                    <p style={{ marginLeft: '40%', color: '#b5b8bb' }}>No results Found in this Page</p>
                : ''}

                {myFilters.length !== 0 ?
                    <div>
                        {allEvents.map(booking => (
                            <div key = {booking.id}>
                                    <React.Fragment>
                                        {myFilters.map(num => (
                                            <div key={num} className={styles.rows}>
                                                    <div>
                                                        {booking.serviceType === num ?
                                                            <Grid
                                                                container spacing={3}
                                                                className={styles.rows}
                                                            >
                                                                <Grid item xs={2}>
                                                                    <Link href={`booking/${booking.id}`}>
                                                                        <div style={{ color: '#2242A4', textDecoration: 'none', cursor: 'pointer' }}>
                                                                            #B{booking.listingId}{booking.id}</div>
                                                                    </Link>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    {booking.name}
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
                                                                </Grid>
                                                                {/* <Grid item xs={2}>
                                                                    {booking.createdAt}
                                                                    <div className={styles.addition}> {booking.eventTime} </div>
                                                                </Grid> */}
                                                                <DateAndTime date = {booking.createdAt} />
                                                                <Grid item xs={2}>
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
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    {(booking.serviceType == 3) || (booking.serviceType == 5) ? 
                                                                       <div> ₹ {booking.pricePerEntry} </div> : 
                                                                       <div> ₹ {booking.price} </div>
                                                                    }
                                                                </Grid>
                                                                <Grid item xs={2}>
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
                                                                                    {booking.paymentStatus == '3' ?
                                                                                        <div className={styles.badge} style={{ backgroundColor: '#FEADA5' }}>
                                                                                            Payment Failed
                                                                                        </div> : ""
                                                                                    }</div>
                                                                            }
                                                                        </div>
                                                                    }
                                                                </Grid>
                                                                <hr style={{ width: '98%' }} />
                                                            </Grid>
                                                            : ''}
                                                    </div>
                                            </div>
                                        ))}
                                    </React.Fragment>
                            </div>
                        ))}

                    </div>

                    :

                    <React.Fragment>
                        <div className={styles.rows}>
                            {allEvents.map((booking, i) =>
                                <div key={booking.id}>
                                <React.Fragment>
                                                <Grid
                                                    container spacing={3}
                                                    className={styles.rows}
                                                >
                                                    <Grid item xs={2}>
                                                        <Link href={`booking/${booking.id}`}>
                                                            <div style={{ color: '#2242A4', textDecoration: 'none', cursor: 'pointer' }}>
                                                                #B{booking.listingId}{booking.id}
                                                            </div>
                                                        </Link>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                    {booking.name}
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
                                                        
                                                    </Grid>
                                                    {/*<Grid item xs={2}>
                                                        {booking.createdAt}
                                                        <div className={styles.addition}> {booking.eventTime} </div>
                                                    </Grid>*/}
                                                    <DateAndTime date = {booking.createdAt} />
                                                    <Grid item xs={2}>
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
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                            <div> ₹ {booking.price} {booking.pricePerEntry} </div>
                                                    </Grid>
                                                    <Grid item xs={2}>
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
                                                                        {booking.paymentStatus == '3' ?
                                                                            <div className={styles.badge} style={{ backgroundColor: '#FEADA5' }}>
                                                                                Payment Failed
                                                                            </div> : ""
                                                                        }</div>
                                                                }
                                                            </div>
                                                        }
                                                    </Grid>
                                                    <hr style={{ width: '98%' }} />
                                                </Grid>
                                                </React.Fragment>
                                        </div>
                            )}

                        </div>

                    </React.Fragment>

                }
            </div>
        )
}


function DateAndTime ({date}) {
    const d = moment(date).format('MMMM D YYYY')
    const time = moment(date).format('HH:mm')
    // console.log(d)
    return (
        <Grid item xs={2}>
            {d}
            <div className={styles.addition}> {time} </div>
        </Grid>
    )
}