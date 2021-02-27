import InfoArea from '../InfoArea';
import Editor from '../Editor';
import ImageUploadArea from '../ImageUploadArea';
import styles from './styles.module.sass';
import {useState, useEffect} from 'react';

export default function BasicDetailsSection({formData, formDataUpdater, listing}) {
  let defaultName = '';
  if (formData.name!==undefined) {
    defaultName = formData.name;
  }
  const [name, setName] = useState(defaultName);
  const [updateName, setUpdateName] = useState('')

  useEffect(() => {
    if (listing !== null)  {
      setUpdateName(listing.name)
      formDataUpdater({name: listing.name})
    }
  }, [listing])
  

  // console.log(listing)
  function listingNameHandler(e) {
    setName(e.target.value);
    formDataUpdater({name: e.target.value});
  }

  function listingNameUpdate(e) {
    setUpdateName(e.target.value)
    formDataUpdater({name: e.target.value})
  }


  return (
    <React.Fragment>
    {listing !== null ? 
      <div className={styles.outermostBox}>

        <InfoArea heading='Session Details'
          content='Add details about your session to help customers understand your offering better'/>

        <div className={styles.rightSection}>

          <div className={styles.rightHeading}>
          Session Name<span className={styles.star}>*</span>
          </div>

          <input type='text' className={styles.textField} id="listingName"
            // name = {updatedName}
            value={updateName}
            placeholder="Enter Session name" onChange={listingNameUpdate}/>

          <div className={styles.rightHeading}>
          Session Description<span className={styles.star}>*</span>
          </div>

          <div style={{height: '250px'}}>
            <Editor formData={formData}
              formDataUpdater={formDataUpdater} listing = {listing} />
          </div>

          <ImageUploadArea formData={formData}
            formDataUpdater={formDataUpdater}/>

        </div>

      </div>
      : 
      <div className={styles.outermostBox}>

        <InfoArea heading='Session  Details'
          content='Add details about your session to help customers understand your offering better'/>

        <div className={styles.rightSection}>

          <div className={styles.rightHeading}>
          Session Name<span className={styles.star}>*</span>
          </div>

          <input type='text' className={styles.textField} id="listingName"
            value={name}
            placeholder='Enter Session Name' onChange={listingNameHandler}/>

          <div className={styles.rightHeading}>
          Session Description<span className={styles.star}>*</span>
          </div>

          <div style={{height: '250px'}}>
            <Editor formData={formData}
              formDataUpdater={formDataUpdater}/>
          </div>

          <ImageUploadArea formData={formData}
            formDataUpdater={formDataUpdater}/>

        </div>

      </div>
      }

    </React.Fragment>
  );
};

