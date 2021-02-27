import {useState, useEffect} from 'react';
import 'react-quill/dist/quill.snow.css'; // ES6
const ReactQuill = typeof window === 'object' ? require('react-quill') :
 () => false;

export default function Editor({formData, formDataUpdater, listing}) {
  let defaultDescription = '';
  if (formData.description!==undefined) {
    defaultDescription = formData.description;
  }

  const [description, setDescription] = useState(defaultDescription);
  const [updateDescription, setUpdateDescription] = useState('')
  var [quillRef, setQuillRef] = useState(null)
  var [reactQuillRef, setReactQuillRef] = useState(null)

  useEffect(() => {
    if (listing !== undefined && listing !== null)  {
      // console.log(listing)
      setDescription(listing.description)
      formDataUpdater({description: listing.description})
    }
  }, [listing])

  useEffect(() => {
    attachQuillRefs()
  }, [reactQuillRef === null])

  const handleChange = (value) => {
    setDescription(value);
    formDataUpdater({description: value});
  };

  const handleUpdate = (value) => {
    setUpdateDescription(value)
    formDataUpdater({description: value})
  }

  // console.log(reactQuillRef)

  const attachQuillRefs = () => {
    // console.log(reactQuillRef)
    if (reactQuillRef && typeof reactQuillRef.getEditor !== 'function') return;
    quillRef = reactQuillRef &&  reactQuillRef.getEditor();
  }



  // quillRef.root.dataset.placeholder = 'Your new placeholder'
  return (
    <React.Fragment>
      
     <ReactQuill placeholder='' style={{height: '200px', width: '550px'}} value={description}
      onChange={handleChange}  />
      
    </React.Fragment>
  );
};
