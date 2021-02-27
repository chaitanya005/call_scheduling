import axios from 'axios'
const baseURL = "http://localhost:3000";

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