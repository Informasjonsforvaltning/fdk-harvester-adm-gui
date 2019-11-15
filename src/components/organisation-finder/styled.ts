import styled, { css } from 'styled-components';

const OrganisationFinder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 50px;
  background: rgba(0, 0, 0, 0.8);
  overflow-y: scroll;
  z-index: 1000;
`;

const ModalHeading = styled.h1`
  font-size: 120%;
  font-weight: 500;
`;

const Modal = styled.div`
  position: relative;
  left: 50%;
  width: 600px;
  transform: translate3d(-50%, 0, 0);
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 100px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  & > ${ModalHeading}, & > form > * {
    padding: 20px;
  }

  & > form,
  & > form > *:nth-child(n + 2) {
    border-top: 1px solid #ccc;
  }
`;

const Fieldset = styled.fieldset`
  min-height: 120px;

  & label.Mui-focused:not(.Mui-error),
  & label.Mui-focused > *:not(.Mui-error) {
    color: #0069a5 !important;
  }

  & .MuiInputBase-root.Mui-focused:not(.Mui-error) fieldset,
  & .MuiInputBase-root:not(.Mui-error):hover fieldset {
    border-color: #0069a5 !important;
  }

  & > *:nth-of-type(n + 2) {
    margin-top: 20px;
  }
`;

const SearchResult = styled.li`
  padding: 20px;
  font-weight: bold;
  box-shadow: 0 0 0 2px #007d69;
  cursor: pointer;
`;

const SearchResults = styled.ul`
  & > ${SearchResult}:nth-of-type(n+2) {
    margin-top: 20px;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;

  & > *:nth-of-type(n + 2) {
    margin-left: 10px;
  }

  & > button[type='submit']:enabled {
    background: #0069a5 !important;
  }
`;

const EasterEgg = styled.div<{ x: number; y: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 2;
  perspective: 500px;

  & > span:first-of-type {
    font-size: 500%;
    white-space: nowrap;
    animation: animation-horizontal 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  & > span:last-of-type {
    font-size: 500%;
    white-space: nowrap;
    animation: animation-vertical 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  & > button {
    position: absolute;
    z-index: 3;
    transition: all 0.3s ease-in-out;

    ${({ x, y }) => css`
      transform: translateX(${x}%) translateY(${y}%);
    `}
  }

  @keyframes animation-horizontal {
    0% {
      transform: translate(200%, 0) rotateX(25deg) rotateY(20deg) rotateZ(-3deg);
      text-shadow: -6px 4px 0px red;
    }
    10% {
      text-shadow: 4px -6px 0px green;
    }
    20% {
      text-shadow: -9px 4px 0px blue;
    }
    30% {
      text-shadow: 4px -6px 0px yellow;
    }
    40% {
      text-shadow: -8px 4px 0px orange;
    }
    50% {
      text-shadow: 4px 5px 0px purple;
    }
    60% {
      text-shadow: -6px 4px 0px brown;
    }
    70% {
      text-shadow: 4px 7px 0px pink;
    }
    80% {
      text-shadow: -9px -4px 0px lime;
    }
    90% {
      text-shadow: 4px -6px 0px cyan;
    }
    100% {
      transform: translate(-200%, 0) rotateX(25deg) rotateY(20deg)
        rotateZ(-3deg);
      text-shadow: -9px 4px 0px teal;
    }
  }

  @keyframes animation-vertical {
    0% {
      transform: translate(-30%, 200%) rotateX(25deg) rotateY(20deg)
        rotateZ(-3deg);
      text-shadow: -6px 4px 0px red;
    }
    10% {
      text-shadow: 4px -6px 0px green;
    }
    20% {
      text-shadow: -9px 4px 0px blue;
    }
    30% {
      text-shadow: 4px -6px 0px yellow;
    }
    40% {
      text-shadow: -8px 4px 0px orange;
    }
    50% {
      text-shadow: 4px 5px 0px purple;
    }
    60% {
      text-shadow: -6px 4px 0px brown;
    }
    70% {
      text-shadow: 4px 7px 0px pink;
    }
    80% {
      text-shadow: -9px -4px 0px lime;
    }
    90% {
      text-shadow: 4px -6px 0px cyan;
    }
    100% {
      transform: translate(-30%, -200%) rotateX(25deg) rotateY(20deg)
        rotateZ(-3deg);
      text-shadow: -9px 4px 0px teal;
    }
  }
`;

export default {
  OrganisationFinder,
  ModalHeading,
  Modal,
  Fieldset,
  SearchResult,
  SearchResults,
  ModalActions,
  EasterEgg
};
