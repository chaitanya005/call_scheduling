import React from 'react'
import PayoutBtn from './PayoutButton'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';


const currentPayout = ({userId, payOutAmount, symbol}) => {
    return (
        <React.Fragment>
            <Paper style = {{marginTop: '3%', marginLeft: '5%', width: '500px', }}>
                <div style = {{fontSize: '18px', fontWeight: 'bold', marginLeft: '5%', paddingTop: '5%'}}>Current Payout</div>
                <Divider style = {{margin: '3%'}} />
                <div style = {{fontSize: '22px', color: '#484F56'}} align="center" >Amount ready for payout </div>   
                <div style = {{fontSize: '45px'}} align="center"> {symbol} {payOutAmount === '' ? 0 : payOutAmount}</div>                   
                <PayoutBtn userId = {userId} amountToPaid = {payOutAmount} />
            </Paper>
        </React.Fragment>
    )
}

export default currentPayout