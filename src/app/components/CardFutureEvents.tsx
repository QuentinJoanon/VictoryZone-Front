import { CalendarFutureData } from '../context/Calendar';
import TimeFormatter from './timeFormatter';
import './CardCalendar.scss';
import Image from 'next/image';
import logo from '../../assets/logo.webp';
import Link from 'next/link';
import { staatliches, ysabeau } from '@/styles/fonts/fonts';

export default function CardFutureEvents({
  id,
  event_name,
  event_date,
  adversary_name_short,
  live_link,
  image,
}: CalendarFutureData) {
  return (
    <div className="futur-event">
      <div className="futur-event__description">
        <h3
          className={`futur-event__description__name ${staatliches.className}`}
        >
          {event_name}
        </h3>
        <h4
          className={`futur-event__description__date ${staatliches.className}`}
        >
          {<TimeFormatter time={event_date} />}
        </h4>
      </div>
      <div className="futur-event__teams">
        <div className="futur-event__teams__home">
          <div className="futur-event__teams__home__logo">
            <Image
              className="logo"
              src={logo}
              fill={true}
              alt="Logo VictoryZone"
              priority={true}
            />
          </div>
          <div className="futur-event__teams__home__initials">VZ</div>
        </div>
        <div className="futur-event__teams__versus custom-font">V S</div>
        <div className="futur-event__teams__away">
          <div className="futur-event__teams__away__logo">
            <Image
              className="logo"
              src={image}
              fill={true}
              alt="Logo VictoryZone"
              priority={true}
            />
          </div>
          <div className="futur-event__teams__away__initials">
            {adversary_name_short}
          </div>
        </div>
      </div>
      <div className="futur-event__btn">
        <a className="futur-event__btn__white-neon" href={live_link}>
          Live
        </a>
      </div>
    </div>
  );
}
