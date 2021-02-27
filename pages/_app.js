import '../styles/globals.css';
import 'fontsource-roboto';
import theme from '../lib/theme.js';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import '../styles/globals.css'
// import { Provider } from 'next-auth/client';
// import { signin, signout, useSession } from 'next-auth/client';
import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css' // @fullcalendar/timegrid imports @fullcalendar/daygrid
import '@fullcalendar/timegrid/main.css'
import {useState} from 'react'
import { useRouter } from 'next/router';

function MyApp({Component, pageProps}) {
  const { session } = pageProps;
  const [userId, setUserId] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  React.useEffect(() => {
  // Remove the server-side injected CSS. TODO why?
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

  //   fetch('http://localhost:3000/users/isLogin', {
  //     method: 'post',
  //     mode: 'cors',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       authenticationId: router.query.user,
  //       email: ""
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(val => {
  //     console.log(val)
  //     const userDetails = val.userInfoObject
  //     localStorage.setItem('userInfo', JSON.stringify(userDetails))
  //     localStorage.setItem('accessToken', val.access_token)
  //   })
  //   .catch(err => console.log(err))

    // if (localStorage.getItem('accessToken')) {
    //   setIsLoggedIn(true)
    // } else {
    //   router.push('/')
    // }

  }, []);

  // async function getStaticProps()  {

  // }

  


  return (
    <React.Fragment>
        <div> 
        <Head>
          <title>Seristo</title>
          <meta name="viewport" content="minimum-scale=1,
          initial-scale=1, width=device-width" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300&display=swap" rel="stylesheet"></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="../../favicons/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="../../favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="../../favicons/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="../../favicons/android-chrome-512x512.png"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
        </div>
    </React.Fragment>
  );
}

export default MyApp;
