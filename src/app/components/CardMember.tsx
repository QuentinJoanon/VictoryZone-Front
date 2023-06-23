import { TeamData } from '../context/Team';
import Image from 'next/image';
import Link from 'next/link';

export default function CardMember({
  user_name,
  first_name,
  last_name,
  role,
  image,
}: TeamData) {
  return (
    <div className="card-member">
      <Link href={`/team/${user_name}`}>
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
      </Link>
    </div>
  );
}
