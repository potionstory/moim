import { faWifi, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import {
  auth,
  signInWithGoogle,
  signInWithFacebook,
} from '../server/firebase.util';
import { firebaseToken } from '../store/api/auth';
import icon from '../lib/icons';

// get community icon
export const getCommunityIcon = (type) => {
  switch (type) {
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
  console.log("service: ", service);
  switch (service) {
    case 'google': {
      return signInWithGoogle().then((res) => {
        console.log("res: ", res);
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
    case 'kakao': {
      return new Promise((resolve, reject) => {
        Kakao.Auth.login({
          scope: 'profile',
          success: (authObj) => {
            Kakao.API.request({
              url: '/v2/user/me',
              success: (res) => {
                const token = Kakao.Auth.getAccessToken();
                const {
                  kakao_account: { profile },
                } = res;
                firebaseToken({
                  token,
                  id: res.id,
                  nickname: profile.nickname,
                  userImageUrl: profile.profile_image_url,
                }).then((res) => {
                  auth.signInWithCustomToken(res.data.token).then((res) => {
                    const { user } = res;

                    if (user !== null) {
                      resolve({
                        userImageUrl: user.photoURL,
                      });
                    }
                  });
                });
              },
            });
          },
        });
      });
    }
    default:
      return false;
  }
};
