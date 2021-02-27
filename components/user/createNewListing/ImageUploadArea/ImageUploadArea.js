import Typography from '@material-ui/core/Typography';
import UploadImageIcon from '../../../../public/images/imageUpload.svg';
import styles from './styles.module.sass';
import {useState} from 'react';
import axios from 'axios'
import Spinner from '../../../LoadingOverlay'

// TODO restore image between component change
export default function UploadImageArea({formData, formDataUpdater}) {

  let defaultImg = null

  if (formData.imageToUpload!==undefined) {
    /* const reader = new FileReader();
    reader.onload = function(e) {
      setImage(e.target.result);
    };
    if (1) {
      reader.readAsDataURL(formData.image);
    } */
    // setImage(formData.imageToUpload)
    defaultImg = formData.imageToUpload
    // console.log(formData.imageToUpload)
    
  }

  const [image, setImage] = useState(defaultImg);
  const [loading, setLoading] = useState(false)
  const [toBlob, setToBlob] = useState(null)


  


  function dataURIToBlob(img) {
      let image = img &&  img.replace(/^data:/, '');
      // const type = image.match(/image\/[^;]+/);
      // const base64 = image.replace(/^[^,]+,/, '');
      // const arrayBuffer = new ArrayBuffer(base64.length);
      // const typedArray = new Uint8Array(arrayBuffer);

      console.log(image)
      // console.log(type)
      // console.log(base64)
      // console.log(arrayBuffer)

      // for (let i = 0; i < base64.length; i++) {
      //   typedArray[i] = base64.charCodeAt(i);
      // } 


      // console.log(typedArray)


      // return new Blob([arrayBuffer], {type});

     
  }
  
  // console.log(image)

  // const img = image

  // function b64toBlob(image, contentType = '', sliceSize = 512) {
  //   let byteCharacters = atob(image);
  //   let byteArrays = [];
  //   // console.log9
  //   for (let i = 0; i < byteCharacters.length; i += sliceSize) {
  //     let slice = byteCharacters.slice(i, i + sliceSize);

  //     let byteNumbers = new Array(slice.length);

  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }

  //   const blob = new Blob(byteArrays, {type: contentType});
  //   // return blob;
  //   console.log(blob)
  //   setToBlob(blob)
  // }


  function handleDrop() {
    //
  }

  const singleFileUploadHandler = async (image) => {
    const data = new FormData();
  // If file selected
    if (image) {
      data.append( 'profileImage', image, image.name );
      // console.log(image)
      await axios.post(process.env.BACKEND_URL + '/users/uploadImage' , data, {
          headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          }
        })
      .then(res => {
        // console.log(res.data)
        setImage(res.data.location)
        setLoading(false)
        formDataUpdater({imageToUpload: res.data.location})
      })
      .catch(err => console.log(err))
    }
    
  }


  const fileHandler = (event) => {
    
    // console.log(event.target.files, event.target.files[0])
    /* const reader = new FileReader();
    reader.onload = function(e) {
      setImage(e.target.result);
      formDataUpdater({imageToUpload: e.target.result});
    };
    reader.readAsDataURL(event.target.files[0]); */
    // dataURIToBlob(image)
    singleFileUploadHandler(event.target.files[0])
    // setImage(event.target.files[0])
    setLoading(true)

  };
  return (
    <div>
      {loading ? 
        <Spinner message={'Uploading...'} isFullScreen={true} /> :''}
      <div className={styles.rightHeading}>
        Cover Photo
      </div>

      <Typography variant='subtitle1'>
        Recommended thumbnail size 800x400 (px)
      </Typography>
      {/* TODO */}
      <div onDrop={() => handleDrop}
        onDragOver={() => console.log('dragged')}
        className={styles.box}>
        <label>

          <div className={image===null ? styles.helperTextShown :
            styles.helperTextHidden}>
            <UploadImageIcon className={styles.icon}/>
            <div className={styles.insideText}>
            Click to upload.
            </div>
          </div>

          <input type="file" accept="image/*" className={styles.input}
            onChange={fileHandler}/>

          <img src={image} alt={''} className={image!==null ?
          styles.imageShown : styles.imageHidden} />

        </label>
      </div>
      </div>
  );
};

