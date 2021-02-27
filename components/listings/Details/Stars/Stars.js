import FilledStarIcon from '../../../../public/images/FilledStar.svg';
import EmptyStarIcon from '../../../../public/images/EmptyStar.svg';
import styles from './styles.module.sass';

export default function Stars({rating}) {
  const stars = Array(5).fill(<FilledStarIcon />);
  for (let i=4; i>rating-1; i--) {
    stars[i] = <EmptyStarIcon />;
  }

  return (
    <div className={styles.container}>
      {stars[0]} {stars[1]} {stars[2]} {stars[3]} {stars[4]}
    </div>
  );
}
