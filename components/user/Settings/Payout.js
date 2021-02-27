import React, { Component } from 'react'
import AppBar from '../AppBar/AppBar'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import styles from './Settings.module.sass'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PayoutBtn from './PayoutButton'
import api from '../../../lib/api'
import CurrPayout from './currentPayout'
import moment from 'moment'

/* const  payoutHistory = [
    {
        id: 1,
        amount: 126,
        date: '28/10/2020',
        refid: 12352,
        status: '1',
    },
    {
        id: 2,
        amount: 150,
        date: '07/05/2019',
        refid: 12352,
        status: '2',
    },
    {
        id: 3,
        amount: 200,
        date: '15/08/2017',
        refid: 12352,
        status: '2',
    },
    {
        id: 4,
        amount: 165,
        date: '18/09/2020',
        refid: 12352,
        status: '2',
    },
    {
        id: 5,
        amount: 75,
        date: '16/08/2020',
        refid: 12352,
        status: '2',
    },
] */

const dollarChar = '\u0024';
const rupeeChar = '\u20B9';

class Payout extends Component {
    state = {
        isAdding: false,
        startPayout: false,
        accountName: '',
        accountNumber: '',
        ifscNumber: '',
        phoneNumber: '',
        accountDetails: [],
        paypal: '',
        timeZone: '',
        amountToPaid: '',
        payoutHistory: null,
        symbol: '',
    }

    clickHandler = () => {
        this.setState({
            isAdding: true
        })
    }

    cancelHandler = () => {
        this.setState({isAdding: false})
    }

    nameHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveHandler = () => {
        let accountName = this.state.accountName
        let ifsc = this.state.ifscNumber
        let accountNumber = this.state.accountNumber
        let userId = this.props.userId
        let phoneNumber = this.state.phoneNumber
        if (accountName === '' || ifsc === '' || accountNumber == '' || phoneNumber == ''){
            alert('Please Enter All the Details')
        } else {
            api.postAccountDetails(this.props.userId, accountName, ifsc, accountNumber)
                .then(res => {
                    console.log(res)
                    this.setState({
                        accountName: '',
                        accountNumber: '',
                        ifscNumber: '',
                        isAdding: false
                    })
                    document.location.reload(true)
                })
                .catch(err => console.log(err))
        }
    }

    componentDidMount() {
        if (localStorage.getItem('userInfo')){
            const data = JSON.parse(localStorage.getItem('userInfo'))
            api.getAccountDetails(data.userId)
            .then(res => {
                // console.log(res)
                this.setState({
                    accountDetails: res.data.data
                })
            })
            .catch(err => console.log(err))

            api.getDashboardData(data.userId)
                .then(async (res) => {
                    this.setState({
                        amountToPaid: res.data.data.totalAmount.totalEarned - res.data.data.totalAmount.totalReedemed
                    })
                    // console.log(res.data.data)
                })
                .catch(err => {
                    // console.log(err)
                })
            
            api.getPayoutHisory(data.userId)
                .then(res => {
                    // console.log(res)
                    this.setState({payoutHistory: res.data.data})
                })
                .catch(err => console.log(err))
            
            if (data.country !== null) {
                this.setState({
                    timeZone: data.country
                })
            }
        }

        if (localStorage.getItem('DefaultCountry')){
            this.setState({
                timeZone: DefaultCountry
            })
        }
    }

    componentDidMount() {
        if (localStorage.getItem('userInfo')) {
           const data = JSON.parse(localStorage.getItem('userInfo'))
           if (data.currency === 'Rupee') {
               this.setState({ symbol: rupeeChar }) 
           } else {
               this.setState({ symbol: dollarChar }) 
           }
        }
   
        if (localStorage.getItem('DefaultCurrency')){
           const currency = localStorage.getItem('DefaultCurrency')
           if (currency === 'Rupee') {
               this.setState({ symbol: rupeeChar }) 
           } else {
               this.setState({ symbol: dollarChar }) 
           }
        }
    }
    
    render() {
        // console.log(this.state.payoutHistory)
        // console.log(this.props.userId)
        return (
            <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px',}}
            variant='outlined'>
            <AppBar />

            <Divider />

            <div className = {styles.title}>
                    <h1>Payout</h1>
            </div>

            
            

            <div className = {styles.BackDrop}>

                <div style =  {{overflow: 'auto', height: '570px'}}>
                <CurrPayout symbol={this.state.symbol} userId = {this.props.userId} payOutAmount = {this.state.amountToPaid} />

                <Paper style = {{marginTop: '5%', marginLeft: '5%', width: '500px'}}>
                    <div style = {{fontSize: '18px', fontWeight: 'bold', marginLeft: '5%', paddingTop: '5%'}}>Payout History</div>
                    <Divider style = {{margin: '3%'}} />
                    {this.state.payoutHistory && this.state.payoutHistory.length !== 0?
                    <div className = {styles.columns}>
                        <Grid container spacing={3} className = {styles.columnsGrid}>
                            <Grid item xs={3}>
                            Amount
                            </Grid>
                            <Grid item xs={3}>
                            Date
                            </Grid>
                            <Grid item xs={3}>
                            Req ID
                            </Grid>
                            {/*<Grid item xs={3}>
                            Payout Status
                            </Grid> */}
                        </Grid>
                    </div>
                    : <p align="center" >No Payout History</p>}


                    {this.state.payoutHistory && this.state.payoutHistory.map(payout => (
                        <div className={styles.rows} key = {payout.id}>
                        <Grid container spacing={3} className = {styles.columnsGrid}>
                            <Grid item xs={3}>
                                <div>{payout.requestedAmount}</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div style = {{fontWeight: '400'}}>{moment(payout.createdAt).format('MM-DD-YYYY')}</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div style = {{color: '#2242a4'}}>#R{payout.id}</div>
                            </Grid>
                            {/* <Grid item xs={3}>
                            {payout.status == '2' ?
                                <div className={styles.badge} style={{ backgroundColor: '#bbe5b3' }}>
                                    Complete
                                </div> :
                                <div>
                                    {payout.status == '1' ?
                                        <div className={styles.badge} style={{ backgroundColor: '#FFEA8A' }}>
                                            Pending
                                        </div> :
                                            <div>
                                                {payout.status == '3' ?
                                                    <div className={styles.badge} style={{ backgroundColor: '#FEADA5' }}>
                                                        Failed
                                                    </div> : ""
                                                }</div>
                                        }
                                    </div>
                            }
                            </Grid> */}
                            <hr style={{ width: '95%' }} />
                        </Grid>
                    </div>
                    ))}
                </Paper>

                <Paper style = {{marginTop: '5%', marginLeft: '5%', width: '500px'}}>
                    <div style = {{fontSize: '18px', fontWeight: 'bold', marginLeft: '5%', paddingTop: '5%'}}>Payout Methods</div>
                    <Divider style = {{margin: '3%'}} />
                        <br />
                        {this.state.accountDetails.length !== 0 ? 
                        <div>
                            {this.state.accountDetails.map((account, i) => (
                                <React.Fragment key = {i}>
                                <div  style = {{display: 'flex', flexDirection: 'row'}}>
                                {/* <div style = {{marginLeft: '5%', marginTop: '3%'}}>
                                    <img src = "/images/hdfc.png" style ={{width: '130px', height: '30px'}} />
                                </div> */}
                                    <div style = {{flexDirection: 'column', marginLeft: '5%'}}>
                                        <div>Account Name: <b>{account.accountName}</b></div>
                                        <div>Account number: <b>{account.accountNumber}</b></div>
                                        {/* <Button style = {{textTransform: 'none', color: 'red', padding: '0px' }}>Remove</Button> */}
                                    </div>
                                </div>
                                <Divider style = {{margin: '3%'}} />
                                </React.Fragment>
                            ))}
                        </div>
                        : 
                        ''}
                        {/* <Divider style = {{margin: '3%'}} /> */}
                    <div>
                        {!(this.state.isAdding) ? 
                            <Button variant =  "contained" onClick = {this.clickHandler} style = {{backgroundColor: '#2242a4', color: '#fff', textTransform: 'none', margin: '5%'}}>Add Payout method</Button> :
                            
                            <div>
                                <div style = {{fontSize: '18px', fontWeight: 'bold', marginLeft: '5%', paddingTop: '5%'}}>Add New Payout Method </div>
                                {this.state.timeZone == 'India' ? 
                                <div style = {{display: 'flex', flexDirection: 'column', margin: '5%'}}>
                                    <div>Full Name* </div>
                                    <input 
                                    type = "text" 
                                    style = {{width: '200px', height: '30px', border: '1px solid #ACB4BC'}}
                                    value={this.state.accountName} 
                                    name="accountName"
                                    onChange={ (e) =>  this.nameHandler(e)}
                                    />
                                    <div>Bank Account Number* </div>
                                    <input 
                                    type = "number" 
                                    name="accountNumber"
                                    style = {{width: '200px', height: '30px', border: '1px solid #ACB4BC'}}
                                    value={this.state.accountNumber}
                                    onChange = {(e) => this.nameHandler(e)}
                                    />
                                    <div>Re-enter Account Number* </div>
                                    <input 
                                    type = "number" 
                                    name="accountNumber"
                                    style = {{width: '200px', height: '30px', border: '1px solid #ACB4BC'}}
                                    value={this.state.accountNumber}
                                    onChange = {(e) => this.nameHandler(e)}
                                    />
                                    <div>IFSC Code* </div>
                                    <input 
                                    type = "text"
                                    name="ifscNumber"
                                    style = {{width: '200px', height: '30px', border: '1px solid #ACB4BC'}}
                                    value={this.state.ifscNumber}
                                    onChange={(e) => this.nameHandler(e)}
                                    />
                                    <div>Phone Number* </div>
                                    <input 
                                    type = "number"
                                    name="phoneNumber"
                                    style = {{width: '200px', height: '30px', border: '1px solid #ACB4BC'}}
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.nameHandler(e)}
                                    />
                                </div>

                                : 
                                    <div style = {{display: 'flex', flexDirection: 'column', margin: '5%'}}>
                                        <div>Paypal Link* </div>
                                        <input 
                                        type = "paypal"
                                        name="paypal"
                                        style = {{width: '200px', height: '30px', border: '1px solid #ACB4BC'}}
                                        value={this.state.paypal}
                                        onChange={(e) => this.nameHandler(e)}
                                        />
                                    </div>
                                }

                                <div style = {{display: 'flex',  flexDirection: 'row-reverse', margin: '3%'}}>
                                    <Button style = {{textTransform: 'none', color: '#fff', background: '#4CB039', margin: '3%'}}  onClick={this.saveHandler} >Save</Button>
                                    <Button style = {{textTransform: 'none', color: '#2242a4', margin: '3%', border: '1px solid #CDD3D9'}} onClick = {this.cancelHandler}>Cancel</Button>
                                </div>
                            </div>
                        }
                        
                    </div>
                </Paper>

                </div>
            </div>
            </Paper>
        )
    }
}

export default Payout


