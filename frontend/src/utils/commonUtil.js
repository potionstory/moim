import { faWifi, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { signInWithGoogle, signInWithFacebook } from '../server/firebase.util';
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

export const getSocialSign = (service) => {
  switch (service) {
    case 'google': {
      return signInWithGoogle().then((res) => {
        const user = res.user;
        if (user !== null) {
          return {
            email: user.email,
            userImageUrl: user.photoURL,
          };
        }
      });
    }
    case 'facebook': {
      return signInWithFacebook().then((res) => {
        const user = res.user;
        if (user !== null) {
          return {
            email: user.email,
            userImageUrl: user.photoURL,
          };
        }
      });
    }
    default:
      return false;
  }
};
