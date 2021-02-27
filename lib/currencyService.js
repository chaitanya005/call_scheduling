import moment from './moment-timezone-with-data.js';



export default {
  getDefaultCurrency: () => {
    if (moment.tz.guess()==='Asia/Calcutta') {
      return 'rupee';
    } else {
      // console.log('returned dollar')
      return 'dollar'; // dollar code
    }
  },

  /* getUsers: () => {

  } */
};
