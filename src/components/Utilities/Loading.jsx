import styled, { keyframes } from "styled-components";

const Loading = ({ color, ...props }) => {
  return (
    <LoadingWrapper style={{ ...props }} className="dotPulseWrapper">
      <LoadingContainer>
        <DotPulse color={color || "#9880ff"} className="dotPulse"></DotPulse>
      </LoadingContainer>
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  height: inherit;
  position: relative;
  padding: 2rem 5%;
  margin: 1.5rem 0;
  border-radius: 0.25rem;
`;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem 0;
  margin: 0 -5%;
  overflow: hidden;
`;

const DotPulseAnimate = (color) => keyframes`
0% {
    box-shadow: 9999px 0 0 -5px ${color};
  }
  30% {
    box-shadow: 9999px 0 0 2px ${color};
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px ${color};
  }
`;

const DotPulseAfter = (color) => keyframes`
0% {
    box-shadow: 10014px 0 0 -5px ${color};
  }
  30% {
    box-shadow: 10014px 0 0 2px ${color};
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px ${color};
  }
`;
const DotPulseBefore = (color) => keyframes`
0% {
    box-shadow: 9984px 0 0 -5px ${color};
  }
  30% {
    box-shadow: 9984px 0 0 2px ${color};
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px ${color};
  }
`;

const DotPulse = styled.div`
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  color: ${({ color }) => color};
  box-shadow: 9999px 0 0 -5px ${({ color }) => color};
  animation: ${({ color }) => DotPulseAnimate(color)} 1.5s infinite linear;
  animation-delay: 0.25s;
  &:after,
  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    color: #9880ff;
  }
  &:after {
    box-shadow: 10014px 0 0 -5px ${({ color }) => color};
    animation: ${({ color }) => DotPulseAfter(color)} 1.5s infinite linear;
    animation-delay: 0.5s;
  }

  &:before {
    box-shadow: 9984px 0 0 -5px ${({ color }) => color};
    animation: ${({ color }) => DotPulseBefore(color)} 1.5s infinite linear;
    animation-delay: 0s;
  }
`;
