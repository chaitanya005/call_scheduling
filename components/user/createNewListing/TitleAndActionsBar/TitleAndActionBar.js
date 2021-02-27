import Typography from '@material-ui/core/Typography';
import PreviewIcon from '../../../../public/images/preview.svg';
import SaveIcon from '../../../../public/images/save.svg';
import PublishIcon from '../../../../public/images/publish.svg';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import styles from './styles.module.sass';
import {useEffect, useState} from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    '& > *': {
      margin: theme.spacing(.9),
      fontSize: '13px',
      height: '20px',
      justifyContent: 'left',
    },
  },
}));

export default function TitleActionBar({onClickSaveOrPublish, onClickPreview,
  formDataUpdater}) {
  const [isVisibleOnProfile, setIsVisibleOnProfile] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    formDataUpdater({isVisibleOnProfile});
  }, []);

  function checkboxHandler(e) {
    setIsVisibleOnProfile(e.target.checked);
    formDataUpdater({isVisibleOnProfile: e.target.checked});
  }
  return (
    <div className={styles.outermost}>

      <Typography variant="h1" component="h2">
        Create New Event
      </Typography>

      <div className={styles.rightSideButtons}>
        <div className={styles.checkboxRow}>
          Event Visible on Profile
          <span>
            <input type='checkbox' checked={isVisibleOnProfile}
              onChange={checkboxHandler}/>
          </span>
        </div>

        {/* <div className={styles.paleButton}>
          <Button
            onClick={onClickPreview}
            color = 'secondary'
            variant='contained'
            className={classes.button}
            startIcon={<PreviewIcon />}
          >
          Preview
          </Button>
        </div>
        <div className={styles.paleButton}>
          <Button
            id='save'
            onClick={() => onClickSaveOrPublish('save')}
            color="secondary"
            variant='contained'
            className={classes.button}
            startIcon={<SaveIcon />}
          >
          Save
          </Button>
        </div>
        <div>
          <Button
            id='publish'
            onClick={() => onClickSaveOrPublish('publish')}
            color="primary"
            variant='contained'
            className={classes.button}
            startIcon={<PublishIcon />}
          >
          Publish
          </Button>
        </div> */}
      </div>
    </div>
  );
};

