import { TeamData } from '../context/Team';
import Image from 'next/image';
import Link from 'next/link';

export default function CardMember({
  user_name,
  first_name,
  last_name,
  // description,
  role,
  image,
}: // statistics,
// achievements,
// youtube_link,
// twitch_link,
// twitter_link,
// created_at,
// updated_at,
// setup,
TeamData) {
  return (
    <div>
      <Link href={`/team/${user_name}`}>
        <div className="card-member">
          <div className="card-member__image">
            <Image className="img" src={image} fill={true} alt={user_name} />
          </div>
          <p className="card-member__username">{user_name}</p>
          <p className="card-member__fullname">
            {first_name} {last_name}
          </p>
          <p className="card-member__role">{role}</p>
        </div>
      </Link>

      <div className="card-member__details">
        <p className="card-member__username">{user_name}</p>
        <p className="card-member__fullname">
          {first_name} {last_name}
        </p>
        <p className="card-member__role">{role}</p>
      </div>
    </div>

    // <div className="card-member">
    //   <div className="card-member__user-name">{user_name}</div>
    //   <div className="member__first-name">{first_name}</div>
    //   <div className="member__last-name">{last_name}</div>
    //   <div className="member__role">{role}</div>
    //   <div className="Member__description">{description}</div>
    //   <div className="member__image">
    //     {/* <Image className="img" src={image} fill={true} alt="oups" /> */}
    //   </div>
    //   <div className="member__stats">statistics</div>
    //   <div className="member__achievements">achievements</div>
    // </div>
  );
}
