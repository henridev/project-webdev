import { FC, ReactElement } from 'react';
import styles from './404.module.scss';

const NotFound: FC = (): ReactElement => (
	<main className={styles.main}>
		404
	</main>
);

export default NotFound;
