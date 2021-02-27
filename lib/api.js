import axios from 'axios';
const baseURL = process.env.BACKEND_URL;
export default {
  getOuathUrl: () =>
    axios({
      method: 'get',
      url: baseURL + '/users/getOuathUrl',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/users'
      }
    }),
    isLogin: (authenticationId, email) =>
    axios({
      method: 'post',
      url: baseURL + '/users/isLogin',
      data: {
        'authenticationId': authenticationId,
        'email': email,
      },
    }),
  
  getListings: (userId, type) =>
    axios({
      method: 'post',
      url: baseURL + '/users/getListings',
      data: {
        'advisorId': userId,
        'serviceType': type,
      },
    }),
  getListingForAdvisor: (userId) => 
    // console.log(userId),
    axios({
      method: 'post',
      url: baseURL + '/users/getListingForAdvisor',
      data: {
        'advisorId': userId,
      },
    }),

  getListingDetails: (id) =>
    axios({
      method: 'get',
      url: baseURL + '/users/getListingDetails',
      params: {
        id: id,
      },
    }),

  createListing: (listing) =>
    axios({
      method: 'post',
      url: baseURL + '/users/createListing',
      data: listing,
    }),

  // uploadImage: (image) => 
  //   axios({})

  updateListing: (listing) =>
    // console.log(listing),
    axios({
      method: 'post',
      url: baseURL + '/users/updateListing',
      data: listing,
    }),

  areTimingsClashing: (slots, serviceType) =>

    axios({
      method: 'get',
      url: baseURL + '/users/areTimingsClashing',
      params: {
        slots,
        serviceType,
      },
    }),

  getFreeSlots: (id, date) =>
    axios({
      method: 'get',
      url: baseURL + '/users/getFreeSlots',
      params: {
        id,
        date,
      },
    }),

  createBooking: (data) =>
    axios({
      method: 'post',
      url: baseURL + '/users/createBooking',
      data,
    }),

  getPofile: (id) =>
    axios({
      method: 'post',
      url: baseURL + '/users/getProfileCustomerView',
      data: {
        userId: id
      },
    }),

  getDashboardData: (userId) =>
    axios({
      method: 'post',
      url: baseURL + '/users/getDashboardDetails',
      data: {
        userId: userId
      }
    }),

  postAccountDetails: (userId, accountName, ifsc, accountNumber) =>
    axios({
      method: 'post',
      url: baseURL + '/users/saveAccountDetails',
      data: {
        userId: userId,
        accountName: accountName,
        ifsc: ifsc,
        accountNumber: accountNumber
      }
    }),

  getAccountDetails: (userId) => 
        axios({
            method: 'post',
            url: baseURL + '/users/getAccountDetails',
            data: {
                userId: userId
            }
        }),
  startPayout: (userId) =>
        axios({
          method: 'post',
          url: baseURL + '/users/startPayout',
          data: {
                userId: userId
          }
        }),
  getPayoutHisory: (userId) =>
        axios({
          method: 'post',
          url: baseURL + '/users/getPayoutHistory',
          data: {
            userId: userId
          }
        }),
  saveUserDefaultDetails: (userId, currency, country) =>
        axios({
          method: 'post',
          url: baseURL + '/users/saveUserDefaultDetails',
          data: { 
            userId: userId,
            currency:  currency,
            country: country
          }
        }),
};
