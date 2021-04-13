import styled from 'styled-components';
import { color } from '../../lib/styles/palette';

export const MoimDetailWrap = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.main};
`;

export const MoimDetailBase = styled.div`
  display: flex;
  .info {
    width: 220px;
    .thumb {
      overflow: hidden;
      height: 220px;
      border-radius: 4px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .summary {
    flex: 1;
    margin-left: 24px;
  }
`;

export const MoimDetailInfo = styled.div`
`;