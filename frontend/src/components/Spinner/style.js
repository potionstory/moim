import styled from 'styled-components';

export const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  stroke-linecap: round;
  stroke-width: 10px;
  fill: none;
  .circle {
    stroke: ${({ theme }) => theme.theme};
    stroke-dashoffset: 0;
    transform-origin: center;
    stroke-dasharray: 312;
    animation: circle 1s linear infinite;
  }
  @keyframes circle {
    0% {
      stroke-dashoffset: 312;
      transform: rotate(70deg);
    }
    60% {
      stroke-dashoffset: -312;
    }
    100% {
      stroke-dashoffset: -312;
      transform: rotate(450deg);
    }
  }
`;
