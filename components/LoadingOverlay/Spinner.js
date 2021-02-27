import styles from './styles.module.sass';

export default function Spinner({message, isFullScreen}) {
  return (
    <div className={isFullScreen? styles.overlay : styles.overlayNotFullScreen}>
      <div className={styles.overlayWrapper}>
        <div className={isFullScreen?
        styles.overlaySpinner : styles.overlaySpinnerNotFullScreen}>
          {message}
        </div>
      </div>
    </div>
  );
}
