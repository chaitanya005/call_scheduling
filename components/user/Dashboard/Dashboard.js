import React, { Component, useState, useEffect } from 'react'
import AppBar from '../AppBar/AppBar'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import styles from './Dashbord.module.sass'
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios'
import api from './apiCore'
import PayoutBtn from '../Settings/PayoutButton'
// import { signin, signout, useSession } from 'next-auth/client'
import CurrPayout from '../Settings/currentPayout'

const dollarChar = '\u0024';
const rupeeChar = '\u20B9';

const dashboard = () => {

    // const [session, loading] = useSession();
  const [userId, setUserId] = useState(null)
  const [dashBoard, setDashBoard] = useState([])
  const [totalAmount, setTotalAmount] = useState('')
  const [totalBookings, setTotalBookings] = useState('')
  const [amountTopaid, setAmountTopaid] = useState('')
  const [symbol, setSymbol] = useState('')

  /* const socialLogin = {
    method: 'post',
    url: 'http://localhost:3000/users/socialLogin',
  } */

  let email, name, img

  useEffect(() => {
    /* if (session) {
        email = session.user.email
        name = session.user.name
        img = session.user.image
        axios(Object.assign({}, socialLogin, { data: { email: email, userName: name, image: img } }))
          .then((res) => getUserId(res))
          .catch((err) => console.log(err))
      } */
      if (localStorage.getItem('userInfo')) {
        var data = JSON.parse(localStorage.getItem('userInfo'))
        setUserId(data.userId)
        api.getDashboardData(data.userId)
                .then(async (res) => {
                    setDashBoard(res.data)
                    setTotalAmount(res.data.data.totalAmount.totalEarned)
                    setTotalBookings(res.data.data.totalBookings)
                    await setAmountTopaid(res.data.data.totalAmount.totalEarned - res.data.data.totalAmount.totalReedemed)
                    // console.log(res.data.data)
                })
                .catch(err => {
                    // console.log(err)
                })
    }


  }, [userId])


  useEffect(() => {
     if (localStorage.getItem('userInfo')) {
        const data = JSON.parse(localStorage.getItem('userInfo'))
        if (data.currency === 'Rupee') {
            setSymbol(rupeeChar)
        } else {
            setSymbol(dollarChar)
        }
     }

     if (localStorage.getItem('DefaultCurrency')){
        const currency = localStorage.getItem('DefaultCurrency')
        if (currency === 'Rupee') {
            setSymbol(rupeeChar)
        } else {
            setSymbol(dollarChar)
        }
     }
  }, [symbol])
  

  
    /* function getUserId (response) {
        if (response.data.data.user) {
            setUserId(response.data.data.user.id)
        }else if (response.data.data.userResult) {
            setUserId(response.data.data.userResult.id)
            api.getDashboardData(response.data.data.userResult.id)
                .then(res => {
                    setDashBoard(res.data.data)
                    // console.log(res.data)
                })
                .catch(err => console.log(err))
        }
    } */

    /* let totalAmount = dashBoard.data.totalAmount.totalEarned
    let amountTopaid = totalAmount -  dashBoard.data.totalAmount.totalReedemed
    let totalBookings = dashBoard.data.totalBookings */

    // console.log(amountTopaid)

    return (
            <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px',}}
            variant='outlined'>
            <AppBar />

            <Divider />

            <div className = {styles.title}>
                    <h1>Dashboard</h1>
                    <Link href='/user/createNewListing' passHref>
                        <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                        style = {{textTransform: 'none'}}
                        >

                        Add New Event
                        </Button>
                    </Link>
            </div>

            <Divider />

            <div className = {styles.BackDrop}>
                
                {/* <Paper className = {styles.payoutDiv}>
                    <div className = {styles.payout}>Payout</div>
                    <Divider style = {{margin: '3%'}} />
                    <div className = {styles.amountPayout}>Amount ready for payout </div>   
                    <div className = {styles.payoutAmt}> {dashBoard.totalAmount - dashBoard.amountPaid}</div>                   
                    <PayoutBtn amountToPaid = {amountToPaid} />

                    <div style = {{marginTop: '7%', marginLeft: '70%'}}>
                        <Link href = "">Payout History</Link>
                    </div>
                </Paper> */}

                <CurrPayout symbol={symbol} userId = {userId} payOutAmount = {amountTopaid} />

                <Paper style = {{marginLeft: '3%', marginTop: '3%', width: '50%'}}>
                    <div className = {styles.flexDisplay}>
                        <div className = {styles.summary}>Summary</div>
                        {/*<div className = {styles.btns}>
                            <Button className = {styles.time} variant = "contained">All time</Button>
                            <Button className = {styles.month} variant = "contained">This month</Button>
                            <Button className = {styles.week} variant = "contained">This week</Button>
                        </div>*/}
                    </div>

                    <div className = {styles.flexDisplay}>
                        <div className = {styles.amountDiv}>
                            <div className = {styles.status}>All Bookings</div>
                            <div className = {styles.scheduled} align="center"> {totalBookings === '' ? 0 : totalBookings} </div>
                        </div>

                        <div className = {styles.pendingDiv}>
                            <div className = {styles.status}>Total Amount</div>
                            <div className = {styles.amtPending} align="center"> {symbol} {totalAmount === '' ? 0 : totalAmount} </div>
                        </div>
                    </div>

                    <br />
                   
                   {/*  <div className = {styles.bookingDisplay}>
                        <div className = {styles.scheduledDiv}>
                            <div className = {styles.status}>Bookings Scheduled</div>
                            <div className = {styles.scheduled}>{dashBoard.allBookings}</div>
                            <Link href = "/user/schedule"><div style = {{marginLeft: '25%', textDecoration: 'underline', cursor: 'pointer'}}>View Schedule</div></Link>
                        </div>

                        <div className = {styles.amountDiv}>
                            <div className = {styles.status}>Bookings Completed</div>
                            <div className = {styles.completed}>{dashBoard.completedBookings}</div>
                            <Link href = "/user/bookings"><div style = {{marginLeft: '22%', textDecoration: 'underline', cursor: 'pointer'}}>View Booking History</div></Link>
                        </div>
                    </div> */}
                </Paper>
                
                

                
            </div>
            </Paper>
    )
}

export default dashboard


// <Button 
//                     onClick = {this.payoutHanlder}
//                     variant = "contained" style = {{background: '#2242a4', textTransform: 'none', color: '#fff', marginLeft: '38%', marginBottom: '5%'}}>
//                     Start payout
//                     </Button>