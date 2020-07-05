import styled from 'styled-components';
import { color } from '../../lib/styles/palette';

export const SignWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const SignArea = styled.div`
  h4 {
    font-size: 2rem;
    color: ${({ theme }) => theme.main};
    text-transform: uppercase;
    line-height: 40px;
  }
`;

export const InputSubmit = styled.div`
  margin-top: 12px;
  padding-left: 46px;
  button {
    width: 100%;
    height: 40px;
    box-sizing: content-box;
    border-radius: 4px;
    background-color: ${({ theme, isActive }) =>
      !isActive ? theme.title : color.green};
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme, isActive }) => (!isActive ? theme.main : theme.title)};
    text-transform: uppercase;
    text-align: center;
    transition: all 0.2s ease-out;
  }
`;

export const ValidationText = styled.div`
  margin-top: 24px;
  padding-left: 46px;
  span {
    display: block;
    height: 40px;
    margin-top: 6px;
    padding: 0 1rem;
    border-radius: 4px;
    font-size: 0.875rem;
    background-color: ${color.red};
    color: ${({ theme }) => theme.main};
    line-height: 40px;
  }
`;

export const SignBox = styled.div`
  margin-top: 1.5rem;
`;

export const SocialBox = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  margin-left: 46px;
  border-top: 1px solid ${({ theme }) => theme.gray};
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
