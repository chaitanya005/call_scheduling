import styles from './styles.module.sass';
import UploadImageIcon from '../../../../public/images/imageUpload.svg';
import {useState, useEffect} from 'react';

export default function QuestionRows({formDataUpdater, formData, listing}) {
  // todo replace with listing.questions
  const questions= listing.questionSet;
  // console.log(questions && questions[0].text === '')
  if (questions && questions[0].text !== ''){

  let defaultAnswers = new Array(questions.length);
  if (formData.answers!==undefined) {
    defaultAnswers = formData.answers;
  }


  const [answers, setAnswers] = useState(defaultAnswers);
  const questionRows = new Array(questions.length);

  if (questions.length===0) {
    return <div></div>;
  }
  // console.log(questions)

  for (let i=0; i<questions.length; i++) {
    if (questions[i].type==='Short Answer') {
      questionRows[i] =
      <div>
        <div className={styles.questionText}>{questions[i].text}
          {questions[i].isRequired ?
        <span className={styles.star}>*</span> : null}
        </div>
        <textarea onChange={textAnsHandler} id={i} value={answers[i]}
          className={styles.textFieldShort}/>
      </div>;
    } else if (questions[i].type==='Long Answer') {
      questionRows[i] =
      <div>
        <div className={styles.questionText}>{questions[i].text}
          {questions[i].isRequired ?
        <span className={styles.star}>*</span> : null}
        </div>
        <textarea onChange={textAnsHandler} id={i}
          value={answers[i]} className={styles.textFieldLong}/>
      </div>;
    } else { // file attachment
      questionRows[i] =
      <div>
        <div className={styles.questionText}>{questions[i].text}
          {questions[i].isRequired ?
        <span className={styles.star}>*</span> : null}
        </div>
        <div
          className={styles.box}>

          <label>
            <div className={styles.labelDiv}>
              <div>
                <UploadImageIcon className={styles.icon}/>
                <div>
            Click anywhere to upload.
                </div>
              </div>
              <div>
                  {answers[i] === undefined ? 'Select any File' : `Selected File: ${answers[i]}`}
              </div>
            </div>
            <input type="file" className={styles.input} id={i}
              onChange={fileHandler}/>

          </label>
        </div>
      </div>;
    }
  }

  


  function textAnsHandler(e) {
    const newAnswers = answers;
    newAnswers[e.target.id] = e.target.value;
    setAnswers(newAnswers);
    formDataUpdater({answers: newAnswers});
    // console.log(formData);
  }

  function fileHandler(e) {
   
    
    if (e.target.files[0].size < 1000000) {
      const newAnswers = answers;
      newAnswers[e.target.id] = e.target.value;  
      const reader = new FileReader();
      const id = e.target.id + 1; // because 0 based indexing
      reader.onload = function(event) {
        formDataUpdater({['fileFor'+id]: event.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
      setAnswers(prevAnswers => ([...prevAnswers, ...newAnswers]));
      formDataUpdater({answers: newAnswers});
    }
  }

  return (
    <div>
      <div className={styles.heading}>Service Specific Questions</div>
      <div className={styles.subheading}>
      Fill the form below to tell the host about yourself or what you expect
      </div>
      {questionRows}
    </div>
  );
  }else {
    return (
      <div>No Questions</div>
    )
  }
}
