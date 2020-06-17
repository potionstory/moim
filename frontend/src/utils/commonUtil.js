import icon from '../lib/icons';

export const getCategoryIcon = (service) => {
  switch (service) {
    case 'kakao':
      return icon.kakao;
    case 'slack':
      return icon.slack;
    case 'discord':
      return icon.discord;
    default:
      return;
  }
};
