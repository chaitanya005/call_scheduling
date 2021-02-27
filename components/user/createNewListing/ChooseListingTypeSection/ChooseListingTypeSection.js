import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SideInfoArea from '../InfoArea';
import {useState, useEffect} from 'react';
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
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
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
    'input:hover ~ &': {
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

export default function ChooseListingSection({formData,
  callback, formDataUpdater, listing}) {
  let defaultListing = 'oneTime';
  if (formData.serviceType!==undefined) {
    defaultListing = formData.serviceType;
  }
  const [listingType, setListingType] = useState(defaultListing)

  const [updateListingType, setUpdateListingType] = useState('')

  useEffect(() => {
    if (listing === null) {
      setListingType(defaultListing)
    }

    if (listing !== null)  {
      console.log('sssss')
      const serviceType = listing.serviceType
      if (serviceType == 2){
        setUpdateListingType("timeBound")
        formDataUpdater({serviceType: "timeBound"})
      } else if (serviceType == 3) {
        setUpdateListingType("oneTime")
        formDataUpdater({serviceType: "oneTime"})
      } else if (serviceType == 4) {
        setUpdateListingType("project")
        formDataUpdater({serviceType: "project"})
      } else {
        setUpdateListingType("membership")
        formDataUpdater({serviceType: "membership"})
      }
    }
  }, [listing && listing.serviceType !== defaultListing])

  
  useEffect( () => {
    formDataUpdater({serviceType: defaultListing});
  }
  , []);

  return (
    <React.Fragment>
      {listing ? 
      <div className={styles.outermostBox}>
        <SideInfoArea heading={'Select Service Type '}
          content={'Please select one of the service that you are offering to your clients'} />
        <div className={styles.radioGroup}>
          <RadioGroup
            value={updateListingType}
            name="customized-radios"
            onChange={(e) => {
              setUpdateListingType(e.target.value);
              formDataUpdater({serviceType: e.target.value});
              callback(e.target.value);
            }}>
            <div className={styles.row}>
              {/* <div className={styles.boxLeft}>
                <FormControlLabel value='timeBound'
                  control={<StyledRadio />} />
                <div>
                  <Typography style={{fontWeight: 'bold'}}
                    variant='subtitle1'>Time Bound Service</Typography>
                  <Typography variant='h2'>For 1x1</Typography>
                  <Typography variant='h2'>Consultation</Typography>

                </div>
              </div> */}
              <div className={styles.boxRight}>
                <FormControlLabel value="oneTime" control={<StyledRadio />}/>
                <div>
                  <Typography style={{fontWeight: 'bold'}}
                    variant='subtitle1'>One Time Workshop</Typography>
                  <Typography variant='h2'>Host exclusive webinars, Live workshops and special learning sessions.</Typography>
                </div>
              </div>
            </div>
            {/* <div className={styles.row}>
              <div className={styles.boxLeft}>
                <FormControlLabel value="project" control={<StyledRadio />} />
                <div>
                  <Typography style={{fontWeight: 'bold'}}
                    variant='subtitle1'>Project Based Service</Typography>
                  <Typography variant='h2'>For outcome driven
                service</Typography>
                  <Typography variant='h2'>Ex. Website Redesign
                  </Typography>
                </div>
              </div>
              <div className={styles.boxRight}>
                <FormControlLabel value="membership" control={<StyledRadio />}/>
                <div>
                  <Typography style={{fontWeight: 'bold'}}
                    variant='subtitle1'>Membership</Typography>
                  <Typography variant='h2'>
                  For monthly teaching classes (1x1/many)
                  , once a week, twice a week etc
                  </Typography>
                </div>
              </div>
            </div> */}
          </RadioGroup>
        </div>
      </div>
      : 
      <div className={styles.outermostBox}>
        <SideInfoArea heading={'Select Service Type'}
          content={'Please select one of the service that you are offering to your clients'} />
        <div className={styles.radioGroup}>
          <RadioGroup
            value={listingType}
            name="customized-radios"
            onChange={(e) => {
              setListingType(e.target.value);
              formDataUpdater({serviceType: e.target.value});
              callback(e.target.value);
            }}>
            <div className={styles.row}>
              <div className={styles.boxLeft}>
                <FormControlLabel value='oneTime'
                  control={<StyledRadio />} />
                <div>
                  <Typography style={{fontWeight: 'bold'}}
                    variant='subtitle1'>One Time Workshop</Typography>
                  <Typography variant='h2'>Host exclusive webinars, Live workshops and special learning sessions.</Typography>
                </div>
              </div>
              <div className={styles.boxRight}>
                {/* <FormControlLabel value="timeBound" control={<StyledRadio />}/> */}
                <div>
                  <Typography style={{fontWeight: 'bold'}}
                    variant='subtitle1'>1 on 1 Consultation(s)</Typography>
                  <Typography variant='h2'>One-time appointment that can be booked for consultation/ trial classes/personal trainings</Typography>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.boxLeft}>
                {/* <FormControlLabel value="project" control={<StyledRadio />} /> */}
                <div>
                  <Typography style={{fontWeight: 'bold'}}
                    variant='subtitle1'>Short Term Project </Typography>
                  <Typography variant='h2'>Take a booking for small projects with fixed price. I.e. Website Redesign, Create FB Ad</Typography>
                </div>
              </div>
              <div className={styles.boxRight}>
                {/* <FormControlLabel value="membership" control={<StyledRadio />}/> */}
                <div>
                  <Typography style={{fontWeight: 'bold'}}
                    variant='subtitle1'>1-1 or Group Class</Typography>
                  <Typography variant='h2'>
                    Long term classes with a fixed weekly schedule [once a week, twice a week etc.]- Students pay fee monthly.
                  </Typography>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      }
    </React.Fragment>
  );
}
