import Paper from '@material-ui/core/Paper';
import SideInfoArea from '../InfoArea';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './styles.module.sass';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useState, useEffect} from 'react';

export default function CheckoutSection({onClickNext,
  formData, formDataUpdater, listing}) {
  // state restoration block start
  let defaultThankYouText = '';
  if (formData.thankYouText!==undefined) {
    defaultThankYouText = formData.thankYouText;
  }

  let defaultNameOption = 'Default';
  if (formData.checkoutNameOption!==undefined) {
    defaultNameOption = formData.checkoutNameOption;
  }

  let defaultEmailRequired = true;
  if (formData.emailRequired!==undefined) {
    defaultEmailRequired = formData.emailRequired;
  }

  let defaultQuestions = [{
    text: '',
    type: 'Short Answer',
    isRequired: true,
  }];
  let defaultQuestionRows = [<QuestionRow key={0}
    index={0} updater={questionChangeHandler}/>];

  if (formData.questions!==undefined) {
    defaultQuestions = formData.questions;

    defaultQuestionRows = [];
    for (let i=0; i<defaultQuestions.length; i++) {
      defaultQuestionRows.push(<QuestionRow key={i}
        oldText={defaultQuestions[i].text}
        oldType={defaultQuestions[i].type}
        oldIsRequired={defaultQuestions[i].isRequired}
        index={i} updater={questionChangeHandler}/>);
    }
  }


  // state restoration block end

  const [nameOption, setNameOption] = useState(defaultNameOption);
  const [emailRequired, setEmailRequired] = useState(defaultEmailRequired);
  const [questionRows, setQuestionRows] = useState(defaultQuestionRows);
  const [questions, setQuestions] = useState(defaultQuestions);
  const [thankYouText, setThankYouText] = useState(defaultThankYouText);
  const [updateThankYouText, setUpdateThankYouText] = useState()


  // update formData with default values
  useEffect(() => {
    formDataUpdater({
      nameOption,
      emailRequired,
      questions,
    });

    if (listing !== undefined && listing !== null) {
      setUpdateThankYouText(listing.thankYouNote)
    }
  }, []);

  

  function questionChangeHandler(index, updatedQuestion) {
    const newQuestions = questions;
    console.log(index);
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
    formDataUpdater({'questions': newQuestions});
  }
  function onClickAddDiscount(e) {
    //
  };

  function handleNameOptionChange(option) {
    setNameOption(option);
    formDataUpdater({nameOption: option});
  }

  function handleThankYouText(value) {
    setThankYouText(value);
    formDataUpdater({thankYouText: value});
  }

  function handleUpdateThankYouText(value) {
    setUpdateThankYouText(value)
    formDataUpdater({thankYouText: value})
  }


  function addCustomField() {
    const newQuestions = questions;
    newQuestions.push({
      text: '',
      type: 'Short Answer',
      isRequired: true,
    });
    setQuestions(newQuestions);
    setQuestionRows([...questionRows,
      <QuestionRow key={questions.length-1} index={questions.length-1}
        updater={questionChangeHandler} />]);
  }

  function emailRequiredChangeHandler(what) {
    if (what==='yes') {
      setEmailRequired(true);
      formDataUpdater({emailRequired: true});
    } else {
      setEmailRequired(false);
      formDataUpdater({emailRequired: false});
    }
  }



  // console.log(listing)
  return (
    <Paper style={{padding: '0px',
      borderRadius: '0px 0px 15px 15px'}}>
      {/* <div className={styles.horizontalSection1}>
        <div className={styles.heading}>Discount Codes</div>
        <Button
          disabled
          variant="contained"
          onClick={onClickAddDiscount}
        >
        Add a Discount Code
        </Button>
      </div> */}

     {/*  <Divider /> */}

      <div className={styles.horizontalSection2}>

        <SideInfoArea heading={'Check Out Form Details'}
          content={'Add questions you want to ask your customers while they are booking'}/>

        <div className={styles.questionsContainer}>
          {/* <div className={styles.nameSection}>
            <div className={styles.subheading}>Name</div>
            <select value={nameOption} className={styles.dropdown}
              onChange={(event) => handleNameOptionChange(event.target.value)}>
              <option>Default</option>
            </select>
          </div> */}


          {listing && listing.isEmailRequired ?
            <div className={styles.emailSection}>
              {/* <div className={styles.subheading}>Email ID</div>
              <div className={styles.radioOptions}>
                <div className={styles.radioButton}>
                  <input onChange={() => emailRequiredChangeHandler('yes')}
                    checked={emailRequired} type='radio' /> Required
                </div>

                  <div className={styles.radioButton}>
                    <input onChange={() => emailRequiredChangeHandler('no')}
                      checked={!emailRequired} type='radio' /> Optional
                  </div>
                </div> */}
            </div> 
          : 
          <div className={styles.emailSection}>
            {/* <div className={styles.subheading}>Email ID</div>
            <div className={styles.radioOptions}>
              <div className={styles.radioButton}>
                <input onChange={() => emailRequiredChangeHandler('no')}
                  checked={emailRequired} type='radio' /> Required
              </div>

              <div className={styles.radioButton}>
                <input onChange={() => emailRequiredChangeHandler('yes')}
                  checked={!emailRequired} type='radio' /> Optional
              </div>
            </div> */}
          </div>
          
           }
          
          

          <div className={styles.questionsSectoin}>
            <div className={styles.subheading}>Question Fields</div>
            {questionRows}
            <div>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={() => addCustomField()}
              >
              Add Another Question
              </Button>
            </div>
          </div>
        </div>

      </div>

      <Divider />

      {listing && listing.thankYouNote ? 
      <div>
        <div className={styles.horizontalSectionLast}>
          <SideInfoArea heading={'Personalized Receipt'}
            content='Add a personalized thank you note for your customers when they buy your service. This will help you create a long term repetitive customer and a strong brand. '/>

          <TextField multiline rows={6} style={{flex: '.6', minHeight: '100px'}}
            value={updateThankYouText}
            onChange={(e) => handleUpdateThankYouText(e.target.value)}
            variant='outlined' placeholder='Thank You, For choosing us and being so awesome all at once. 
            Your support is much appreciated and I’m looking forward to getting in touch with you. You make us want to work harder and better so we can provide even better services to you.
            Thanks again!!!!!!!
            ' />


        </div>
        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton}
            onClick={onClickNext}>
            Publish
          </button>
        </div>
      </div>
      : 
        <div>
        <div className={styles.horizontalSectionLast}>
          <SideInfoArea heading={'Personalized Receipt'}
            content='Add a personalized thank you note for your customers when they buy your service. This will help you create a long term repetitive customer and a strong brand. '/>

          <TextField multiline rows={6} style={{flex: '.6', minHeight: '100px'}}
            value={thankYouText}
            onChange={(e) => handleThankYouText(e.target.value)}
            variant='outlined' placeholder='Thank You, For choosing us and being so awesome all at once. 
            Your support is much appreciated and I’m looking forward to getting in touch with you. You make us want to work harder and better so we can provide even better services to you.
            Thanks again!!!!!!!
            ' />


        </div>
        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton}
            onClick={onClickNext}>
            Publish
          </button>
        </div>
      </div>
      
      }

    </Paper>
  );
}

function QuestionRow({index, updater, oldText, oldType, oldIsRequired}) {
  let defaultText = '';
  if (oldText!==undefined) {
    defaultText = oldText;
  }
  let defaultType = 'Short Answer';
  if (oldType!==undefined) {
    defaultType = oldType;
  }
  let defaultRequired = true;
  if (oldIsRequired!==undefined) {
    defaultRequired = oldIsRequired;
  }
  const [text, setText] = useState(defaultText);
  const [type, setType] = useState(defaultType);
  const [isRequired, setIsRequired] = useState(defaultRequired);

  function handleTextChange(text) {
    setText(text);
    updater(index, {text, type, isRequired});
  }

  function handleInputTypeChange(type) {
    setType(type);
    updater(index, {text, type, isRequired});
  }

  function handleRequiredToggle(isRequired) {
    setIsRequired(isRequired);
    updater(index, {text, type, isRequired});
  }

  return (
    <div className={styles.questionRow}>
      <input onChange={(e) => handleTextChange(e.target.value)} value={text}
        className={styles.textField} type='text' placeholder = 'Do you have any health condition, If yes please describe? ' />

      {/* <select value={type} className={styles.dropdown}
        onChange={(e) => handleInputTypeChange(e.target.value)}>
        <option>Short Answer</option>
        <option>Long Answer</option>
        <option>File Attachment</option>
      </select> */}

      <input onChange={(e) => handleRequiredToggle(e.target.checked)}
        type="checkbox" checked={isRequired}
        id={index} className={styles.checkbox} />
      <label htmlFor={index} className={styles.switch}></label>
      <span>Required</span>
    </div>
  );
}
