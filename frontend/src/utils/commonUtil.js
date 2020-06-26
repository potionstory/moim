import { faWifi, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import icon from '../lib/icons';

// get community icon
export const getCommunityIcon = (service) => {
  switch (service) {
    case 'kakao':
      return icon.kakao;
    case 'line':
      return icon.line;
    case 'slack':
      return icon.slack;
    case 'discord':
      return icon.discord;
    default:
      return;
  }
};

// get meeting icon
export const getMeetingIcon = (type) => {
  switch (type) {
    case 'online':
      return faWifi;
    case 'offline':
      return faShoePrints;
    default:
      return;
  }
};

/* 
   get meeting status:
   empty(모집중)
   full(모집완료)
   proceeding(진행중)
   complete(완료)
*/
export const getMeetingStatus = (item) => {
  return item.status;
};
