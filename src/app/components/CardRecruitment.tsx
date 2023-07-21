import TimeFormatter from './timeFormatter';
import { RecruitementData } from '../context/Recruitment';

export default function CardRecruitment({
  email,
  first_name,
  last_name,
  message,
  cv,
  external_link,
  is_reviewed,
  is_accepted,
  reviewer_comment,
  reviewer_comment_private,
  created_at,
}: RecruitementData | any) {
  return (
    <div className="recruitment">
      <p className="recruitment__date">{first_name}</p>
      <p className="recruitment__date">{<TimeFormatter time={created_at} />}</p>
    </div>
  );
}
