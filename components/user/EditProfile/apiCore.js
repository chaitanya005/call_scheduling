var data = JSON.stringify({"email":"namo@gmail.com","id":"1"});
import axios from 'axios'

export const updateProfile = {
  method: 'post',
  url: process.env.BACKEND_URL + '/users/updateProfile',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

// console.log(process.env.BACKEND_URL)

export default {
  getListings: (userId, type) =>
  axios({
    method: 'post',
    url: process.env.BACKEND_URL + '/users/getListings',
    data: {
      'advisorId': userId,
      'serviceType': type,
    },
  }),

  updateProfile: (userId, email, newName, content, profileImg) => 
  axios({
    method: 'post',
    url: process.env.BACKEND_URL + '/users/updateProfile',
    data: {
      'id': userId,
      'email': email,
      'userName': newName,
      'about': content,
      'photo': profileImg
    }
  }),

  getProfileCustomerView: (userId) => 
  axios({
    method: 'post',
    url: process.env.BACKEND_URL + '/users/getProfileCustomerView',
    data: {
      'userId': userId
    }
  }),

  follow: (userId, email) => 
    axios({
      method: 'post',
      url: process.env.BACKEND_URL + '/users/follow',
      data: {
        'followerEmail': email,
        'followingId': userId,
      }
    })

}