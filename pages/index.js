import React, { Component, useEffect, useState } from 'react'
import GLogin from '../components/user/GoogleLogin/GoogleLogin'

import { useRouter } from 'next/router'
// import { signin, signout, useSession } from 'next-auth/client';
import Login from '../components/user/Login/Login'
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import axios from 'axios'

function App() {



  // const [session, loading] = useSession();
  const [userId, setUserId] = useState(null)
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [page, setPage] = useState('')

 /*  const socialLogin = {
    method: 'post',
    url: 'http://localhost:3000/users/socialLogin',
  } */

  // if (loading) return <p>Loading...</p>
  // console.log(session)

  /* if (!localStorage.getItem('isLogin')) {
    return (
      
    )
  } */
  // else {
    // console.log(session.user)
    // const email = session.user.email
    // const name = session.user.name
    // const img = session.user.image
    // const userData = { email: email, name: name, img: img }
    // console.log(userData)
    // axios(Object.assign({}, socialLogin, { data: { email: email, userName: name, image: img } }))
    //   .then((res) => {
    //     setTimeout(() => {
    //       router.push({
    //         pathname: '/user/listings',
    //         query: {id: userId}
    //       })
    //     }, getUserId(res));
    //   }
    //   )
    //   .catch((err) => console.log(err))

    // console.log('sjdflksdfj')
    // router.push('/user/listings')

  // }

  // let page  = ''

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      router.push('/user/listings')
    } else {
      setPage(<div style={{
          display: 'flex', flexDirection: 'row',
          backgroundColor: '#2242A4',
          width: '100vw', height: '100vh'
        }}>
          <div style={{ flex: 5.5 }}>
            <Login />
          </div>
        </div>)
    } 
  }, [])



  
  
  /* function getUserId (response) {
    if (response.data.data.user) {
      setUserId(response.data.data.user.id)
      return true
    }else if (response.data.data.userResult) {
      setUserId(response.data.data.userResult.id)
      return true
    }
    return false
  } */

  return (
    <div>
      {page}
      {/* localStorage.getItem('userInfo') ?
        <div> 
          {router.push('/user/listings')}
        </div>
      : 
      <div style={{
        display: 'flex', flexDirection: 'row',
        backgroundColor: '#2242A4',
        width: '100vw', height: '100vh'
      }}>
        <div style={{ flex: 5.5 }}>
          <Login />
        </div>
      </div>
     */}
    </div>
  )
}

export default App