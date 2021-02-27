import styles from './styles.module.sass';

export default function InfoArea({heading, content='content'}) {
  return (
    <div style={{flex: .4}}>
      <div className={styles.heading}
      >{heading}</div>

      <div className={styles.content}
      >{content}</div>
    </div>
  );
};
