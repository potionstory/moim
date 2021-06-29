import styled from 'styled-components';
import { hidden } from '../../lib/styles/util';

export const SignWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  .signInner {
    h4 {
      font-size: 2rem;
      color: ${({ theme }) => theme.main};
      text-transform: uppercase;
      line-height: 40px;
    }
    .signBody {
      display: flex;
      flex-direction: column;
      .socialWrap {
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
          color: ${({ theme }) => theme.title};
          text-transform: uppercase;
        }
        .socialList {
          margin-top: 0.75rem;
        }
      }
    }
  }
`;

export const UserImage = styled.div`
  display: flex;
  gap: 0 6px;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  .btnUpload, .btnReset {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.main};
    cursor: pointer;
    transition: all 0.2s ease-out;
    input {
      ${hidden};
    }
    svg {
      font-size: 1rem;
      color: ${({ theme }) => theme.title};
    }
    &:hover {
      background-color: ${({ theme }) => theme.theme};
    }
  }
  .userImage {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.main};
    &:before {
      padding-top: 100%;
      content: '';
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
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
