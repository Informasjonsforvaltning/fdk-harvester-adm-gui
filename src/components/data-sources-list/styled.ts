import styled, { css } from 'styled-components';
import BaseSnackbarContent from '@material-ui/core/SnackbarContent';

const DataSources = styled.ul``;

const RegisterDataSourceButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 50px;
  width: 50px;
  border: none;
  border-radius: 50%;
  background: #0069a5;
  color: white;
  appearance: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }

  > svg {
    height: 70%;
    width: 70%;
    fill: white;
  }
`;

const SnackbarContent = styled(BaseSnackbarContent)<{ type: string }>`
  background: #007d69 !important;

  .message {
    display: flex;
    align-items: center;

    & > svg {
      margin-right: 10px;
    }
  }

  ${({ type }) =>
    type === 'harvest:error' &&
    css`
      background: #d70a5a !important;
    `}
`;

export default {
  DataSources,
  RegisterDataSourceButton,
  SnackbarContent
};
