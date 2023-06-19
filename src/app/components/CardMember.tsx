import { TeamData } from '../context/Team';

export default function CardMember({
  user_name,
  first_name,
  last_name,
  description,
  role,
  image,
  statistics,
  achievements,
  youtube_link,
  twitch_link,
  twitter_link,
  created_at,
  updated_at,
  setup,
}: TeamData) {
  return (
    <div className="member">
      <div className="member__user-name">user_name</div>
      <div className="member__first-name">first_name</div>
      <div className="member__last-name">last_name</div>
      <div className="member__role">role</div>
      <div className="Member__description">description</div>
      <div className="member__image"></div>
      <div className="member__stats">statistics</div>
      <div className="member__achievements">achievements</div>
    </div>
  );
}
