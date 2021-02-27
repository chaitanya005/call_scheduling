import TopBar from '../../../components/user/AppBar/AppBar.js';
import Paper from '@material-ui/core/Paper';
import SideNavSection from '../../../components/user/sideNavSection';
import Divider from '@material-ui/core/Divider';
import TitleAndSaveActionsBar from
  '../../../components/user/createNewListing/TitleAndActionsBar';
import Stepper from '../../../components/user/createNewListing/StepsToPublish';
import BasicInputSection from
  '../../../components/user/createNewListing/BasicDetailsInput';
import ChooseListingTypeSection from
  '../../../components/user/createNewListing/ChooseListingTypeSection';
import TimeBoundInput from
  '../../../components/user/createNewListing/TimeBoundInput';
import MembershipInput from
  '../../../components/user/createNewListing/MembershipInput';
import ProjectInput from
  '../../../components/user/createNewListing/ProjectInput';
import OneTimeInput from
  '../../../components/user/createNewListing/OneTimeInput';
import { useState, useEffect, useMemo } from 'react';
import ChooseDeliveryModeSection from
  '../../../components/user/createNewListing/ChooseDeliveryMode';
import CheckoutSection from
  '../../../components/user/createNewListing/CheckoutSection';
import ShareSection from
  '../../../components/user/createNewListing/ShareSection';
import styles from './styles.module.sass';
import api from '../../../lib/api';
import Spinner from '../../../components/LoadingOverlay';
import Router from 'next/router';
import { useRouter } from 'next/router'
// import { signin, signout, useSession } from 'next-auth/client';
import axios from 'axios'
import moment from 'moment'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  paper: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
}));

// listing recieved when we are editing an already existing lising
export default function NewlistingPage({ listing }) {
  const [formData, setFormData] = useState({});
  const [stepperState, setStepperState] = useState('listing');
  const [spinner, setSpinner] = useState(<div></div>);
  // const [session, loading] = useSession();
  const [userId, setUserId] = useState(null)
  const [listings, setListings] = useState([])
  const [toUpdateList, setToUpdateList] = useState(null)
  // const [updateListingId, setUpdateListingId] = useState(null)

  //getting loggedIn userId
  let email, name, img

  const router = useRouter()
  // console.log(router)

  useEffect(() => {
   /*  const socialLogin = {
      method: 'post',
      url: 'http://localhost:3000/users/socialLogin',
    } */
  
    /* if (session) {
      email = session.user.email
      name = session.user.name
      img = session.user.image
      // console.log(email, name)
      axios(Object.assign({}, socialLogin, { data: { email: email, userName: name, image: img } }))
        .then((res) => getUserId(res))
        .catch((err) => console.log(err))
    } */


    if (localStorage.getItem('userInfo')) {
      var data = JSON.parse(localStorage.getItem('userInfo'))
      setUserId(data.userId)
      api.getListingForAdvisor(data.userId)
        .then((res) => {
          setListings(res.data.data.anotherTask)
          // console.log(res.data.data)
          updateListing(res.data.data.anotherTask)
        })
        .catch(err => console.log(err))
      
        formDataUpdater({userId: data.userId, isActive:  true, userEmail: data.email})
    } else {
      router.push('/')
    }
  }, [userId])


  useEffect(() => {
    const date = new Date()
    const { 1: tz } = new Date(date).toString().match(/\((.+)\)/);
    
    // In Chrome browser, new Date().toString() is
    // "Thu Aug 06 2020 16:21:38 GMT+0530 (India Standard Time)"
  
    // In Safari browser, new Date().toString() is
    // "Thu Aug 06 2020 16:24:03 GMT+0530 (IST)"

    var timez = moment.tz.guess()
    // console.log(timez)
    var newYork = moment.tz(date, timez)
    var timeZones = moment.tz.names();
    // console.log(newYork)
    // console.log(timeZones)
  
    if (tz.includes(" ")) {
      // console.log(tz)
      formDataUpdater({timeZone: tz
        .split(" ")
        .map(([first]) => first)
        .join("")})
      return;
    } else {
      formDataUpdater({timeZone: tz})
      // console.log(tz)
      return tz;
    }


    
  }, [])

  // console.log(updateListingId)
 

  /* function getUserId (response) {
    if (response.data.data.user) {
      setUserId(response.data.data.user.id)
      return true
    }else if (response.data.data.userResult) {
      setUserId(response.data.data.userResult.id)
      api.getListingForAdvisor(response.data.data.userResult.id)
        .then((res) => {
          setListings(res.data.data)
          updateListing(res.data.data)
        })
        .catch(err => console.log(err))

      formDataUpdater({userId: response.data.data.userResult.id, isActive:  true})
      return true
    }
    return false
  } */


  function updateListing(listings) {
    for (let list of listings) {
      if (router.query.listingId == list.id) {
        setToUpdateList(list) 
        formDataUpdater({id: list.id})
      }
    }
  }
  


  // this function is passed to children which call this function to reflect
  // their state(input) in formData

  function formDataUpdater(data) { // data is added to form
    // console.log(data)
    // console.log(formData)
    const newFormData = formData;
    for (const propertyName in data) {
      if (data.hasOwnProperty(propertyName)) {
        newFormData[propertyName] = data[propertyName];
      }
    }
    setFormData(newFormData);
  }


  /* function dataURIToBlob(img) {
    // console.log(img)
    let image = img && img.replace(/^data:/, '');
    const type = image.match(/image\/[^;]+/);
    const base64 = image.replace(/^[^,]+,/, '');
    const arrayBuffer = new ArrayBuffer(base64.length);
    const typedArray = new Uint8Array(arrayBuffer);

    console.log(image)
    console.log(type)
    console.log(base64)
    console.log(arrayBuffer)

    for (let i = 0; i < base64.length; i++) {
      typedArray[i] = base64.charCodeAt(i);
    }


    console.log(typedArray)

    formData.imageToUpload = typedArray
    let output = new Blob([arrayBuffer], { type });
    console.log(output)
    formData.imageToUpload = typedArray

  } */

  // all from data stored in data object
  function onClickSaveOrPublish(command, listing) {
    // perform common Checks
    // console.log(command)
    // console.log(listing)
    if (formData.name === '' || formData.name === undefined) {
      alert('Please provide listing name');
      return;
    } else if (formData.description === '' ||
      formData.description === undefined) {
      alert('Please provide listing description');
      return;
    } else if (formData.deliveryMode === 'offline' &&
      (formData.address === '' || formData.address === undefined)) {
      alert('Please enter address');
      return;
    } else if (formData.deliveryMode === 'online') {
      if (formData.onlineMethodName === 'phone' && formData.phone === '') {
        alert('Please enter phone number');
        return;
      }
      if (formData.onlineMethodName === 'adminPhone' &&
        (formData.adminPhone === '' || formData.adminPhone === undefined)) {
        alert('Please enter admin phone number');
        return;
      }
      if (formData.type === 'customLink' && (
        formData.type === '' ||
        formData.type === undefined)) {
        alert('Please enter personal webinar link');
        return;
      }
    }

    // console.log(formData)
    // dataURIToBlob(formData.imageToUpload)
    // console.log(formData.imageToUpload)
    
    
    

    let data = {// add common data
      name: formData.name,
      description: formData.description,
      coverImage: formData.imageToUpload,
      isVisibleOnProfile: formData.isVisibleOnProfile,
      isActive: formData.isActive,
      userId: formData.userId,
      id: formData.id,
      userEmail: formData.userEmail,
      timeZone: formData.timeZone
    }

    // console.log(data)
    // console.log(coverImage)

    let deliveryInfo = {};
    if (formData.deliveryMode === 'offline') {
      deliveryInfo = {
        type: formData.deliveryMode,
        address: formData.address,
      };
    } else {
      if (formData.onlineMethodName === 'phone') {
        deliveryInfo = {
          type: formData.deliveryMode,
          onlineMethodName: 'phone',
          phone: formData.phone,
        };
      } else if (formData.onlineMethodName === 'adminPhone') {
        deliveryInfo = {
          type: formData.deliveryMode,
          onlineMethodName: 'adminPhone',
          adminPhone: formData.adminPhone,
        };
      } else if (formData.type === 'customLink') {
        deliveryInfo = {
          deliveryType: formData.deliveryMode,
          type: 'customLink',
          customLink: formData.customLink,
        };
      } else {
        deliveryInfo = {
          deliveryType: formData.deliveryMode,
          type: 'meet',
        };
      }
    }

    data = {
      ...data, ...{
        customLink: formData.customLink,
        type: formData.type,
        serviceDelivery: deliveryInfo,
      }
    };

    if (listing === null) {
      if (formData.serviceType === 'timeBound') { // time bound service
        if (formData.TBprice === '' || formData.TBprice === undefined) {
          alert('Please enter price timeBound');
          return;
        }
        if (formData.TBduration === '' || formData.TBduration === undefined) {
          alert('Please enter duration');
          return;
        }
        if (formData.TBduration < 15 && formData.TBdurationType === 'minutes') {
          alert('Event duration can\'t be less than 15 minutes');
          return;
        }
        if (formData.TBslots === undefined) {
          alert('Please enter at least one timing');
          return;
        }
        let allUndefined = true;
        for (let i = 0; i < formData.TBslots.length; i++) {
          if (formData.TBslots[i] !== undefined) {
            allUndefined = false;
          }
        }
        if (allUndefined === true) {
          alert('Enter at least one timing.....');
          return;
        }

        // to convert selected days info inside timings from set to array
        // (because otherwise days set uploaded as empty set)
        const timings = formData.TBslots;
        for (let i = 0; i < timings.length; i++) {
          timings[i].days = [...timings[i].days];
        }
        // console.log(JSON.stringify(timings))

        data = {
          ...data, ...{
            serviceType: 2,
            price: formData.TBprice,
            serviceDuration: formData.TBduration + formData.TBdurationType,
            serviceSchedule: timings,
          },
        };
      } else if (formData.serviceType === 'oneTime') { // one time event
        if (moment(formData.OTstartTime).format('HH:mm') === moment(formData.OTendTime).format('HH:mm')) {
          alert('Start time and end time of Event can\'t be same');
          return;
        }

        if (moment(formData.OTstartTime).format('HH:mm') > moment(formData.OTendTime).format('HH:mm')) {
          alert('End time should not be before Start time')
          return;
        }

        if (formData.OTprice === undefined || formData.OTprice === '') {
          alert('Enter price');
          return;
        }
        if (formData.OTtimingAvailable !== true) {
          // alert('Provided timing clashes with your schedule');
          // formData.OT
          console.log(formData)
          return;
        }

        data = {
          ...data, ...{
            serviceType: 3,
            price: formData.OTprice,
            currency: formData.currency,
            eventDuration: formData.OTduration + formData.OTdurationType,
            date: formData.OTdate,
            startTime: formData.OTstartTime,
            endTime: formData.OTendTime,
            maxParticipant: formData.OTmaxParticipants,
          }
        };
      } else if (formData.serviceType === 'project') { // project based service
        if (formData.Pprice === '' || formData.Pprice === undefined) {
          alert('Please Enter Price  project');
        }
        data = {
          ...data, ...{
            serviceType: 4,
            price: formData.Pprice,
            serviceDuration: formData.Pduration + ' ' + formData.PdurationType,
          }
        };
      } else { // membership
        if (formData.Mslots === undefined) {
          alert('Please enter at least one timing');
          return;
        }
        if (formData.MmaxParticipants === undefined ||
          formData.MmaxParticipants === '') {
          alert('Please enter max participants');
          return;
        }
        if (formData.Mprice === undefined ||
          formData.Mprice === '') {
          alert('Please enter price members');
          return;
        }
        // check whether slots array contains all undefined children
        // i.e, it is actually empty and thus a invalid input
        let allUndefined = true;
        for (let i = 0; i < formData.Mslots.length; i++) {
          if (formData.Mslots[i] !== undefined) {
            allUndefined = false;
          }
        }
        if (allUndefined === true) {
          alert('Enter at least one timing');
          return;
        }
        data = {
          ...data, ...{
            serviceType: 5,
            pricePerEntry: formData.Mprice,
            slots: formData.MformTimings,
            maxParticipant: formData.MmaxParticipants,
          }
        };
      }
    } else {  //update timeBoundListing
      if (listing.serviceType === 2) {
        if (formData.TBprice === '' || formData.TBprice === undefined) {
          alert('Please enter price timeBound');
          return;
        }
        if (formData.TBduration === '' || formData.TBduration === undefined) {
          alert('Please enter duration');
          return;
        }
        if (formData.TBduration < 15 && formData.TBdurationType === 'minutes') {
          alert('Event duration can\'t be less than 15 minutes');
          return;
        }
        if (formData.TBslots === undefined) {
          alert('Please enter at least one timing');
          return;
        }
        let allUndefined = true;
        for (let i = 0; i < formData.TBslots.length; i++) {
          if (formData.TBslots[i] !== undefined) {
            allUndefined = false;
          }
        }
        if (allUndefined === true) {
          alert('Enter at least one timing.....');
          return;
        }

        const timings = formData.TBslots;
        for (let i = 0; i < timings.length; i++) {
          timings[i].days = [...timings[i].days];
        }
        // console.log(JSON.stringify(timings))

        data = {
          ...data, ...{
            serviceType: 2,
            price: formData.TBprice,
            serviceDuration: formData.TBduration + formData.TBdurationType,
            serviceSchedule: timings,
          },
        };
      } else if (listing.serviceType === 4) { //update project
        if (formData.Pprice === '' || formData.Pprice === undefined) {
          alert('Please Enter Price  project');
        }
        data = {
          ...data, ...{
            serviceType: 4,
            price: formData.Pprice,
            serviceDuration: formData.Pduration + ' ' + formData.PdurationType,
          }
        };
      }
      // No updation of Timings for oneTime(3) and Membership(5)
      else if (listing.serviceType === 3) { //update onetime
        data = {
          ...data, ...{
            serviceType: 3,
            pricePerEntry: listing.pricePerEntry,
            // eventDuration: formData.OTduration + formData.OTdurationType,
            date: listing.date,
            startTime: listing.startTime,
            endTime: listing.endTime,
            maxParticipant: listing.maxParticipant,
          }
        };
      } else {  //udpate membership
        data = {
          ...data, ...{
            serviceType: 5,
            pricePerEntry: listing.pricePerEntry,
            slots: listing.slots,
            maxParticipant: listing.maxParticipant,
          }
        };
      }
    }
    // add checkout related data, questions etc..
    data = {
      ...data, ...{
        isEmailRequired: formData.emailRequired,
        questions: formData.questions,
        thankYouNote: formData.thankYouText,
        customerNameOption: formData.nameOption,
      }
    };

    if (command === 'publish') {
      data = {
        ...data, ...{
          isActive: true,
        }
      };
    }
    // console.log(data);
    setSpinner(<Spinner message='Processing...' isFullScreen={true} />);
    // convert data to formData
    // const uploadData = new FormData();
    // for (const propertyName in data) {
    //   if (data.hasOwnProperty(propertyName)) {
    //     uploadData.append(propertyName, data[propertyName]);
    //   }
    // }

    if (!(router.query.listingId)) { // create new listing
      // console.log(data)  
      api.createListing(data)
        .then((res) => {
          console.log(res)
          if (res.data.message !== 'success') {
            setSpinner(<Spinner message={'Event created successfully!'}
              isFullScreen={true} />);
            formDataUpdater({ listingID: res.data.data.event.listing_id });
            // setTimeout(() => Router.push('/user/listings'), 2000);
            setStepState(<SharePage
              formData={formData}
              formDataUpdater={formDataUpdater} />);

            if (command === 'publish') {
              setTimeout(() => Router.push('/user/listings'), 2000);
            } else {
              setTimeout(() => setSpinner(<div></div>), 3000);
            }
          } else {
            setSpinner(<Spinner message={`${res}`}
              isFullScreen={true} />);
          }
        })
        .catch((err) => {
          setSpinner(<Spinner message={
            `${err}`}
            isFullScreen={true} />);
          setTimeout(() => setSpinner(<div></div>), 5000);
        });
    } else { // need to only update
      // data.id = formData.listingID;
      console.log(data)
      api.updateListing(data)
        .then((res) => {
          setSpinner(<Spinner message={res.data.message}
            isFullScreen={true} />);
          setStepState(<SharePage
              formData={formData}
              formDataUpdater={formDataUpdater} />);
        })
        .catch((err) => setSpinner(<Spinner message={err.toString()}
          isFullScreen={true} />))
        .finally(() => {
          setTimeout(() => setSpinner(<div></div>), 2000);
          if (command === 'publish') {
            setTimeout(() => Router.push('/user/listings'), 2000);
          }
        });
      console.log(formData)
    }

    return 0;
  }
  function onClickPreview() {
    // TODO
    console.log(formData);
  }

  function stepperHandler(whichStep) {
    // load corresponding page
    // console.log(toUpdateList)
    if (whichStep !== 'share') {
      if (whichStep === 'listing') {
        setStepState(<NewListingInput
          formData={formData}
          formDataUpdater={formDataUpdater}
          goToCheckout={goToCheckout}
          listing = {toUpdateList}
          router = {router}
          />);
        setStepperState(whichStep);
      } else if (whichStep === 'checkout') {
        setStepState(<CheckoutPage onClickNext={goToShare} formData={formData}
          formDataUpdater={formDataUpdater} listing = {toUpdateList} />);
        setStepperState(whichStep);
      } else {
        if (0 === onClickSaveOrPublish('', toUpdateList)) { // all valid input tests were passed
          /* setStepState(<SharePage
            formData={formData}
            formDataUpdater={formDataUpdater} />); */
          setStepperState(whichStep);
        }
      }
    } else {
      if (0 === onClickSaveOrPublish('', toUpdateList)) { // all valid input tests were passed
        /* setStepState(<SharePage
          formData={formData}
          formDataUpdater={formDataUpdater} />); */
        setStepperState(whichStep);
      }
    }
  }

  function goToCheckout() {
    stepperHandler('checkout');
  }

  function goToShare() {
    stepperHandler('share');
  }

  const [stepState, setStepState] = useState(<NewListingInput 
    goToCheckout={goToCheckout}
    formData={formData}
    formDataUpdater={formDataUpdater}
    listing = {toUpdateList}
    router = {router}
  />);


  // let flag = 0

  // if (toUpdateList !== undefined) {
  //     if (flag < 1) {
  //       setStepState(<NewListingInput 
  //         goToCheckout={goToCheckout}
  //         formData={formData}
  //         formDataUpdater={formDataUpdater}
  //         listing = {toUpdateList}
  //         />)
  //       flag += 1
  //     }
  // }else {
  //   setStepState(<NewListingInput
  //   goToCheckout={goToCheckout}
  //   formData={formData}
  //   formDataUpdater={formDataUpdater}
  //    />)
  // }

  const [modalBody, setModalBody] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '32vh',
    width: '40vh'
    // overflow: 'scroll',
  });
  const [isCurrency, setCurrency] = useState(false)
  const [defaultCurrency, setDefaultCurrency] = useState('Select')
  const classes = useStyles()
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  const [message, setMessage] = useState('')

  const changeHandler = value => {
    setValue(value)
  }

  const currencyHandler = e => {
    setDefaultCurrency(e.target.value)
  }
  

  useEffect(() => {
      if (toUpdateList) {
        setStepState(<NewListingInput 
            goToCheckout={goToCheckout}
            formData={formData}
            formDataUpdater={formDataUpdater}
            listing = {toUpdateList}
            router = {router}
          />)
      }
  }, [toUpdateList])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveHandler = (currency, value) => {
    // console.log(currency, value)
    if (currency === 'Select' || value == '') {
      setMessage('Please Select the Currency and Country')
    } else {
    setMessage('')
    const country = value.label
    api.saveUserDefaultDetails(userId, currency, country)
      .then(res => {
        console.log(res)
        localStorage.setItem('DefaultCurrency', currency)
        localStorage.setItem('DefaultCountry', country)
        setCurrency(true)
        handleClose()
        document.location.reload(true)
      })
      .catch(err => {
        console.log(err)
        setMessage(err)
      })
    } 
  }

  useEffect(() => {
    console.log(message)
    if (localStorage.getItem('userInfo')) {
      const data = JSON.parse(localStorage.getItem('userInfo'))
      if (data.country !== null && data.currency !== null) {
        setCurrency(true)
      }
    }

    if (localStorage.getItem('DefaultCurrency')) {
      setCurrency(true)
    }

    if (!isCurrency){
      handleOpen()
      setModalBody(
        <div style={modalStyle} className={classes.paper}>
          <h4 style = {{marginLeft: '2%'}}>Select Default Currency and Country</h4>
          <Divider />
          <div style={{display: 'flex', margin: '5%'}}>
            <div>
              Currency:{' '}
            </div>
            <select
                value={defaultCurrency}
                onChange={currencyHandler}
                className={styles.dropDown}>
                <option value="Select">Select</option>
                <option value="Rupee">Rupee</option>
                <option value="Dollor">Dollor</option>
            </select>
            
          </div>
          <div style={{display: 'flex', margin: '5%'}}>
            <div>
              Country:{' '}
            </div>
            {' '}
            {/* <select
                // value={this.state.dropDown}
                // onChange={this.handleChange}
                className={styles.dropDown}>
                <option value="notification">Rupee</option>
                <option value="email">Dollor</option>
            </select> */}
            <Select
            className={styles.dropDownCoun}
            options={options} 
            value={value} 
            onChange={changeHandler} />
          </div>

          <div style = {{display: 'flex',  flexDirection: 'row-reverse', margin: '3%'}}>
            <Button className={styles.saveBtn} onClick={() => saveHandler(defaultCurrency, value)} >Save</Button>
            {message}
          </div>
        </div>
      )
    }
  },[value, defaultCurrency, message])
    
 
  return (
    <React.Fragment>
    {toUpdateList ? 
      <div className={styles.outermostBox}>
        {spinner}
        <SideNavSection selectedButtonName='listings' />
        {/* This div element represents rhs */}
        <div style={{ flex: 5.5, margin: '20px' }}>
          <Paper style={{
            borderRadius: '15px',
            borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px'
          }}
            variant='outlined'>
            <TopBar />
            <Divider />
            <TitleAndSaveActionsBar onClickSaveOrPublish={onClickSaveOrPublish}
              onClickPreview={onClickPreview} formDataUpdater={formDataUpdater} />
            <Divider />

            <Stepper state={stepperState} onClickHandler={stepperHandler} />
          </Paper>
          {stepState} {/* NewListingPage or CheckoutPage or SharePage */}
        </div>
    </div>
    : 
    <div className={styles.outermostBox}>
      {!isCurrency ?
        <Modal
        open={open}
        >
          {modalBody}
        </Modal>
      : ''}
        {spinner}
        <SideNavSection selectedButtonName='listings' />
        {/* This div element represents rhs */}
        <div style={{ flex: 5.5, margin: '20px' }}>
          <Paper style={{
            borderRadius: '15px',
            borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px'
          }}
            variant='outlined'>
            <TopBar />
            <Divider />

            <TitleAndSaveActionsBar onClickSaveOrPublish={onClickSaveOrPublish}
              onClickPreview={onClickPreview} formDataUpdater={formDataUpdater} />
            <Divider />

            <Stepper state={stepperState} onClickHandler={stepperHandler} />
          </Paper>
          {stepState} {/* NewListingPage or CheckoutPage or SharePage */}
        </div>
    </div>
    }
    </React.Fragment>
  );
};


function NewListingInput({ formData, formDataUpdater, goToCheckout, listing, router }) {
  const [listingSpecificInputPage, setListingSpecificInputPage] = useState();


  useEffect(() => {
    if (listing === null) {
      setListingSpecificInputPage(<TimeBoundInput formData={formData}
        formDataUpdater={formDataUpdater}  />)
    }

    if (formData.serviceType !== undefined) {
      choosingHandler(formData.serviceType);
    }

    if (listing !== null) {
      if (listing.serviceType === 2) {
        setListingSpecificInputPage(<TimeBoundInput 
          formData={formData}
          listing={listing}
          formDataUpdater={formDataUpdater}
          />)
      } else if (listing.serviceType === 3) {
        setListingSpecificInputPage(<OneTimeInput
          formData={formData}
          listing={listing}
          formDataUpdater={formDataUpdater} />)
      } else if (listing.serviceType === 4) {
        setListingSpecificInputPage(<ProjectInput
          formData={formData}
          listing={listing}
          formDataUpdater={formDataUpdater} />)
      } else {
        setListingSpecificInputPage(<MembershipInput
          formData={formData}
          listing={listing}
          formDataUpdater={formDataUpdater} />)
        }
    }
  }, [listing !== null]); // to restore previous state


  function choosingHandler(serviceType) {
    if (serviceType === 'timeBound') {
      setListingSpecificInputPage(<TimeBoundInput
        formData={formData}
        formDataUpdater={formDataUpdater} listing = {listing} />);
    } else if (serviceType === 'project') {
      setListingSpecificInputPage(<ProjectInput
        formData={formData}
        formDataUpdater={formDataUpdater} />);
    } else if (serviceType === 'membership') {
      setListingSpecificInputPage(<MembershipInput
        formData={formData}
        formDataUpdater={formDataUpdater} />);
    } else {
      setListingSpecificInputPage(<OneTimeInput
        formData={formData}
        formDataUpdater={formDataUpdater} />);
    }
  };
  return (
    <React.Fragment>
      <div style={{ overflow: 'auto', height: 'calc(100vh - 183px)' }}>
        <Paper style={{ borderRadius: '0px 0px 15px 15px' }}>
          <ChooseListingTypeSection
            formData={formData}
            callback={choosingHandler}
            formDataUpdater={formDataUpdater}
            listing = {listing} />
          <Divider />
          <BasicInputSection formData={formData}
            formDataUpdater={formDataUpdater} listing = {listing} />
        </Paper>
        {listing !== null && (listing.serviceType === 2 || listing.serviceType === 4) ? 
          <React.Fragment>
            {listingSpecificInputPage}
          </React.Fragment>
        : 
        <React.Fragment>
        {router.query.listingId === undefined  ?
          <React.Fragment>
            {listingSpecificInputPage}
          </React.Fragment>
          : <h2 style = {{color: '#fff', fontWeight: 'normal'}} >You can't change Timings for this Listing </h2>
        }
        </React.Fragment>
        }

        

      <ChooseDeliveryModeSection onClickNext={goToCheckout}
          formData={formData}
          formDataUpdater={formDataUpdater}
          listing = {listing}
          />
      </div>
       
        {/* <div style={{ overflow: 'auto', height: 'calc(100vh - 183px)' }}>
        <Paper style={{ borderRadius: '0px 0px 15px 15px' }}>
          <BasicInputSection formData={formData}
            formDataUpdater={formDataUpdater} />
          <Divider />
          <ChooseListingTypeSection
            formData={formData}
            callback={choosingHandler}
            formDataUpdater={formDataUpdater} />
        </Paper>
        {listingSpecificInputPage}
        <ChooseDeliveryModeSection onClickNext={goToCheckout}
          formData={formData}
          formDataUpdater={formDataUpdater} />
      </div> */}
    </React.Fragment>
  );
}

function CheckoutPage({ formData, formDataUpdater, onClickNext, listing }) {
  return (
    <div style={{ overflow: 'auto', height: 'calc(100vh - 183px)' }}>
      <CheckoutSection formData={formData} onClickNext={onClickNext}
        formDataUpdater={formDataUpdater} listing = {listing} />
    </div>
  );
}

function SharePage({ formData, formDataUpdater }) {
  return (
    <div style={{ overflow: 'auto', height: 'calc(100vh - 183px)' }}>
      <ShareSection formData={formData} formDataUpdater={formDataUpdater} />
    </div>
  );
}
