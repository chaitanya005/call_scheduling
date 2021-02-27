var data = JSON.stringify({"userId":1});

export const config = {
  method: 'post',
  url: process.env.BACKEND_URL +  `/users/getBooking`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

import axios from 'axios'

export default {
  getBookings: (userId) =>
  axios({
      method: 'post',
      url: process.env.BACKEND_URL + '/users/getBooking',
      data: {
        userId: userId
      }
    }),
  
}