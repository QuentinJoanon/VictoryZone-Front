import { TeamData } from '../context/Team';
import Image from 'next/image';
import Link from 'next/link';
import { khand, staatliches } from '@/styles/fonts/fonts';

export default function CardMember({
  user_name,
  first_name,
  last_name,
  role,
  image,
}: TeamData) {
  return (
    <div>
      <div className="card-container">
        <Link href={`/team/${user_name}`}>
          <div className="card-container__member">
            <div className="card-container__member__image-container">
              <Image
                className="card-container__member__image-container__img"
                src={image}
                fill={true}
                alt={user_name}
              />
            </div>
            <div className="card-container__member__details">
              <p
                className={`card-container__member__details__username ${staatliches.className}`}
              >
                {user_name}
              </p>
              <p
                className={`card-container__member__details__fullname ${khand.className}`}
              >
                {first_name} {last_name}
              </p>
              <p
                className={`card-container__member__details__role ${khand.className}`}
              >
                {role}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
