import React, { Component, useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import styles from './editProfile.module.sass'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useRouter } from 'next/router'
import api from './apiCore'
import axios from 'axios'
import Modal from '@material-ui/core/Modal'
import ListingGrid  from '../../listings/listingGrid'
import { id } from 'date-fns/locale';
import ShareIcon from '@material-ui/icons/Share';
import Divider from '@material-ui/core/Divider'
import Logo from '../../../public/images/seristo_icon.svg'
import Link from 'next/link'
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from 'react-share'
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
} from "react-share"

import Snackbar from '@material-ui/core/Snackbar'


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
      },
  }));

const customerView = (props) => {

    const [copied, setCopied] = useState(false)
    const [url, setUrl] = useState('')

    const [advisorName, setAdvisorName] = useState('')
    const [advisorAbout, setAdvisorAbout] = useState('')
    const [advisorImg, setAdvisorImg] = useState('')

    const [timeBoundListings, setTimeBoundListings] = useState([])
    const [MemberShipListings, setMemberShipListings] = useState([])
    const [oneTimeListings, setOneTimeListings] = useState([])
    const [projectListings, setProjectListings] = useState([])
    const [customerEmail, setCustomerEmail] = useState('')
    const [following, setFollowing] = useState(false)

    const [state, setState] = React.useState({
        toastOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const router = useRouter()
    useEffect(() => {
        
        // console.log(router.query)
        const userId = router.query.id
        if (userId !== undefined) {
        /* api.getListings(userId, 2)
            .then(
                (response) => {
                  let data = response.data.data
                  setTimeBoundListings(data)
                //   console.log(response.data.data)
                  return api.getListings(userId, 3)
                }
            )
            .then(
                  (response) => {
                    // console.log(response.data.data)
                      setOneTimeListings(response.data.data)
                      return api.getListings(userId, 4)
                  }
              ).then(
                  (response) => {
                    // console.log(response.data.data)
                      setProjectListings(response.data.data)
                      return api.getListings(userId, 5)
                  }
              ).then(
                  (response) => {
                    //   console.log(response.data.data)
                      setMemberShipListings(response.data.data)
                  }
              ).catch(
                  (err) => console.log(err)
              )
            */

            api.getProfileCustomerView(userId)
                .then((res) => {
                    console.log(res)
                    let user = res.data.data.user
                    let listings = res.data.data.listing
                    setAdvisorName(user.userName)
                    setAdvisorAbout(user.about)
                    if (user.photo === null){
                        setAdvisorImg(user.picture)
                    }else {
                        setAdvisorImg(user.photo)
                    }
                    setOneTimeListings(listings)
                })
                .catch(err => console.log(err))
        } 
    }, [router.query.id]);
    
    // console.log(router)

    // useEffect(() => {
    //     // if (following) {
    //     //     console.log(`You are following ${router.query.seristo_user}!`)
    //     //     setFollowing(!following)
    //     // }
    // }, [following])

    
    useEffect(() => {
       let path = window.location.href
        setUrl(path)
        
    }, [])


    
//   console.log(router)

    // console.log(props.name)

    const handleChange = (e) => {
        setCustomerEmail(e.target.value)
    }

    const followHandler = () => {
        const email = customerEmail
        if (email.includes('@')) {
        api.follow(router.query.id, email)
            .then(res => (
                setFollowing(true)
            ))
            .catch(err => console.log(err))
        } else {
            alert('Enter valid Email Address')
            console.log('not valid')
        }
        
    }
    
    

    const handleTooltipClose = () => {
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }


    const PriceTag = ({price, currency})  =>  {
        return (
          <div className={styles.priceTag}>
            <div className={styles.priceTagPrice}>
              {currency + ' ' + price}
            </div>
            <div className={styles.triangle}>
      
            </div>
          </div>
        );
    }

    const [modalBody, setModalBody] = useState(null);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [modalStyle] = React.useState({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '25vh',
        width: '40vh'
        // overflow: 'scroll',
    });

    const handleCopy = () => {
        setCopied(true)
        alert('Profile Link is Copied')
    }

    const { vertical, horizontal, toastOpen } = state

    const handleToastClick = (newState) => () => {
        console.log('toastClick')
        setState({ toastOpen: true, ...newState });
      };
    
    const handleToastClose = () => {
        setState({ ...state, toastOpen: false });
    };

    const shareHandler = () => {
        handleOpen()
        setModalBody(
            <div style={modalStyle} className={classes.paper}>

            <div>
                    <h4 style = {{marginLeft: '5%', fontSize: '18px'}}>Share your profile</h4>
                    <Divider />
                    {/* <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={toastOpen}
                        onClose={handleToastClose}
                        message="I love snacks"
                        key={vertical + horizontal}
                    /> */}
                    <TwitterShareButton
                    url={url}
                    title={"lskdnflkdsf"}
                    style = {{margin: "10%"}}
                    className="Demo__some-network__share-button">
                        <TwitterIcon
                        size={40}
                        round />
                    </TwitterShareButton>
                    <FacebookShareButton
                    url={url}
                    title={"lskdnflkdsf"}
                    style = {{margin: "10%"}}
                    className="Demo__some-network__share-button">
                        <FacebookIcon
                        size={40}
                        round />
                    </FacebookShareButton>
                    <CopyToClipboard text={url} onCopy={handleCopy}>
                        <FileCopyIcon 
                            className = {styles} 
                            style = {{width: '35px', height: '35px', marginLeft: '10%', cursor: 'pointer' }}  />
                    </CopyToClipboard>
                    
            </div>
            </div>
        )
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    
        return (
            <Paper variant='outlined'>
            <Modal
                open={open}
                onClose={handleClose}
              >
                {modalBody}
            </Modal>
            <div className = {styles.BackDrop} style = {{display: 'flex', flexDirection: 'column', height: '720px', overflow: 'auto'}}>
                <Paper className = {styles.advisoryPaper} style = {{padding: '10px'}}>
                    <div>
                        <div>
                            <img src = {advisorImg} alt = "" className = {styles.img} />
                            <div className = {styles.advName}>
                            {advisorName}
                                {/* <Tooltip
                                    PopperProps={{
                                    disablePortal: true,
                                    }}
                                    onClose={handleTooltipClose}
                                    open={copied}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title="Copied"
                                >
                                    <CopyToClipboard text={url} onCopy = {handleTooltipClose} >
                                        <FileCopyIcon className = {styles} style = {{width: '15px', marginTop: '15px', marginLeft: '5px'}} />
                                    </CopyToClipboard>
                                </Tooltip> */}
                                <ShareIcon className = {styles} style = {{width: '15px', marginTop: '15px', marginLeft: '5px'}} onClick = {shareHandler} />
                            </div>
                            <div className = {styles.advDesc} dangerouslySetInnerHTML={{__html: advisorAbout}}></div>
                            {!following ? 
                            <div className = {styles.followDiv} >
                                <input 
                                    className = {styles.custEmail} 
                                    type = "text"
                                    name = "customerEmail"
                                    placeholder = "Your Email address"
                                    value = {customerEmail}
                                    onChange =  {(e) => handleChange(e)} 
                                    /> 
                                <Button variant = "contained" className = {styles.followbtn} onClick = {followHandler} >Follow</Button>
                            </div>
                            : 
                            <React.Fragment>
                                <div align = "center" style = {{fontSize: '25px'}} > You are now following <strong>{advisorName}</strong> </div> 
                            </React.Fragment>
                        }
                        </div>
                    </div>
                </Paper>
                    
                {/* <h3 style = {{marginLeft: '5%', fontSize: '20px'}}>Time Bound Event</h3> */}
                    <div style = {{marginLeft: '5%'}}>
                        {/*<Grid container spacing={5} style = {{marginLeft: '5%'}}>
                        {timeBoundListings.map((list) => (
                        <div key = {list.id}>
                                <Grid item xs={12}>
                                        <Card className={classes.root} style = {{marginLeft: '3%', marginTop: '5%',}} onClick = {() => (router.push(`/listings/${list.id}`))}>
                                                <CardMedia
                                                component="img"
                                                height="150"
                                                src={list.coverImage}
                                            />
                                            <CardContent>
                                                <Typography variant="h4" component="h2">
                                                    {list.name}
                                                </Typography>

                                                <Typography gutterBottom variant="h6" component="h2">
                                                    <p>Helo</p>
                                                </Typography>

                                                <div className={styles.detailsRow}>
                                                        <div>                                      
                                                            <div className={styles.starsRow}>
                                                            <div className={styles.starsAndRating}>
                                                            <span>{list.totalReviews} reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style = {{display: 'flex', flexDirection: 'row' }}>
                                                        <CalenderIcon />
                                                        <Typography variant="h6"  style = {{marginLeft: '5px', marginTop: '-3px'}}>19/12/2020</Typography>
                                                    </div>
                                                    <div style = {{display: 'flex', flexDirection: 'row' }}>
                                                        <ClockIcon />
                                                        <Typography variant="h6" style = {{marginLeft: '5px', marginTop: '-3px'}}>1 hours </Typography>
                                                    </div>
                                                </div>

                                                <div className={styles.starsRow}>
                                                    <div className={styles.starsAndRating}>
                                                        <Stars rating={list.avgRating}/>
                                                        <span>{`${list.totalReviews} reviews`}</span>
                                                    </div>
                                                    <div>
                                                        <PriceTag price={list.price} currency={currencySymbol}/>
                                                    </div>
                                                </div>

                                                <Typography variant="subtitle1" component="p">
                                                    {list.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                </Grid> 
                            </div>
                            ))}
                        </Grid>*/}
                        {/* <ListingGrid listings = {timeBoundListings} seristoUserId = {router.query.id} name = {router.query.seristo_user} /> */}
                    </div> 

                <br />
                
                {/* <div>
                    <h3 style = {{marginLeft: '5%', fontSize: '20px'}}> Membership </h3>
                    <div style = {{marginLeft: '5%'}}>
                        <ListingGrid listings = {MemberShipListings} seristoUserId = {router.query.id} name = {router.query.seristo_user} />
                    </div>
                </div> */}
                <br />

                {oneTimeListings && oneTimeListings.length > 0 ? 
                <div>
                    <h3 style = {{marginLeft: '5%', fontSize: '20px'}}> One Time Event </h3>
                    <div style = {{marginLeft: '2%'}}>
                        <ListingGrid listings = {oneTimeListings}  seristoUserId = {router.query.id} name = {router.query.seristo_user} />
                    </div>  
                </div>
                : <h2 align = "center">{advisorName} don't have any listings Currently</h2> }
                <br />

            
                {/* <div>
                <h3 style = {{marginLeft: '5%', fontSize: '20px'}}> Project Based  Service </h3>
                    <div style = {{marginLeft: '5%'}}>
                        <ListingGrid listings = {projectListings} seristoUserId = {router.query.id} name = {router.query.seristo_user} />
                    </div>
                </div> */}
                <Link href="https://seristo.com">
                    <div style = {{cursor: 'pointer'}}>
                        <Button 
                            startIcon={<Logo className={styles.logo}/>}
                            className={styles.poweredBy}>
                                Powered By Seristo
                        </Button>
                    </div>
                </Link>
            </div>

            </Paper>
        )
}

export default customerView


