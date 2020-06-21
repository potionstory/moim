import styled from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis, ellipsisMulti } from '../../lib/styles/util';

export const CardWarp = styled.li`
  display: flex;
  flex: 1;
  flex-grow: 0;
  flex-direction: column;
  justify-content: space-between;
  min-width: 296px;
  margin: 2rem 1rem 1rem;
  .inner {
    transition: all 0.2s ease-out;
  }
  &:hover {
    .inner {
      box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px 0px;
    }
  }
`;

export const CardBlock = styled.div`
  display: block;
  position: relative;
  padding-top: 100%;
`;

export const CardInner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.main};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  .info {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    margin-left: 12px;
    h3 {
      display: block;
      font-size: 1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.title};
      line-height: 1rem;
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
        ${({ status }) => {
          switch (status) {
            case 'open':
              return `background-color: ${color.orange}`;
            case 'close':
              return `background-color: ${color.gray}`;
            case 'empty':
              return `background-color: ${color.blue}`;
            case 'full':
              return `background-color: ${color.red}`;
            case 'proceeding':
              return `background-color: ${color.green}`;
            case 'complete':
              return `background-color: ${color.gray}`;
            default:
              return;
          }
        }};
        font-size: 0.625rem;
        font-weight: 600;
        color: ${({ theme }) => theme.main};
        line-height: 1rem;
        text-transform: uppercase;
      }
    }
  }
`;

export const CardIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.sub};
  svg {
    color: ${({ theme }) => theme.title};
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  margin-top: 12px;
`;

export const CardTabMenuWrap = styled.div`
  width: 40px;
`;

export const CardTabMenu = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.sub};
  .activeBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.theme};
  }
  ul {
    position: relative;
    li {
      button {
        display: block;
        width: 100%;
        font-size: 0.875rem;
        line-height: 40px;
        svg {
          transition: all 0.2s ease-out;
          color: ${({ theme }) => theme.gray};
        }
        &:hover {
          svg {
            color: ${({ theme }) => theme.theme};
          }
        }
      }
      &:nth-child(${({ activeIndex }) => activeIndex}) {
        button {
          svg {
            color: ${({ theme }) => theme.main};
          }
        }
      }
    }
  }
`;

export const CardTabContentWarp = styled.div`
  flex: 1;
  margin-left: 12px;
`;

export const CardTabContentBlock = styled.div`
  display: block;
  position: relative;
  padding-top: 100%;
`;

export const CardTabContentInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.theme}; /* [TODO]: DELETE */
  .cardTabBox {
    display: none;
    height: 100%;
    &:nth-child(${({ activeIndex }) => activeIndex}) {
      display: block;
    }
  }
`;

export const CardImage = styled.span`
  display: block;
  overflow: hidden;
  position: relative;
  height: 100%;
  border-radius: 4px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.gray};
  word-wrap: break-word;
  line-height: 1.25rem;
  ${ellipsisMulti};
`;

export const CardMap = styled.div``;

export const CardTime = styled.div``;

export const CardMore = styled.div``;

export const CardUserInfo = styled.div`
  display: flex;
  max-height: 40px;
  margin-top: 12px;
  justify-content: space-between;
  .user {
    display: flex;
    overflow: hidden;
    height: 40px;
    padding: 0 12px;
    img {
      width: 34px;
      height: 34px;
      border: 3px solid ${({ theme }) => theme.main};
      border-radius: 20px;
      background-color: ${({ theme }) => theme.main};
      transition: all 0.2s ease-out;
    }
    span {
      flex: 1;
      height: 40px;
      margin-left: 12px;
      font-size: 0.875rem;
      font-weight: 400;
      color: ${({ theme }) => theme.gray};
      line-height: 40px;
      ${ellipsis};
      b {
        font-weight: 700;
        color: ${({ theme }) => theme.title};
        transition: all 0.2s ease-out;
      }
    }
    &:hover {
      img {
        border-color: ${({ theme }) => theme.theme};
      }
      b {
        color: ${({ theme }) => theme.theme};
      }
    }
  }
  .like {
    display: flex;
    align-items: center;
    padding: 0 12px;
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
