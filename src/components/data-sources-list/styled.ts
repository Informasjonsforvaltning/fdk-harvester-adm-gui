import styled, { css } from 'styled-components';
import Fab from '@material-ui/core/Fab';
import BaseSnackbarContent from '@material-ui/core/SnackbarContent';

const DataSources = styled.ul``;

const RegisterDataSourceButton = styled(Fab)`
  position: fixed !important;
  bottom: 40px;
  right: 40px;
  background: #0069a5 !important;

  svg {
    fill: white !important;
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
