// export const getPayoutRequest = {
//     method: 'get',
//     url: 'http://localhost:3000/users/getPayoutRequest',
// };

import axios from 'axios'
const baseURL = process.env.BACKEND_URL;

export default {
    getAccountDetails: (userId) => 
        axios({
            method: 'post',
            url: baseURL + '/users/getAccountDetails',
            data: {
                userId: userId
            }
        })
}