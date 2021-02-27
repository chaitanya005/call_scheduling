import React , { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import styles from './Modal.module.sass'
import BackDrop from '../BackDrop/BackDrop'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import EventDetails from './EventDetails'
import api from './apiCore'
import SendEmail from './PayoutSendEmail'
// import AccountCircleIcon from '../../../../public/images/profileCircle.svg'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Link from 'next/link'


class Modal extends Component {
    state = { 
        selectedDate: new Date(),
        selectedTime: new Date(),
        dropDown: '',
        notifyTime: '',
        payoutMethodSelected: false,
        // accountDetails: [],
        accountName: '',
        accountNumber: '',
        ifscCode: '',
    }

    handleDateChange = (date) => {
        this.setState({
            selectedDate: date
        })
    }
    handleTimeChange = (time) => {
        this.setState({
            selectedTime: time
        })
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

    handlePayoutMethod = (accntDetails) => {
        this.setState({payoutMethodSelected: true})
        console.log(accntDetails)
        this.setState({
            accountName: accntDetails.accountName,
            accountNumber: accntDetails.accountNumber,
            ifscCode: accntDetails.ifsc
        })
    }

    cancelPayout = () => {
        this.setState({payoutMethodSelected: false})
    }

   


       
    componentDidMount() {
        
    }

    /* shouldComponentUpdate(nextProps, nextState){
        if(this.props.userId !== nextProps.userId){
            return  api.getAccountDetails(this.props.userId)
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
        }
    } */

    render() {
        const booking = this.props.booking
        // console.log(booking)
        
        // console.log(this.props.amountToPaid)
        // console.log(this.props.accountDetails.length)
        return (
            <div>
                
                {this.props.button == 'cancel' ?
                <div>
                <BackDrop show = {this.props.show} clicked = {this.props.modalClosed} />
                <Paper className = {styles.CancelModal}
                style  = {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',//vh - viewport height
                    opacity: this.props.show ? '1' : '0',
                }}
                > 
                <div>
                <h3>Do you want to cancel this booking?</h3>
                <div>Notification will be sent to the customer</div>
                <br />
                <Button className =  {styles.btn} onClick = {this.props.modalClosed} style = {{width: '148px', background: '#e5e5e5'}} color="default">
                    <div style = {{color: '#484F56'}}>No, change nothing</div>
                </Button>
                <Button className =  {styles.btn} style = {{background:  '#DE3618'}} color="secondary">
                    <div style = {{color: '#fff', }}>Yes, Cancel</div>
                </Button>
                </div>

                </Paper>

                </div>
                : 
                <div>

                {this.props.button == 'reschedule' ? 
               
               <div> 
               <BackDrop show = {this.props.show} clicked = {this.props.modalClosed} />
                <Paper className = {styles.RescheduleModal}
                style  = {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',//vh - viewport height
                    opacity: this.props.show ? '1' : '0'
                }}
                > 
            
                <div>
                <h4>Reschedule Event</h4>
                
                <Divider />

                <div  style = {{display: 'flex', flexDirection: 'column'}}>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <div style = {{display: 'flex', flexDirection: 'row'}}>
                        <p className = {styles.info}>New date for Event </p>
                        <KeyboardDatePicker
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-dialog"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </div>

                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                        <p className = {styles.info}>New time for Event </p>
                        <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        value={this.state.selectedTime}
                        onChange={this.handleTimeChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        />
                        <p className = {styles.info} style = {{width: '10px', marginLeft: '1%',  marginRight: '1%'}}> to </p>
                        <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        value={this.state.selectedTime}
                        onChange={this.handleTimeChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        />
                    </div>
                </MuiPickersUtilsProvider>
                </div>

                
                    <div className  = {styles.functionBtns}>
                        <Button className =  {styles.btn} style = {{background:  '#DE3618'}} color="secondary">
                            <div style = {{color: '#fff', }}>Yes, Reschedule</div>
                        </Button>
                        <Button className =  {styles.btn} onClick = {this.props.modalClosed} style = {{width: '148px', background: '#e5e5e5'}} color="default">
                            <div style = {{color: '#484F56'}}>No, change nothing</div>
                        </Button>
                    </div>
               
              
                    </div>
                </Paper>

                </div>


                : 

                <div>
                {this.props.button == 'eventDetails' ?
                
                <div>
                {this.props.show ? 
                    <div>
                    <BackDrop show = {this.props.show} clicked = {this.props.modalClosed} btn = {this.props.button} />
                    <Paper className = {styles.eventDetailsModal}
                    style  = {{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',//vh - viewport height
                        opacity: this.props.show ? '1' : '0'
                    }}
                    >
                        <EventDetails singleEvent = {this.props.singleEvent} singleBooking = {this.props.singleBooking} button = 'eventDetails' />
                    </Paper>
                    </div>
                : ''  }
                
                </div>
                
                :
                    
                <div>
                {this.props.button == 'payout' ?  
                <div>
                    <BackDrop show = {this.props.show} clicked = {this.props.modalClosed} btn = {this.props.button} />
                    <Paper className = {styles.payoutModal}
                style  = {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',//vh - viewport height
                    opacity: this.props.show ? '1' : '0'
                }}
                > 
                    <div className = {styles.payout}>Payout</div>
                    {/* <div className = {styles.payoutAmt}>Payout amount <b>{this.props.amountToPaid}</b></div> */}
                    <Divider style = {{width: '450px', marginLeft: '5%', marginTop: '2%'}} />
                    {!(this.state.payoutMethodSelected) ? 
                        <div>
                            

                                <div className = {styles.paymentMethod}>Select Payment Method</div>
                                <Divider style = {{width: '450px', marginLeft: '5%', marginTop: '2%'}} />
            
                                {this.props.accountDetails && this.props.accountDetails.length !== 0 ?
                                <div>
                                {this.props.accountDetails.map((accntDetails, i) => (
                                    <div className = {styles.payoutBank} onClick = {() => this.handlePayoutMethod(accntDetails)} key={i}>
                                        <div className = {styles.bankImg}>
                                            {/* <img src = "" style ={{width: '130px', height: '30px'}} /> */}
                                        </div>
                                        <div className = {styles.accntDetails}>
                                            <div>{"BankName"}</div>
                                            <div>Account number: {accntDetails.accountNumber}</div>
                                        </div>
                                        <div className = {styles.rightArrow}>
                                            <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L8 8L1 15" stroke="#33393F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                :
                                <div>
                                <br />
                                    <h3 align="center">We don't have any payout Method's. Please add by clicking here</h3>
                                    <Link href='/user/payout' passHref>
                                        <Button
                                        variant = "contained" style = {{background: '#2242a4', textTransform: 'none', marginLeft: '38%', marginBottom: '5%', color: '#fff'}}>
                                            {/* <a href = "/user/payout" style = {{color: '#fff', textDecoration: 'none'}}>Add Payout Method</a> */}
                                            Add Payout Method
                                        </Button>
                                    </Link>
                                </div>
                                }

                            
                                
                        </div>
                    : 
                         <div>
                            {/*<div style = {{fontSize: '16px', fontWeight: 'bold', marginLeft: '5%', paddingTop: '3%', width: '500px'}}>Payment Method</div>
                            <Divider style = {{width: '450px', marginLeft: '5%', marginTop: '2%'}} />

                            <div className = {styles.payoutBank}>
                                <div className = {styles.bankImg}>
                                     <img src = "/images/hdfc.png" style ={{width: '130px', height: '30px'}} /> 
                                </div>
                                <div className = {styles.accntDetails}>
                                    <div>Account Name: {this.state.accountName}</div>
                                    <div>Account number: {this.state.accountNumber}</div>
                                </div>
                            </div> 
                            
                            <div style = {{display: 'flex',  flexDirection: 'row-reverse', margin: '3%'}}>
                                <Button style = {{textTransform: 'none', color: '#fff', background: '#4CB039', margin: '3%'}} onClick = {this.submitHadler}>Submit</Button>
                                <Button style = {{textTransform: 'none', color: '#2242a4', margin: '3%', border: '1px solid #CDD3D9'}} onClick = {this.cancelPayout}>Cancel</Button>
                            </div>
                            */}
                            <SendEmail amountToPaid = {this.props.amountToPaid} accountName = {this.state.accountName} accountNumber={this.state.accountNumber} ifsc = {this.state.ifscCode} cancelPayout = {this.cancelPayout} />
                        </div> 

                
                }
                    
                </Paper>
            </div>
                : 
            
                <div>
                {this.props.button=='userDetails' ? 
                <div>
                    <BackDrop show = {this.props.show} clicked = {this.props.modalClosed} btn1 = "eventDetails" btn = {this.props.button} />
                    <Paper className = {styles.userDetails}
                        style  = {{
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',//vh - viewport height
                            opacity: this.props.show ? '1' : '0',
                            width: '500px'
                        }}
                        > 
                        <h4>Event specific customer details</h4>
                        <Divider />

                        
                        
                            <div style = {{display: 'flex', flexDirection: 'row'}}>
                                <div style = {{marginTop: '3%'}}><AccountCircleIcon fontSize = 'large' style = {{width: '80px', height: '80px'}} /></div>

                                <div className = {styles.user}>
                                    <div  className = {styles.question}>
                                    {booking.name !== " " && booking.name !== null && booking.name !== "undefined undefined" ?
                                        <div>{booking.name}</div>
                                    : ''}
                                    </div>
                                    <div>{booking.email}</div>
                                    <div>{booking.phone}</div>
                                </div>
                            </div>
            

                            <Divider />

                                {booking && booking.questionSet ? 
                                    <div  style = {{marginTop: '3%', marginLeft: '2%'}}>
                                        <div>
                                        {booking.questionSet.map((question, i) => (
                                            <div>
                                            <div  className = {styles.question}>{question.text}</div>
                                                <div>
                                                    {booking.answerSet[i]}
                                                </div>
                                                <br />
                                            </div>
                                        ))}
                                        </div>

                                    </div>

                                : '' }
                
                    </Paper>
                </div>
                : 
                <div>
                    {this.props.button == 'sendEmail' ?
                        <div>
                            <BackDrop show = {this.props.show} clicked = {this.props.modalClosed} />
                            <div>Done</div>
                        </div>
                    : ''}
                </div>
                }
                </div>
            
            }
                
                </div>
            }

                </div>
            
                }
                

                </div>
            }
               
            </div>
        )
    }
}

export default Modal


//<FormControl>
// <InputLabel htmlFor="demo-customized-select-native">Notification</InputLabel>
// <NativeSelect
// id="demo-customized-select-native"
// value={this.state.dropDown}
// onChange={this.handleChange}
// input={<BootstrapInput />}
// >
// <option aria-label="None" value="" />
// <option value={'Email'}>Email</option>
// </NativeSelect>
// </FormControl>  


