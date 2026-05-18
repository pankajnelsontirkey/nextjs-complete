import Image from 'next/image';
import Link from 'next/link';

import logoImg from '@/assets/logo.png';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href='/' className={classes.logo}>
          <Image src={logoImg} alt='A plate with food on it' priority />
          NextLevel Foodie
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href='/meals'>Browse Meals</Link>
            </li>
            <li>
              <Link href='/community'>Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
