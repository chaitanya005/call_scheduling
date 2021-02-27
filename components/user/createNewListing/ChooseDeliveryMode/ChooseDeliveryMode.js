import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SideInfoArea from '../InfoArea';
import Typography from '@material-ui/core/Typography';
import {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import styles from './styles.module.sass';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    'borderRadius': '50%',
    'width': 16,
    'height': 16,
    'boxShadow':
    'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    'backgroundColor': '#f5f8fa',
    'backgroundImage':
    'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input className={styles.textField}:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input className={styles.textField}:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    'backgroundColor': '#137cbd',
    'backgroundImage':
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',

    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input className={styles.textField}:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function ChooseDeliveryModeSection({onClickNext, formData,
  formDataUpdater}) {
  // set initial deliveryMode to online
  let defaultDeliveryMode = 'online';
  let defaultCorrespondingInput = <OnlineOptions formData={formData}
    formDataUpdater={formDataUpdater}/>;

  if (formData.deliveryMode!==undefined) {
    defaultDeliveryMode = formData.deliveryMode;
    if (defaultDeliveryMode==='offline') {
      defaultCorrespondingInput = <OfflineOptions formData={formData}
        formDataUpdater={formDataUpdater} />;
    }
  }

  const [correspondingInput, setCorrespondingInput] =
    useState(defaultCorrespondingInput);
  const [deliveryMode, setDeliveryMode] = useState(defaultDeliveryMode);

  useEffect(() => {
    formDataUpdater({'deliveryMode': deliveryMode});
  }, []);

  function changeDeliveryMode(e) {
    setDeliveryMode(e.target.value);
    if (e.target.value==='offline') {
      setCorrespondingInput(
          <OfflineOptions formData={formData}
            formDataUpdater={formDataUpdater} />);
      formDataUpdater({'deliveryMode': 'offline'});
    } else if (e.target.value==='online') {
      setCorrespondingInput(
          <OnlineOptions formData={formData}
            formDataUpdater={formDataUpdater} />);
      formDataUpdater({'deliveryMode': 'online'});
    }
  }

// minHeight: '400px',
  return (
    <Paper style={{padding: '30px 15px', display: 'flex',
      flexDirection: 'row', justifyContent: 'space-between',
      marginBottom: '30px',
      borderRadius: '0px 0px 15px 15px'}}>
      <SideInfoArea heading={'Choose Delivery Mode'}
        content={'Select how the sessions will be conducted. If you are selecting “Google Meet” we will automatically create the event and sync it with your Google calendar. Once a participant books this session, he/she can also see the event in their respective calendar.'}/>
      <div className={styles.rightSide}>
        <div style={{display: 'flex', marginBottom: '10px'}}>
          <div className={styles.rightHeading}>Service Delivery
            <span className={styles.star}>*</span>
          </div>

        </div>
        <FormControl component="fieldset">
          <RadioGroup value={deliveryMode}
            aria-label="deliveryMode"
            name="customized-radios" onChange={changeDeliveryMode}
            style={{display: 'flex', flexDirection: 'row',
              justifyContent: 'space-between'}}>
            <FormControlLabel value="online" control={<StyledRadio />}
              label="Online" />
            <FormControlLabel value="offline" control={<StyledRadio />}
              label="Offline" />
          </RadioGroup>
        </FormControl>
        {correspondingInput}
        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton}
            onClick={() => {
              console.log(onClickNext);
              onClickNext();
            }}>
            Next
          </button>
        </div>
      </div>
    </Paper>
  );
}

function OnlineOptions({formData, formDataUpdater}) {
  let defaultOnlineMethod = 'meet';
  if (formData.type!==undefined) {
    defaultOnlineMethod = formData.type;
  }
  let defaultPhone = '';
  if (formData.phone!==undefined) {
    defaultPhone = formData.phone;
  }
  let defaultWebinarLink = '';
  if (formData.personalWebinarLink!==undefined) {
    defaultWebinarLink = formData.personalWebinarLink;
  }
  let defaultAdminPhone = '';
  if (formData.adminPhone!==undefined) {
    defaultAdminPhone = formData.adminPhone;
  }

  const [onlineMethod, setOnlineMethod] = useState(defaultOnlineMethod);
  const [phone, setPhone] = useState(defaultPhone);
  const [adminPhone, setAdminPhone] = useState(defaultAdminPhone);
  const [personalWebinarLink, setPersonalWebinarLink] =
  useState(defaultWebinarLink);

  useEffect(() => {
    formDataUpdater({type: onlineMethod});
  }, []);

  function handleAdminPhoneChange(e) {
    setAdminPhone(e.target.value);
    formDataUpdater({'adminPhone': e.target.value});
  }

  function handlePersonalLinkChange(e) {
    setPersonalWebinarLink(e.target.value);
    formDataUpdater({'customLink': e.target.value});
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value);
    formDataUpdater({'phone': e.target.value});
  }

  function handleMethodChange(e) {
    setOnlineMethod(e.target.value);
    formDataUpdater({'type': e.target.value});
  }

  return (
    <FormControl component="fieldset" style={{display: 'block'}}>
      <RadioGroup aria-label="onlineOptions"
        value={onlineMethod}
        onChange={handleMethodChange}
        name="customized-radios">
        <FormControlLabel value="meet" control={<StyledRadio />}
          label="Google Meet" />
        <FormControlLabel value="customLink" control={<StyledRadio />}
          label="Personal Webinar Link" />
        {defaultOnlineMethod !== 'meet' ? 
        <input className={styles.textField} id="customLink"
          value={personalWebinarLink}
          onChange={handlePersonalLinkChange} />
        : null}
        {/*<FormControlLabel value="phone" control={<StyledRadio />}
          label="Your Phone" />
        <input className={styles.textField} id="phone"
          value={phone}
          onChange={handlePhoneChange}/>
        <FormControlLabel value="adminPhone" control={<StyledRadio />}
          label="Administrator's Phone" />
        <input className={styles.textField} id="adminPhone"
          value={adminPhone}
          onChange={handleAdminPhoneChange}/> */}
      </RadioGroup>
    </FormControl>
  );
}

function OfflineOptions({formData, formDataUpdater}) {
  let defaultAddress = '';
  if (formData.address!==undefined) {
    defaultAddress = formData.address;
  }
  const [address, setAddress] = useState(defaultAddress);
  function addressChangeHandler(e) {
    setAddress(e.target.value);
    formDataUpdater({'address': e.target.value});
  }
  return (
    <div className={styles.offlineBox}>
      <Typography gutterBottom style={{margin: '10px 0px'}}>
        Address
      </Typography>
      <textarea className={styles.textArea}
        value={address}
        onChange={addressChangeHandler}/>
    </div>
  );
}
