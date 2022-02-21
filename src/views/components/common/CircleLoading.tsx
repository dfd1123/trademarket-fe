import styled from 'styled-components';

interface PropsType {
    scale?: number;
}

const CircleLoading = ({ scale }: PropsType) => {
  return (
    <CircleLoadingStyle scale={scale ?? 1.0}>
      <span className="border"></span>
      <span className="load-bar"></span>
    </CircleLoadingStyle>
  );
};

const CircleLoadingStyle = styled.div<{scale?: number}>`
  height: 32px;
  width: 32px;
  -webkit-animation: loader-1-1 4.8s linear infinite;
  animation: loader-1-1 4.8s linear infinite;
  transform: scale(${(props) => props.scale});

  &.center {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .border {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: block;
    border-radius: 50%;
    border: 3px solid #eee;
  }

  .load-bar {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
    clip: rect(0, 32px, 32px, 16px);
    -webkit-animation: loader-1-2 1.2s linear infinite;
    animation: loader-1-2 1.2s linear infinite;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: 100%;
      width: 100%;
      clip: rect(0, 32px, 32px, 16px);
      border: 3px solid #000;
      border-radius: 50%;
      -webkit-animation: loader-1-3 1.2s cubic-bezier(0.77, 0, 0.175, 1)
        infinite;
      animation: loader-1-3 1.2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    }

    /* &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      border: 3px solid #ddd;
      border-radius: 50%;
    } */

    &::after,
    &::before {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }

  @keyframes loader-1-1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loader-1-2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
    }
  }

  @keyframes loader-1-3 {
    0% {
      transform: rotate(-140deg);
    }
    50% {
      transform: rotate(-160deg);
    }
    100% {
      transform: rotate(140deg);
    }
  }
`;

export default CircleLoading;
