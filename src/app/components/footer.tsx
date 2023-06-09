'use client';
import logo from '../../assets/logo.png';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <a href="/">
        <Image
          src={logo}
          width={200}
          height={200}
          alt="Logo VictoryZone"
          priority={true}
        />
      </a>

      <div>
        <ul>
          <li>
            <a href="/team">Team</a>
          </li>
          <li>
            <a href="/articles">Articles</a>
          </li>
          <li>
            <a href="/calendrier">Calendrier</a>
          </li>
          <li>
            <a href="/recrutement">Recrutement</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/cgu">CGU</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
