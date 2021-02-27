import React , { useState, useEffect } from 'react'
import AppBar from '../AppBar/AppBar'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import styles from './followers.module.sass'
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import Grid from '@material-ui/core/Grid';
import ExportIcon from '../../../public/images/export.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tooltip from '@material-ui/core/Tooltip';
import { CSVLink, CSVDownload } from "react-csv";
import api from './apiCore'
import axios from 'axios'
// import {useSession} from 'next-auth/client'
import moment from 'moment'
import { useRouter } from 'next/router'

const Followers = () => {
    const [copied, setCopied] = useState(false)
    const [followers, setFollowers] = useState([
        // {"id": 1, "email" : "drakep@gmail.com", "data": "15/08/2017", "source": "Profile page"},
        // {"id": 2, "email" : "drakep@gmail.com", "data": "15/08/2017", "source": "Profile page"},
        // {"id": 3, "email" : "drakep@gmail.com", "data": "15/08/2017", "source": "Profile page"},
        // {"id": 4, "email" : "drakep@gmail.com", "data": "15/08/2017", "source": "Profile page"},
    ])
    const [userId, setUserId] = useState(null)
    const [seristo_user, setAdvisorName] = useState('')
    const [id, setAdvisorId] = useState('')
    const router = useRouter()

    // const [session ] = useSession()
 
    // const email = session.user.email
    // const loggedInUser = session.user.name
    // const img = session.user.image
    // const socialLogin = {
    //     method: 'post',
    //     url: 'http://localhost:3000/users/socialLogin',
    // }

    useEffect(() => {
        // axios(Object.assign({}, socialLogin, { data: { email: email, userName: loggedInUser, image: img } }))
        //     .then(res => getUserId(res))
        //     .catch((err) => console.log(err))

        //     function getUserId (response) {
        //         if (response.data.data.user) {
        //             console.log('user')
        //             setUserId(response.data.data.user.id)
                  
        //         }
        //         else if (response.data.data.userResult) {
        //             console.log('userResult')
        //             setUserId(response.data.data.userResult.id)
        //             api.getFollowers(response.data.data.userResult.id)
        //             .then(res => setFollowers(res.data.data))
        //             .catch(err => console.log(err))

        //         }
        //         return false
        //     }

        if (localStorage.getItem('userInfo')) {
            var data = JSON.parse(localStorage.getItem('userInfo'))
            // console.log(data)
            setAdvisorName(data.userName)
            setAdvisorId(data.userId)
            api.getFollowers(data.userId)
                .then(res => setFollowers(res.data.data))
                .catch(err => console.log(err))
        } else {
            router.push('/')
        }
        
    }, [])

    let url = `https://seristo.com/user/profile?id=${id}&seristo_user=${seristo_user}`

    const handleTooltipClose = () => {
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }

    return (
        <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px',}}
            variant='outlined'>
            <AppBar  />

            <Divider />

            <div className = {styles.title}>
                <h1>Followers</h1>
            </div>

            <Divider />

            <div className = {styles.BackDrop} style = {{display: 'flex', flexDirection: 'column', height: '580px', overflow: 'auto'}}>
                <Paper style = {{marginLeft: '3%', marginTop: '3%', width: '94%'}}>
                    <div className = {styles.flexDisplay}>
                        {/* <div className = {styles.amountDiv}>
                            <div className = {styles.status}>Lifetime followers</div>
                            <div className = {styles.amount}>200</div>
                        </div>
                        <Divider  orientation="vertical" flexItem />
                        <div className = {styles.amountDiv}>
                            <div className = {styles.status}>New followers this week</div>
                            <div className = {styles.amount}>50</div>
                        </div> */}
                    </div>
                    {/* <Divider /> */}
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                        <div style ={{width: '100%'}}>
                            <div style = {{textAlign: 'center', padding: '2%' }}>
                                Share your profile on social media to get more followers!
                                {' '}
                                {' '}
                                <Tooltip
                                    PopperProps={{
                                    disablePortal: true,
                                    }}
                                    onClose={handleTooltipClose}
                                    open={copied}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title="Copied"
                                >
                                    <CopyToClipboard text={url} onCopy = {handleTooltipClose} >
                                        <Button 
                                        variant = "contained" 
                                        color = "primary" 
                                        startIcon = {<LinkIcon />} 
                                        >Copy Profile Link</Button>        
                                    </CopyToClipboard>
                                </Tooltip>

                                
                            </div>
                        </div>
                    </div>
                </Paper>

                
                <div className = {styles.BookingsTable}>
                    {/* <div className = {styles.searchItems}>
                        <input 
                        className = {styles.search} 
                        type = 'text'
                        placeholder = 'Search'
                        />

                        <div className = {styles.export}>
                            <Button  color="default" className = {styles.exportbtn}
                            style = {{backgroundColor: '#fff', fontSize: '12px'}}
                            >
                                <ExportIcon style = {{height: '12px', width: '12px', marginRight: '3px'  }} />Export
                            </Button>
                        </div>


                        <div className = {styles.export}>
                            <CSVLink data={followers} filename = {"Seristo_followers.csv"} style = {{textDecoration: 'none'}}>
                                <Button  color="default" className = {styles.exportbtn}
                                style = {{backgroundColor: '#fff', fontSize: '12px'}}
                                >
                                    <ExportIcon style = {{height: '12px', width: '12px', marginRight: '3px'  }} />Export
                                </Button>
                            </CSVLink>
                        </div>

                    </div> */}
                    <div className = {styles.columns}>
                        <Grid container spacing={3} className = {styles.columnsGrid}>
                            <Grid item xs={6}>
                            Follower email ID
                            </Grid>
                            <Grid item xs={6}>
                            Follow Date
                            </Grid>
                            {/* <Grid item xs={4}>
                            Follower signup source
                            </Grid> */}
                        </Grid>
                    </div>


                    <div className={styles.rows}>
                            {followers && followers.map(follower => (
                                <div>
                                        <Grid
                                        container spacing={3}
                                        className={styles.rows}
                                    >
                                        <Grid item xs={6}>
                                            {follower.followerEmail}
                                        </Grid>
                                        <Grid item xs={6}>
                                            {moment(follower.createdAt).format('DD/MM/YY')}
                                        </Grid>
                                        {/* <Grid item xs={4}>
                                            {follower.source}
                                        </Grid> */}
                                        
                                        <hr style={{ width: '98%' }} />
                                    </Grid>
                                    </div>
                            ))}
                    </div>
                </div>

            </div>
        </Paper>
    )
}

export default Followers