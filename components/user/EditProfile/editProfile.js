import React, { Component, useState, useEffect } from 'react'
import AppBar from '../AppBar/AppBar'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import styles from './editProfile.module.sass'
import Button from '@material-ui/core/Button';
import ListingGrid from '../../listings/listingGrid'
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Modal from '@material-ui/core/Modal'
import EditIcon from '@material-ui/icons/Edit';
import Link  from 'next/link'
import 'react-quill/dist/quill.snow.css';
import {updateProfile} from './apiCore'
import api from './apiCore'
import axios from 'axios'
// import {useSession} from 'next-auth/client'
import { useRouter } from 'next/router'
import ShareIcon from '@material-ui/icons/Share';
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


const ReactQuill = typeof window === 'object' ? require('react-quill') :
 () => false;


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



const editProfile = () => {
    const classes = useStyles();
    const [showEdit, setShowEdit] = useState(true)


    const [userId, setUserId] = useState(null)
    // const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    // const [desc, setDesc] = useState('Hi! I’m Alec. I’m a professor based in London with a keen interest in teaching Quantum Physics')
    // const [userDesc, setUserDesc] = useState(desc)
    // let descContent = 'Hi! I’m Alec. I’m a professor based in London with a keen interest in teaching Quantum Physics'
    const [userEmail, setUserEmail] = useState('')
    const [content, setContent] = useState('')
    const [profileImage, setProfileImg] = useState('')
    
    const [copied, setCopied] = useState(false)
    const [url, setUrl] = useState('')

    // const [session, loading] = useSession();
    const [title, setTitle] = useState({
        timeBound: "Time Bound Event",
        memberShip: "Membership",
        oneTime: 'One Time Event',
        project: 'Project Based Service'
    })

    const [timeBoundClicked, setTimeBoundClicked] = useState(false)
    const [membershipClicked, setMembershipClicked] = useState(false)
    const [oneTimeClicked, setOneTimeClicked] = useState(false)
    const [projectClicked, setProjectClicked] = useState(false)

    const [preview, setPreview] = useState(false)
    const [timeBoundListings, setTimeBoundListings] = useState([])
    const [MemberShipListings, setMemberShipListings] = useState([])
    const [oneTimeListings, setOneTimeListings] = useState([])
    const [projectListings, setProjectListings] = useState([])
    
    const router = useRouter()
    // const [open, setOpen] = useState(false)
    // const [showViewMore, setShowViewMore] = useState(true)
    // const [bio, setBio] = useState('')
    // const [clickedId, setClickedId] = useState(null)


    

    // console.log(name)

    
    const [loggedInUser, setLoggedInUser] = useState('')
    const [user, setUser] = useState('')
 

    // let email, loggedInUser, img

 /*    const email = session.user.email
    const loggedInUser = session.user.name
    const img = session.user.image */
    

    useEffect(() => {
       
       /*  const socialLogin = {
            method: 'post',
            url: 'http://localhost:3000/users/socialLogin',
        }

       
  
        axios(Object.assign({}, socialLogin, { data: { email: email, userName: loggedInUser, image: img } }))
        .then(res => getUserId(res))
        .catch((err) => console.log(err))
        

            function getUserId (response) {
                if (response.data.data.user) {
                    console.log('user')
                    setUserId(response.data.data.user.id)
                    api.getListingForAdvisor(response.data.data.user.id)
                    .then(
                      (response) => (
                        updateListings(response.data.data)
                      )
                    ).catch(err => console.log(err))
                  
                  return true
                }
                else if (response.data.data.userResult) {
                    console.log('userResult')
                    setUserId(response.data.data.userResult.id)
                    
                    setUserName(response.data.data.userResult.userName)
                    api.getListings(response.data.data.userResult.id, 2)
                    .then(
                      (response) => {
                        let data = response.data.data
                        setTimeBoundListings(data)
                        return api.getListings(userId, 3)
                      }
                    ).then(
                        (response) => {
                            setOneTimeListings(response.data.data)
                            return api.getListings(userId, 4)
                        }
                    ).then(
                        (response) => {
                            setProjectListings(response.data.data)
                            return api.getListings(userId, 5)
                        }
                    ).then(
                        (response) => {
                            setMemberShipListings(response.data.data)
                        }
                    )
                    .catch(err => console.log(err))
                    // api.getProfileCustomerView(userId)
                    //     .then(
                    //         (response) => {
                    //             // console.log(response.data.data.user.userName)
                    //             setName(response.data.data.user.userName)
                    //             setUserName(response.data.data.user.userName)
                    //         }
                    //     )
                    //     .catch(err => console.log(err))
                    
                }
                return false
            } */

            if (localStorage.getItem('userInfo')) {
                var data = JSON.parse(localStorage.getItem('userInfo'))
                setUserId(data.userId)
                var userName = data.firstName + ' ' + data.lastName
                setLoggedInUser(userName)
                setUserName(userName)
                // api.getListings(data.userId, 2)
                //     .then(
                //       (response) => {
                //         let data = response.data.data
                //         setTimeBoundListings(data)
                //         return api.getListings(userId, 3)
                //       }
                //     ).then(
                //         (response) => {
                //             setOneTimeListings(response.data.data)
                //             return api.getListings(userId, 4)
                //         }
                //     ).then(
                //         (response) => {
                //             setProjectListings(response.data.data)
                //             return api.getListings(userId, 5)
                //         }
                //     ).then(
                //         (response) => {
                //             setMemberShipListings(response.data.data)
                //         }
                //     )
                //     .catch(err => console.log(err))

                api.getProfileCustomerView(data.userId)
                    .then(res => {
                        // console.log(res)
                        let user = res.data.data.user
                        let userListings = res.data.data.listing
                        setContent(user.about)
                        setUserName(user.userName)
                        setUserEmail(user.email)
                        setOneTimeListings(userListings)
                        if (user.photo === null){
                            setProfileImg(user.picture)
                        }else {
                            setProfileImg(user.photo)
                        }
                    })
                    .catch(err => console.log(err))
            } else {
                router.push('/')
            }

        let path = `http://localhost:3001/user/profile?id=${userId}&seristo_user=${userName}`
        setUrl(path)

    }, [userId !== null]);

    

    const editHandler = () => {
        setShowEdit(false)
    }

    const nameHandler = (e) => {
        setUserName(e.target.value)
    }

    const descHandler = (e) => {
        setDesc(e.target.value)
    }

    const submitHandler = () => {
        setShowEdit(true)
        // setUserName(name)
        
        // axios(updateProfile)
        //     .then((response) => {
        //     // console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // api.updateProfile(userId, email, name)
        //     .then(res => {
        //         setUserName(name)
        //     api.getProfileCustomerView(userId)
        //         .then(res => setUserName(res.data.data.user.userName))
        //     })
        //     .catch(err => console.log(err))
        api.updateProfile(userId, userEmail, userName, content, profileImage)
            .then (res => console.log(res))
            .catch(err => console.log(err))
    }

    const timeBoundClickedHandler = () => {
        setTimeBoundClicked(true)
    }

    const  titleHandler = (e) => {
        const value = e.target.value
        setTitle({
            ...title,
            [e.target.name]: value
        })
    }
    const saveHandler = () =>  {
        setTimeBoundClicked(false)
    }

    const membershipClickHandler = () => {
        setMembershipClicked(true)
    }

    const memberShipSave = () => {
        setMembershipClicked(false)
    }

    const oneTimeClickHandler = () => {
        setOneTimeClicked(true)
    }


    const oneTimeSave = () => {
        setOneTimeClicked(false)
    }

    const projectClickHandler = () => {
        setProjectClicked(true)
    }

    const projectSave = () => {
        setProjectClicked(false)
    }


    const handleChange = (value) => {
        setContent(value)
    }

    const previewHandler = () => {
        setPreview(!preview)
    }

    const [modalBody, setModalBody] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [modalStyle] = React.useState({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '25vh',
        width: '40vh'
        // overflow: 'scroll',
    });

    const handleTooltipClose = () => {
        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }

    const handleTooltipOpen = () => {
        setCopied(true)
    }

    const copyHandler = () => {
        handleOpen()
        setModalBody(
            <div style={modalStyle} className={classes.paper}>

            <div>
                    <h4 style = {{marginLeft: '5%', fontSize: '18px'}}>Share your profile</h4>
                    <Divider />
                    <TwitterShareButton
                    url={url}
                    title={"Hello"}
                    style = {{margin: "10%"}}
                    className="Demo__some-network__share-button">
                        <TwitterIcon
                        size={40}
                        round />
                    </TwitterShareButton>
                    <FacebookShareButton
                    url={url}
                    title={"Hello"}
                    style = {{margin: "10%"}}
                    className="Demo__some-network__share-button">
                        <FacebookIcon
                        size={40}
                        round />
                    </FacebookShareButton>
                    {/* <FileCopyIcon style = {{width: '35px', height: '35px', marginLeft: '10%'}}/> */}
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
                        <CopyToClipboard text={url} >
                            <FileCopyIcon className = {styles} style = {{width: '35px', height: '35px', marginLeft: '10%', cursor: 'pointer' }} />
                        </CopyToClipboard>
                    </Tooltip>  */}
                    <CopyToClipboard text={url} onCopy={() => {alert('Profile Link is Copied')}}>
                        <FileCopyIcon className = {styles} style = {{width: '35px', height: '35px', marginLeft: '10%', cursor: 'pointer' }} />
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

    const imageUpload = async (image) => {
        const data = new FormData();
      // If file selected
        
        data.append( 'profileImage', image, image.name );
        await axios.post(process.env.BACKEND_URL + '/users/uploadImage' , data, {
            headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
          })
        .then(res => {
          console.log(res.data)
          setProfileImg(res.data.location)
        })
        .catch(err => console.log(err))
        
        
      }

    const profileHandler = (e) => {
        imageUpload(e.target.files[0])
    }


    
    
    /* useEffect(() => {
        
         
     }, []) */


    //viewmore function todo

    // const handleViewMore = (id) => {
    //     for (let list of listings) {
    //         if (id == list.id) {
    //             setBio(list.desc.slice(85, list.desc.length))
    //             setClickedId(id)
    //             setShowViewMore(false)
    //         }
    //     }
    //     console.log(id)
    // }

    // console.log(content.length)
    // console.log(content)
        return (
            <Paper style={{flex: 5.5, margin: '20px', borderRadius: '15px',}}
            variant='outlined'>
            <Modal
                open={open}
                onClose={handleClose}
              >
                {modalBody}
            </Modal>

            <AppBar  />

            <Divider />

            <div>
                <div className = {styles.title}>
                    <h3 style = {{fontSize: '20px',  flexDirection: 'row', display: 'flex'}}>{userName}'s  Page</h3>
                    <Link href = {{
                        pathname : "/user/profile",
                        query: { id: userId, seristo_user: loggedInUser, },
                    }}>
                        <a target = "_blank" style = {{textDecoration: 'none'}}> <Button startIcon = {<VisibilityIcon />} style = {{border: '1px solid #CDD3D9'}} onClick = {previewHandler}>Go To Your Website</Button> </a>
                    </Link>
                </div>
            
            </div>



             
            <div className = {styles.BackDrop} style = {{display: 'flex', flexDirection: 'column', height: '550px', overflow: 'auto'}}>
                <Paper className = {styles.advisoryPaper} style = {{padding: '10px'}}>
                    {showEdit ?
                    <div>
                        <button onClick = {editHandler} className = {styles.editBtn}>Edit</button>
                        <div>
                            <img src = {profileImage} alt = "" className = {styles.img} />
                            <div className = {styles.advName}>
                                {userName}
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
                                </Tooltip>     */}
                                <ShareIcon className = {styles} style = {{width: '15px', marginTop: '15px', marginLeft: '5px'}} onClick = {copyHandler} />
                            </div>
                            {content !== null && content.length > 11 ?
                            <div className = {styles.advDesc} dangerouslySetInnerHTML={{__html: content}}></div>
                            : <p align = 'center'><button onClick = {editHandler} className = {styles.editBtn} style = {{margin: "0%"}}>Add Description</button></p>}
                            <div className = {styles.followDiv}>
                            <input className = {styles.custEmail} type = "text" placeholder = "Your Email address" /> 
                            <Button variant = "contained" className = {styles.followbtn}>Follow</Button>
                            </div>
                        </div>
                    </div>
                    :   
                    <div>
                        <label>
                            <div className = {styles.updateProfile}>
                                <img src = {profileImage} alt = "" className = {styles.updateImg} />
                                <br />
                                <div className={styles.middle} style = {{display:'flex', flexDirection: 'column'}}>
                                        <b>UpdatePhoto</b>
                                        <input type="file" accept="image/*" className={styles.input} onChange={profileHandler} />
                                </div>
                            </div>
                        </label>
                        <br />
                        <div>
                            <input 
                            onChange =  {(e) => nameHandler(e)} 
                            type = "text" 
                            name = "userName"
                            className = {styles.editName} 
                            value = {userName}
                            />
                        </div>
                        <br />
                        <div>
                            <ReactQuill 
                            value = {content}
                            onChange = {handleChange}
                            />
                        </div> 

                        <br />

                        <Button onClick = {submitHandler} style = {{marginLeft: '45%'}} variant = "contained" color = "primary">Submit</Button>
                    </div>
                    }
                </Paper>
                    
                {/* !(timeBoundClicked) ?
                    <h3 style = {{marginLeft: '5%', fontSize: '20px'}}>{title.timeBound} <EditIcon onClick = {timeBoundClickedHandler} style = {{width: '15px', height: '15px'}}/></h3>
                :
                    <div style = {{margin: '5%' }}>
                        <input
                        onChange = {(e) => {titleHandler(e)}}
                        value = {title.timeBound}
                        type = "text" 
                        style = {{height: '30px'}} 
                        name = "timeBound"
                        />
                        <Button variant =  "contained" color = "primary" style = {{height: '30px',  marginLeft: '5px'}} onClick = {saveHandler}>Save</Button>
                    </div>
                 */}

                   {/*  <div style = {{marginLeft: '5%'}}>
                        <ListingGrid listings = {timeBoundListings} />
                    </div>  */}

                <br />
                <div>

                {/* !(membershipClicked) ?
                <h3 style = {{marginLeft: '5%', fontSize: '20px'}}>{title.memberShip} <EditIcon onClick = {membershipClickHandler} style = {{width: '15px', height: '15px'}}/></h3>
                : 
                <div style = {{margin: '5%' }}>
                        <input
                        onChange = {(e) => {titleHandler(e)}}
                        value = {title.memberShip}
                        type = "text" 
                        name = "memberShip"
                        style = {{height: '30px'}} 
                        />
                        <Button variant =  "contained" color = "primary" style = {{height: '30px',  marginLeft: '5px'}} onClick = {memberShipSave}>Save</Button>
                </div>
                 */}
                    <div style = {{marginLeft: '5%'}}>
                        {/*<Grid container spacing={5} style = {{marginLeft: '5%'}}>
                        {MemberShipListings.map((list) => (
                            <div key = {list.id}>
                                <Grid item xs={12}>
                                    <Card className={classes.root} style = {{marginLeft: '3%', marginTop: '5%',}}>
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

                        {/* <ListingGrid listings = {MemberShipListings} /> */}
                    </div> 

                    <br />

                   
                    <div>
                        {oneTimeListings && oneTimeListings.length > 0 ?
                            <div>
                                {!(oneTimeClicked) ?
                                    <h3 style = {{marginLeft: '5%', fontSize: '20px'}}>{title.oneTime} {/* <EditIcon onClick = {oneTimeClickHandler} style = {{width: '15px', height: '15px'}}/> */}</h3>
                                    : 
                                    <div style = {{margin: '5%' }}>
                                            <input
                                            onChange = {(e) => {titleHandler(e)}}
                                            value = {title.oneTime}
                                            type = "text" 
                                            style = {{height: '30px'}} 
                                            name = "oneTime"
                                            />
                                            <Button variant =  "contained" color = "primary" style = {{height: '30px',  marginLeft: '5px'}} onClick = {oneTimeSave}>Save</Button>
                                    </div>
                                }
                            </div>
                        : <h2 align = "center">You Don't have any listings Currently</h2> 
                        }
                        <div style = {{marginLeft: '5%'}}>
                            <ListingGrid listings = {oneTimeListings} />
                        </div>
                    </div>
                    

                    <br />


                    <div>
                    {/* !(projectClicked) ?
                        <h3 style = {{marginLeft: '5%', fontSize: '20px'}}>{title.project} <EditIcon onClick = {projectClickHandler} style = {{width: '15px', height: '15px'}}/></h3>
                        : 
                        <div style = {{margin: '5%' }}>
                                <input
                                onChange = {(e) => {titleHandler(e)}}
                                value = {title.project}
                                type = "text" 
                                style = {{height: '30px'}}
                                name = "project" 
                                />
                                <Button variant =  "contained" color = "primary" style = {{height: '30px',  marginLeft: '5px'}} onClick = {projectSave}>Save</Button>
                        </div> */
                    }
                    {/* <div style = {{marginLeft: '5%'}}>
                        <ListingGrid listings = {projectListings} />
                    </div> */}
                    </div>
                </div>
            </div>

            </Paper>
        )
}

export default editProfile



// {listing.desc.length > 95 ? 
//                                                     <React.Fragment>
//                                                         {showViewMore ? 
//                                                             <React.Fragment>
//                                                                 {listing.desc.slice(0, 85) + '...'}
//                                                                 <button 
//                                                                 href = "" style = {{all: 'unset', textDecoration: 'underline', cursor: 'pointer'}}
//                                                                 onClick = {() => handleViewMore(listing.id)}
//                                                                 >view more</button>
//                                                             </React.Fragment>
//                                                             : 
//                                                             <React.Fragment>
//                                                                 {
//                                                                     clickedId ===  listing.id ? 
//                                                                     <React.Fragment>
//                                                                     {listing.desc.slice(0, 85)}{bio}
//                                                                     </React.Fragment> : 
//                                                                     <React.Fragment>
//                                                                         {listing.desc.slice(0,85)}
//                                                                     </React.Fragment>
//                                                                 }
                                                                
//                                                             </React.Fragment> 
//                                                         }
//                                                     </React.Fragment>
//                                                     :
//                                                     <React.Fragment>
//                                                         {listing.desc}
//                                                     </React.Fragment> 
//                                                 }





// <div className = {styles.BackDrop} style = {{display: 'flex', flexDirection: 'column', height: '550px', overflow: 'auto'}}>
// <Paper className = {styles.advisoryPaper} style = {{padding: '10px'}}>
//     <div>
//         <div>
//             <img src = "/images/face10.jpg" alt = "" className = {styles.img} />
//             <div className = {styles.advName}>{userName}</div>
//             <div className = {styles.advDesc} dangerouslySetInnerHTML={{__html: content}}></div>
//             <div className = {styles.followDiv}>
//             <input className = {styles.custEmail} type = "text" placeholder = "Your Email address" /> 
//             <Button variant = "contained" className = {styles.followbtn}>Follow</Button>
//             </div>
//         </div>
//     </div>
//  </Paper>
