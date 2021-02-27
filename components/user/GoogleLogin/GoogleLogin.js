import React, { Component } from 'react'
import {useRouter} from 'next/router'
import Bookings from '../../../pages/user/bookings'
import Schedule from '../../../pages/user/schedule'



class GLogin extends Component {

    state = {
        isSignedIn: null,
        authInstance: ''
    }

    insertGapiScript() {
        const script = document.createElement('script')
        script.src = 'https://apis.google.com/js/platform.js'
        script.onload = () => {
            this.initializeGoogleSignIn()
        }
        document.body.appendChild(script)
    }

    componentDidMount() {
        this.insertGapiScript()
    }

    initializeGoogleSignIn() {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: '854711409303-1m32d3v7auj6u0cb226q9m7t3une122d.apps.googleusercontent.com',
                cookie_policy: 'single_host_origin'
            }).then(() => {
                const authInstance = window.gapi.auth2.getAuthInstance()
                this.setState({authInstance: authInstance})
                const isSignedIn = authInstance.isSignedIn.get()
                this.setState({isSignedIn})

                authInstance.isSignedIn.listen(isSignedIn => {
                    this.setState({isSignedIn})
                })

                window.gapi.load('signin2', () => {
                    window.gapi.signin2.render('loginBtn')
                })
                
            })

           
        })
        // console.log('api')
    }

    ifUserSignedIn(Component) {
        // const router = withRouter()
        // console.log(<withRouter />)
        if (this.state.isSignedIn == null) {
            return (
                <p></p>
            )
        }

        return this.state.isSignedIn  ? 
           <Component auth = {this.state.authInstance} isSignedIn  = {this.state.isSignedIn} /> :  <LoginPage /> 
    }
    
     render() {
        return(
            <div>
                {this.ifUserSignedIn(Dashboard)}
            </div>
        )
    }
}

export default GLogin


const Dashboard = (auth, isSignedIn) => {

    const router = useRouter()
    

    router.push('/user/bookings')
    // const authInstance = window.gapi.auth2.getAuthInstance()
    // const currUser = authInstance.currentUser.get()
    // const profile = currUser.getBasicProfile()
    // const email = profile.getEmail()
    // const name = profile.getName()
    // const imageUrl = profile.getImageUrl()

    console.log(auth)
    console.log(isSignedIn)


    return (
        <div>
            <Bookings auth = {auth} isSignedIn = {isSignedIn} />
            <Schedule auth = {auth} isSignedIn = {isSignedIn} />
        </div>
    )


} 

class LoginPage extends Component {
    componentDidMount() {
        if (this.props.isSignedIn === null) {
            return (<h1>Loadding...</h1>)
        }
        window.gapi.load('signin2', () => {
            window.gapi.signin2.render('loginBtn')
        })
    }

    render() {
        return(
            <div>
            <div id = "loginBtn"></div>
            <style global jsx>{`
                .abcRioButtonContentWrapper{
                    background: #000; !important
                    color: #fff; !important
                }
            `}</style>
            </div>
        )

    }
}