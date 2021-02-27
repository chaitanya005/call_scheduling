// commented imports and related code is for handling multiple images for one
// listing in future
// import LeftArrow from '../../../../../public/images/LeftArrowHead.svg';
// import RightArrow from '../../../../../public/images/RightArrowHead.svg';
import GreyDot from '../../../../public/images/GreyDot.svg';
import WhiteDot from '../../../../public/images/WhiteDot.svg';
import styles from './styles.module.sass';
import {useState} from 'react';
import {useRouter} from 'next/router'
// import listingImg from '../../../../public/images/windmill.jpg'

export default function ImagesSection({image}) { // images is array of urls
  const images = [image];
  const imagesArray = new Array(images.length);
  const defaultDotsArray = new Array(images.length);

  for (let i=0; i<images.length; i++) {
    imagesArray[i] = <img
      className={styles.image} src={images[i]} />;

    defaultDotsArray[i] = <GreyDot className={styles.dot} />;
  }
  defaultDotsArray[0] = <WhiteDot className={styles.dot} />;
  const [dotsArray, setDotsArray] = useState(defaultDotsArray);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function onArrowClick(num) {
    if (num<0) {
      num = num + images.length;
    }
    const newIndex = (currentImageIndex + num) % images.length;

    // to set dots accordingly
    dotsArray[currentImageIndex] = <GreyDot className={styles.dot}/>;
    dotsArray[newIndex] = <WhiteDot className={styles.dot}/>;

    // to set image
    setCurrentImageIndex(newIndex);
  }

  const router = useRouter()


  return (
    <div className={styles.outermostContainer}>
      {/* <LeftArrow onClick={() => onArrowClick(-1)} className={styles.leftArrow}/> */}
      {/* <RightArrow onClick={() => onArrowClick(1)} className={styles.rightArrow}/> */}
      {/* imagesArray[currentImageIndex] */}
      {/* <div className={styles.dotsContainer}>{dotsArray}</div> */}
      {router.pathname === '/listings/[id]' ? 
      <React.Fragment>
        {image !== null ? 
        <img src = {image} className = {styles.img} alt = ""/>
        : 
        <img src = "https://www.ge.com/news/sites/default/files/styles/full_header/public/Reports/2020-03/wind-onshore-48-158-3d-landscape-1-3000px.jpg?itok=MdBGJ3Tk" className={styles.staticImg} alt = ""/>
        }
      </React.Fragment>
      : 
      <React.Fragment>
        {image !== null ? 
        <img src = {image} style = {{width: '1100px', height: '400px'}} alt = ""/>
        : 
        <img src = "https://www.ge.com/news/sites/default/files/styles/full_header/public/Reports/2020-03/wind-onshore-48-158-3d-landscape-1-3000px.jpg?itok=MdBGJ3Tk" style = {{width: '970px', height: '400px'}} alt = ""/>
        }
      </React.Fragment>
      }
    </div>
  );
}