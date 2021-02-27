import React,  {useState, useEffect} from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import styles from './Modal.module.sass'
import emailjs from 'emailjs-com';
// import { SMTPClient } from 'emailjs'
import{ init } from 'emailjs-com'
init("user_sJSKzvb1LdoFGWAuBrrb0");
import Modal from './Modal'
import Spinner from '../../../LoadingOverlay'
import api from '../../../../lib/api'
import {PaymentSuccessful} from '../../../CreateBooking/PaymentStatusPages'

const SendEmail = ({amountToPaid, accountName, accountNumber, ifsc, cancelPayout}) => {

    const [spinner, setSpinner] = useState(<div></div>)
    const [userId, setUserId] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userInfo')) {
            var data = JSON.parse(localStorage.getItem('userInfo'))
            setUserEmail(data.email)
            setUserId(data.userId)
        }
    }, [])


    const sendEmail = () => {
        if (amountToPaid > 0) {
            setLoading(true)
            emailjs.send('service_g90sg6l','template_8vhpp1q', {
                to_name: 'Seristo',
                from_name: 'chaitanya', 
                requestedFrom: 'Seristo Advisor',
                requestedAmt: amountToPaid,
                accountNumber: accountNumber,
                accountName: accountName,
                ifscCode: ifsc,
                from_email: userEmail
            })
            .then(async(response) => {
                console.log('SUCCESS!', response)
                setLoading(false)
                setSpinner(<Spinner message = "Request Sent Sucesfully" isFullScreen = {true}/>)
                setTimeout(() => setSpinner(<div></div>), 3000)
                await api.startPayout(userId)
                    .then(res => {
                        console.log(res)
                        setTimeout(() => {
                            document.location.reload(true)
                        }, 1000);
                    })
                    .catch(err => console.log(err))
            }, function(err) {
            console.log('FAILED...', err);
            })
        } else {
            setSpinner(<Spinner message = {`You can't send Request with this amount: ${amountToPaid}`} isFullScreen = {true}/>)   
            setTimeout(() => setSpinner(<div></div>), 3000)
        }
    }

    const closeModal = () => {
        setSpinner(false)
    }

    return (
        <div>
            {loading ? <Spinner message = "Sending Request..." isFullScreen = {true}/> : ''}
            <div>{spinner}</div>
            <div style = {{fontSize: '16px', fontWeight: 'bold', marginLeft: '5%', paddingTop: '3%', width: '500px'}}>Payment Method (Payout Amount: {amountToPaid})</div>
            <Divider style = {{width: '450px', marginLeft: '5%', marginTop: '2%'}} />

            <div className = {styles.payoutBank}>
                <div className = {styles.bankImg}>
                    {/* <img src = "/images/hdfc.png" style ={{width: '130px', height: '30px'}} /> */}
                </div>
                <div className = {styles.accntDetails}>
                    <div>Account Name: {accountName}</div>
                    <div>Account number: {accountNumber}</div>
                </div>
            </div> 
            
            <div style = {{display: 'flex',  flexDirection: 'row-reverse', margin: '3%'}}>
                <Button style = {{textTransform: 'none', color: '#fff', background: '#4CB039', margin: '3%'}} onClick={sendEmail} >Submit</Button>
                <Button style = {{textTransform: 'none', color: '#2242a4', margin: '3%', border: '1px solid #CDD3D9'}} onClick = {cancelPayout}>Cancel</Button>
            </div>

      
        </div>
    )
}

export default SendEmail