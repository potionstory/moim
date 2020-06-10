import styled from 'styled-components';
import { ellipsis, ellipsisMulti } from '../../lib/styles/util';

export const CardWarp = styled.li`
  display: flex;
  flex: 1;
  flex-grow: 0;
  flex-direction: column;
  justify-content: space-between;
  min-width: 296px;
  margin: 1rem;
  opacity: 0.6;
  transition: all 0.2s ease-out;
  &:hover {
    opacity: 1;
  }
`;

export const CardInner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.main};
`;

export const CardBase = styled.div`
  flex: 1;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  .icon {
    width: 40px;
    height: 40px;
  }
  .info {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    margin-left: 12px;
    .title {
      display: block;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.125rem;
      ${ellipsis};
    }
    .status {
      display: flex;
      flex-grow: 0;
      align-items: flex-start;
      margin-top: 6px;
      span {
        height: 1rem;
        padding: 0 6px;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.theme};
        font-size: 0.625rem;
        font-weight: 600;
        color: ${({ theme }) => theme.main};
        line-height: 1rem;
        text-transform: uppercase;
      }
    }
  }
`;

export const CardUrl = styled.div`
  display: flex;
  flex: 1;
  margin-top: 12px;
  height: 36px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.sub};
  .url {
    flex: 1;
    padding: 6px 12px;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${({ theme }) => theme.theme};
    line-height: 24px;
    ${ellipsis};
    opacity: 0.6;
    transition: all 0.2s ease-out;
    &:hover {
      opacity: 1;
    }
  }
  .btnIcon {
    width: 30px;
    height: 30px;
    margin-top: 3px;
    margin-right: 3px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.main};
    text-align: center;
    line-height: 30px;
    opacity: 0.6;
    transition: all 0.2s ease-out;
    svg {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.theme};
    }
    &:hover {
      opacity: 1;
    }
  }
`;

export const CardImage = styled.span`
  display: block;
  overflow: hidden;
  position: relative;
  height: 10rem;
  margin-top: 12px;
  border-radius: 6px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardText = styled.p`
  margin-top: 12px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text};
  line-height: 1rem;
  ${ellipsisMulti};
`;

export const CardAddInfo = styled.div`
  margin-top: 12px;
  padding-top: 6px;
  .infoItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 6px;
    border-radius: 18px;
    background-color: ${({ theme }) => theme.theme};
    transition: all 0.2s ease-out;
    .info {
      display: flex;
      overflow: hidden;
      flex: 1;
      height: 36px;
      align-items: center;
      .iconWrap {
        position: relative;
        width: 36px;
        height: 36px;
        .icon {
          display: block;
          width: 30px;
          height: 30px;
          margin: 3px;
          border-radius: 15px;
          background-color: ${({ theme }) => theme.main};
          font-size: 0.8rem;
          color: ${({ theme }) => theme.theme};
          text-align: center;
          line-height: 30px;
        }
        .spinner {
          display: none;
        }
      }
      b {
        overflow: hidden;
        flex: 1;
        height: 36px;
        margin: 0 6px;
        font-size: 0.813rem;
        font-weight: 600;
        color: ${({ theme }) => theme.main};
        line-height: 36px;
        text-align: left;
        ${ellipsis};
      }
    }
    .arrow {
      width: 30px;
      height: 30px;
      margin: 3px;
      border-radius: 15px;
      background-color: ${({ theme }) => theme.theme};
      text-align: center;
      line-height: 32px;
      svg {
        font-size: 1rem;
        color: ${({ theme }) => theme.main};
      }
    }
    &:hover {
      background-color: ${({ theme }) => theme.main};
      .iconWrap {
        .spinner {
          display: block;
        }
      }
      b {
        color: ${({ theme }) => theme.theme};
      }
    }
  }
`;

export const CardUserInfo = styled.div`
  display: flex;
  flex: 1;
  max-height: 36px;
  margin-top: 12px;
  padding: 0 12px;
  justify-content: space-between;
  .user {
    display: flex;
    overflow: hidden;
    flex: 1;
    height: 36px;
    img {
      width: 30px;
      height: 30px;
      border: 3px solid ${({ theme }) => theme.main};
      border-radius: 18px;
      background-color: #fff;
      transition: all 0.2s ease-out;
    }
    span {
      flex: 1;
      height: 36px;
      margin: 0 6px;
      font-size: 0.813rem;
      font-weight: 400;
      color: ${({ theme }) => theme.title};
      line-height: 36px;
      ${ellipsis};
      b {
        font-weight: 600;
        color: ${({ theme }) => theme.theme};
        text-transform: none;
      }
    }
    &:hover {
      img {
        border-color: ${({ theme }) => theme.theme};
      }
    }
  }
  .like {
    display: flex;
    align-items: center;
    padding: 0 3px;
    color: ${({ theme }) => theme.theme};
    span {
      flex: 1;
      height: 36px;
      margin-left: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 36px;
    }
  }
`;
