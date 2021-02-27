import React, { Component } from 'react'
import AppBar from '../AppBar/AppBar'
import Paper from '@material-ui/core/Paper';
import styles from './Settings.module.sass'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import GoogleLogo from '../../../public/images/googleLogo.svg'

class Settings extends Component {
    render() {
        return (
            <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px',}}
            variant='outlined'>
            <AppBar />


            <Divider />

            <div className = {styles.title}>
                    <h1>Settings</h1>
            </div>

            <Divider />


            <div className = {styles.BackDrop}>
                <div style = {{marginLeft: '8%', height : '550px', overflow: 'auto'}}>
                    <h2>General</h2>

                    <div className = {styles.flexDiv}>
                        <p style = {{fontWeight: 'bold', fontSize: '16px'}}>Personal Details</p>

                        <Paper className = {styles.details}>
                            <div className = {styles.generalSettings}>
                                <img src = "{this.props.userDetails.image}" style = {{borderRadius: '50px', width: '60px', height: '60px'}} alt = "" />                                       
                                <Button variant = "contained" className = {styles.uploadbtn}>Upload Photo</Button>
                                <Button variant = "contained" className = {styles.uploadbtn}>Remove Photo</Button>
                            </div>
                            <Divider />
                            
                            <div className = {styles.generalSettings}>
                                <div style = {{flexDirection: 'column'}}>
                                    <div className = {styles.fields}>First Name</div>
                                    <div>
                                        <input type = "text" className = {styles.inputFields} />
                                    </div>
                                </div>
                                <div>
                                    <div className = {styles.phoneField}>Last Name</div>
                                    <div>
                                        <input type = "text" className = {styles.lastNameField} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className = {styles.generalSettings}>
                                <div style = {{flexDirection: 'column'}}>
                                    <div className = {styles.fields}>Email</div>
                                    <div>
                                        <input type = "text" className = {styles.inputFields} />
                                    </div>
                                </div>
                                <div>
                                    <div className = {styles.phoneField}>Phone (optional)</div>
                                    <div>
                                        <input type = "text" className = {styles.lastNameField} />
                                    </div>
                                </div>
                            </div>

                            
                        </Paper>
                    </div>

                    {/* <Divider className = {styles.divider}/> */}

                    {/* <div className = {styles.flexDiv}>
                        <p style = {{fontWeight: 'bold', fontSize: '16px'}}>Pricing Plan</p>

                        <Paper className = {styles.allDivs}>
                            <div className = {styles.titles} style = {{ fontSize: '25px', fontWeight: 'bold'}}>Pro account</div>
                            <div className = {styles.titles}>Your Seristo Pro account expires on 30-11-2020.</div>
                            <div style = {{display: 'flex',flexDirection: 'row-reverse', margin: '3%'}}>
                                <Button className =  {styles.buttons}>Turn off auto-renewal</Button>
                            </div>
                        </Paper>
                    </div> */}


                   {/*  <Divider className = {styles.divider}/>

                    <div className = {styles.flexDiv}>
                        <div style = {{display: 'flex', flexDirection: 'column'}}>
                            <p style = {{fontWeight: 'bold', fontSize: '16px'}}>Login Service</p>
                            <p  style = {{width: '150px',}}>Connect an external login service to quickly and securely access your Seristo account
                            </p>
                        </div>
                        <Paper className = {styles.loginService}>
                            <div className = {styles.titles} style = {{fontWeight: 'bold'}}>Connected login service</div>
                            <Divider className = {styles.innerDiv}/>
                            <div style = {{marginLeft: '2%', marginTop: '2%'}}>You do not have an external login service connected to your Seristo Account.</div>
                            <Divider className = {styles.innerDiv}/>
                            <div style = {{margin: '3%', display: 'flex'}}>
                                <GoogleLogo />
                                <div style = {{marginLeft: '3%'}}><a href = "" >Connect to Google</a></div>
                            </div>
                        </Paper>
                    </div> */}

               {/*      <Divider className = {styles.divider}/>

                    <div className = {styles.flexDiv}>
                        <p style = {{fontWeight: 'bold', fontSize: '16px'}}>Change Password</p>

                        <Paper className = {styles.changePassword}>
                            <div className = {styles.titles}>Your password was last changed 3 months ago.</div>
                            <div style = {{margin: '3%'}}>
                                <Button className =  {styles.buttons}>Change Password</Button>
                            </div>
                        </Paper>
                    </div> */}

                    <Divider className = {styles.divider}/>

                    <div className = {styles.flexDiv}>
                        <p style = {{fontWeight: 'bold', fontSize: '16px'}}>Preffered Language</p>

                        <Paper className = {styles.langauge}>
                            <div className = {styles.titles}>Langauge</div>

                            <div>
                                <select className = {styles.dropDown}>
                                    <option value = "English">English</option>  
                                    <option value="Spanish">Spanish</option>
                                </select>
                            </div>
                            <Divider />
                            <div className = {styles.titles}>Regional Format</div>

                            <div>
                                <select className = {styles.dropDown} style = {{width: '200px'}}>
                                    <option value = "India">India</option>  
                                    <option value="England">England</option>
                                </select>
                                <p style = {{marginLeft: '3%'}}>Your number, time, date and currency formats are set for English (India)</p>
                            </div>
                        </Paper>
                    </div>


                    <Divider className = {styles.divider}/>


                    {/* <div className = {styles.flexDiv}>
                        <p style = {{fontWeight: 'bold', fontSize: '16px'}}>Timezone</p>

                        <Paper className = {styles.timeZone}>
                            <div className = {styles.titles}>Timezone</div>
                            <div>
                                <select className = {styles.dropDown} style = {{width: '350px'}}>
                                    <option value = "India">(GMT +05:30) Chennai, Kolkata, Mumbai, New Delhi</option>  
                                </select>
                            </div>
                        </Paper>
                    </div> */}

                </div>
            </div>

            </Paper>
        )
    }
}

export default Settings

