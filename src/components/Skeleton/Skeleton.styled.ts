import styled, { keyframes } from 'styled-components';
import { Box } from 'grommet';

const backgroundAnimation = keyframes`
  0% {
    transform: translate3d(-300px, 0, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
`;

export const StyledBox = styled(Box)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &:before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width: calc(100% + 300px);
    background-image: linear-gradient(to left, rgb(240, 240, 240), rgb(224, 224, 224) 50%, rgb(240, 240, 240));
    background-size: 300px 100%;
    will-change: transform;
    background-position: 0px 0px;
    animation: ${backgroundAnimation} 1000ms linear infinite;
  }
`;
