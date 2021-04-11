import styled from 'styled-components';
import { hidden } from '../../lib/styles/util';
import { color } from '../../lib/styles/palette';

export const SignWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const SignInner = styled.div`
  h4 {
    font-size: 2rem;
    color: ${({ theme }) => theme.main};
    text-transform: uppercase;
    line-height: 40px;
  }
`;

export const SignBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SocialArea = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  margin-left: 46px;
  border-top: 1px solid ${({ theme }) => theme.title};
  .subTitle {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.theme};
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    text-transform: uppercase;
  }
  .socialList {
    margin-top: 0.75rem;
  }
`;

export const InputAvatar = styled.input`
  ${hidden};
`;

export const UserImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  .userImage {
    display: flex;
    overflow: hidden;
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.main};
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      svg {
        font-size: 4rem;
        color: ${({ theme }) => theme.gray};
        opacity: 0.6;
        transition: all 0.2s ease-out;
      }
    }
    &:hover {
      label {
        svg {
          color: ${({ theme }) => theme.theme};
          opacity: 1;
        }
      }
    }
  }
  .email {
    flex: 1;
    margin-top: 1.5rem;
    font-size: 2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.title};
  }
`;
