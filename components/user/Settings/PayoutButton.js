import React , {Component} from 'react'
import Modal from '../Bookings/Modal/Modal'
import Button from '@material-ui/core/Button';
import api from './apiCore'


class PayoutBtn extends Component  {
    state = {
        startPayout:  false,
        accountDetails: [],
        // accountName: '',
        // accountNumber: '',
        // ifscCode: ''
    }

    payoutHanlder = () => {
        api.getAccountDetails(this.props.userId)
        .then(res => {
            // console.log(res)
            this.setState({
                accountDetails: res.data.data
            })
        })
        .catch(err => console.log(err))

        this.setState({
            startPayout: true
        })
    }

    payoutCancel = () => {
        this.setState({
            startPayout: false
        })
    }


    render() {
        // console.log(this.props.amountToPaid)
        return (
            <React.Fragment>
                <Modal 
                show = {this.state.startPayout} 
                amountToPaid = {this.props.amountToPaid} 
                userId = {this.props.userId} 
                accountDetails = {this.state.accountDetails}
                button = 'payout' modalClosed = {this.payoutCancel} />
                <Button
                onClick = {this.payoutHanlder}
                variant = "contained" style = {{background: '#2242a4', textTransform: 'none', color: '#fff', marginLeft: '38%', marginBottom: '5%'}}>
                Start payout
                </Button>
            </React.Fragment>
        )
    }
}

export default PayoutBtn