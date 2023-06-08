'use client';

import styles from './page.module.css';
import LogIn from './log-in';
import { useAppSelector } from '@/redux/store';

export default function Home() {
  const username = useAppSelector((state) => state.authReducer.value.username);
  const isModerator = useAppSelector(
    (state) => state.authReducer.value.isModerator
  );
  return (
    <main className={styles.main}>
      <LogIn />
      <h1>Username: {username}</h1>
      {isModerator && <h1> This User is Moderator</h1>}
    </main>
  );
}
