import { Link } from '@material-ui/core'
import React, { Component, useState } from 'react'
import Logo from '../../mainLogo'
import GoogleLogo from '../../../public/images/googleLogo.svg'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
// import { signIn, useSession } from 'next-auth/client';
import classes from './login.module.sass'
import api from '../../../lib/api'

const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setLoggedIn] = useState(false)


    const googleLogin = () => {
        // console.log('..')
        // signIn('google')
        // .then((res) => console.log(res))
        api.getOuathUrl()
            .then(res => {
                const url = res.data
                window.open(url, "_self")
            })
            .catch(err => console.log(err))
    }

    const login = () => {
        if (userName === 'admin@gmail.com' && password === 'adminadmin' ) {
            // setLoggedIn(true)
            localStorage.setItem('isLogin', true)
        }
    }

        return(
            <div>
                <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <div className={classes.logo}>
                        <Logo className={classes.mainLogo} />
                    </div>
                    {/* <div style = {{color: 'white', marginLeft: '40%', marginTop: '3%',  fontSize: '18px'}}>Don't have account?</div> */}
                </div>

                <div>
                    {/* <Paper className = {classes.paper}>
                        
                        <div>
                            <div className = {classes.login}>Log in</div>
                            <div style = {{fontSize: '18px', marginLeft: '5%'}}>Continue to your store</div>

                            <div className = {classes.inputFields}>
                                <div className = {classes.inputDiv}>Email Address</div>
                                <input type = "text" className = {classes.inputText} onChange = {(e) => setUserName(e.target.value)} />
                            </div>
                            <div className = {classes.inputFields}>
                                <div className = {classes.inputDiv}>Password</div>
                                <input type = "text" className = {classes.inputText} onChange = {(e) => setPassword(e.target.value)}/>
                            </div>

                            <div style = {{marginLeft: '5%', marginTop: '3%'}}>
                                <a href = "" style = {{textDecoration: 'none'}}>Forgot Password ?</a>
                            </div>

                            <div style = {{marginLeft: '5%', marginTop: '1%'}}>
                                <Button variant = "contained" className = {classes.logInbtn} onClick = {login} >Log in to your Seristo account</Button>
                            </div>
                        </div>
                        

                       


                         <div className = {classes.bottomDiv}>
                            <p className = {classes.terms}>Terms</p>
                            <p className = {classes.terms}>Privacy</p>
                            <p className = {classes.terms}>Help</p>
                        </div>
                    </Paper> */}

                    <div className={classes.logInContainer}>
                        <Button  className={classes.signInButton} variant = "contained" 
                        onClick={() => googleLogin()}
                        startIcon={<GoogleLogo />}>
                        Continue with Google</Button>
                    </div>
                </div>
            </div>
        )
}


export default Login