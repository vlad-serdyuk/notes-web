import styled, { keyframes } from 'styled-components';
import { Box } from 'grommet';
import { Themes } from 'app/constants/global';

const backgroundAnimation = keyframes`
  0% {
    transform: translate3d(-300px, 0, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const GRADIENT = {
  [Themes.light]: 'linear-gradient(to left, rgb(240, 240, 240), rgb(224, 224, 224) 50%, rgb(240, 240, 240))',
  [Themes.dark]: 'linear-gradient(to left, rgb(40, 40, 40), rgb(24, 24, 24) 50%, rgb(40, 40, 40))',
} 

export const StyledBox = styled(Box).attrs({
  align: 'center',
  pad: 'small',
})`
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
    background-image: ${({ theme }) => theme.dark ? GRADIENT[Themes.dark] : GRADIENT[Themes.light]};
    background-size: 300px 100%;
    will-change: transform;
    background-position: 0px 0px;
    animation: ${backgroundAnimation} 1000ms linear infinite;
  }
`;
