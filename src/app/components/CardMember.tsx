import { TeamData } from '../context/Team';
import Image from 'next/image';
import Link from 'next/link';
import twitch from '../../../public/twitch.svg';
import youtube from '../../../public/youtube.svg';
import twitter from '../../../public/twitter.svg';

export default function CardMember({
  user_name,
  first_name,
  last_name,
  role,
  image,
  youtube_link,
  twitch_link,
  twitter_link,
}: TeamData) {
  return (
    <div className="card-container">
      <Link href={`/team/${user_name}`}>
        <div className="card-member">
          <div className="card-member__image">
            <Image className="img" src={image} fill={true} alt={user_name} />
          </div>
          <div className="card-member__details">
            <p className="card-member__username">{user_name}</p>
            <p className="card-member__fullname">
              {first_name} {last_name}
            </p>
            <p className="card-member__role">{role}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
