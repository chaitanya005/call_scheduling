import axios from 'axios'


export default {
    getFollowers: (userId) =>
        axios({
            method: 'post',
            url:  process.env.BACKEND_URL + '/users/getFollowers',
            data: {
            'followingId': userId
            }
        })
}