import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';

const DelegationPage = styled.ul``;

const RegisterDelegateeButton = styled(Fab)`
  position: fixed !important;
  bottom: 40px;
  right: 40px;
  background: #0069a5 !important;

  svg {
    fill: white !important;
  }
`;

const ConfirmDialog = styled(Dialog)`
  button {
    color: #0069a5 !important;
  }
`;

export default { DelegationPage, RegisterDelegateeButton, ConfirmDialog };
