import styled from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/util';

export const CardWrap = styled.li`
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
  .icon {
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
  }
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
            color: ${({ theme }) => theme.title};
          }
        }
      }
      &:nth-child(${({ activeIndex }) => activeIndex + 1}) {
        button {
          svg {
            color: ${({ theme }) => theme.main};
          }
        }
      }
    }
  }
`;

export const CardTabContentWrap = styled.div`
  flex: 1;
  margin-left: 12px;
`;

export const CardTabContentBlock = styled.div`
  display: block;
  position: relative;
  padding-top: 100%;
`;

export const CardTabContentInner = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.sub};
  .cardTabBox {
    display: none;
    height: 100%;
    &:nth-child(${({ activeIndex }) => activeIndex + 1}) {
      display: block;
    }
  }
`;

export const CardImage = styled.span`
  display: block;
  overflow: hidden;
  position: relative;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardText = styled.p`
  padding: 12px;
  font-size: 0.750rem;
  color: ${({ theme }) => theme.text};
  word-break: break-all;
  line-height: 1.5;
`;

export const CardLink = styled.div`
  padding: 12px;
  .linkBox {
    display: flex;
    height: 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.main};
    .url {
      flex: 1;
      padding: 8px 20px;
      font-size: 0.625rem;
      font-weight: 600;
      color: ${color.blue};
      line-height: 1.5rem;
      word-break: break-all;
      text-transform: uppercase;
      opacity: 0.6;
      transition: all 0.2s ease-out;
      ${ellipsis};
      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const CardMap = styled.div`
  height: 100%;
  .mapArea {
    height: 100%;
  }
`;

export const CardTime = styled.div``;

export const CardMore = styled.div`
  padding: 12px;
  .contentWrap {    
    .contentHead {
      display: flex;
      align-items: center;
      .iconBox {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        background-color: ${color.gray};
        font-size: 0.625rem;
        line-height: 24px;
        text-align: center;
        svg {
          color: ${({ theme }) => theme.main};
        }
      }
      .title {
        display: block;
        flex: 1;
        margin-left: 6px;
        font-size: 0.875rem;
        font-weight: 600;
        color: ${color.gray};
        line-height: 24px;
        text-transform: uppercase;
        ${ellipsis};
      }
    }
    .contentBody {
      margin-top: 6px;
      .tagList {
        display: flex;
        flex-wrap: wrap;
        li {
          height: 20px;
          margin: 0 4px 4px 0;
          button {
            height: 20px;
            padding: 0 10px;
            border-radius: 10px;
            background-color: ${color.blue};
            font-size: 0.625rem;
            color: ${({ theme }) => theme.main};
            line-height: 1;
            transition: all 0.2s ease-out;
            &:hover {
              color: ${({ theme }) => theme.title};
              background-color: ${({ theme }) => theme.main};
            }
          }
        }
      }
    }
    + .contentWrap {
      margin-top: 20px;
    }
  }
`;

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
      object-fit: cover;
      transition: all 0.2s ease-out;
    }
    span {
      flex: 1;
      height: 40px;
      margin-left: 12px;
      font-size: 0.75rem;
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
