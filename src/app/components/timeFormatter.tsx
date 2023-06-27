import dayjs from 'dayjs';
import 'dayjs/locale/fr';

interface TimeFormatterProps {
  time: any;
}

const TimeFormatter: React.FC<TimeFormatterProps> = ({ time }) => {
  const formattedTime = dayjs(time)
  .locale('fr')
  .format('dddd D MMMM YYYY à HH:mm')
  .replace(/(\w+)/g, (match) => match.charAt(0)
  .toUpperCase() + match.slice(1));;

  return <span>{formattedTime}</span>;
};

export default TimeFormatter;
