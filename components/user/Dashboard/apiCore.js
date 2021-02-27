// export const config = {
//   method: 'get',
//   url: 'http://localhost:3000/users/getDashboarbDetails',
// };

import axios from 'axios'

export default {
  getDashboardData: (userId) =>
  axios({
    method: 'post',
    url: process.env.BACKEND_URL + '/users/getDashboardDetails',
    data: {
      userId: userId
    }
  })
}