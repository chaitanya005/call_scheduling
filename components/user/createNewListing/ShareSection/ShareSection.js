import Paper from '@material-ui/core/Paper';
import SideInfoArea from '../InfoArea';
import Divider from '@material-ui/core/Divider';
import styles from './styles.module.sass';
import FacebooIcon from '../../../../public/images/Facebook.svg';
import TweetIcon from '../../../../public/images/Tweet.svg';
import Card from '../../../listings/ListingCard';
import {useEffect, useState} from 'react'
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


export default function ShareSection({formData, formDataUpdater}) {

  const [user, setUser] = useState('')
  const [userId, setUserId] = useState('')

  console.log(formData)
 /*  const {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    VKShareButton,
} = ShareButtons */

  // console.log(formData)

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      let data = JSON.parse(localStorage.getItem('userInfo'))
      console.log(data)
      setUserId(data.userId)
      let userName = data.firstName +  ' ' + data.lastName
      setUser(userName)
    }
  }, [])

  // console.log(user, userId)

  
  function copyLinkHandler() {
    const link = 'http://localhost:3001/listings/'+ formData.listingID + `?seristo_userId=${userId}&seristo_user=${user}`;
    navigator.clipboard.writeText(link);
    alert('Link Copied: ' + link);
  }

  // const listing = {
  //   name: formData.name,
  //   description: formData.description,
  //   image: formData.image,
  // };
  const shareUrl = 'http://localhost:3001/listings/' +  formData.listingID + `?seristo_userId=${userId}&seristo_user=${user}`
  const title = 'Hellooo!! This is from Seristo'

  return (
    <Paper style={{padding: '0px',
      borderRadius: '0px 0px 15px 15px'}}>

      <div className={styles.shareButtonsContainer}>
      <label className={styles.shareButton}>
          <div>
            <div className={styles.shareIcon}>
              <TwitterShareButton
                url={shareUrl}
                title={title}
                style = {{marginTop: "3%"}}
                className="Demo__some-network__share-button">
                <TwitterIcon
                  size={32}
                  round />
              </TwitterShareButton>
            </div>
          </div>
        </label>

        {/* <TwitterShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button">
          <TwitterIcon
            size={32}
            round />
        </TwitterShareButton> */}

        <label className={styles.shareButton}>
          <div className={styles.shareIcon}>
            <FacebookShareButton
              url={shareUrl}
              title={title}
              style = {{marginTop: "3%"}}
              className="Demo__some-network__share-button"
            >
            <FacebookIcon 
              size={32}
              round
            />
            </FacebookShareButton> 
          </div>
        </label>

        <div className={styles.shareButton}
          onClick={copyLinkHandler}>
          Copy Link
        </div>
      </div>

      {/* <div className={styles.horizontalSection1}>
        <SideInfoArea heading={'Embedd Listing'}
          content={'Copy and paste the code to ' +
          'display listing card in your website'} />

        <div className={styles.cardAndLinkContainer}>
          <Card listing={listing} isCreateNewListingSide={true}
            onClickHandler={() => 0}/>
        </div>
      </div> */}

      <Divider />
    </Paper>
  );
}
