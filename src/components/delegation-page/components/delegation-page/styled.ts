import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import Dialog from '@material-ui/core/Dialog';

import AddIconBase from '../../../../images/add-circle-icon.svg';

const DelegationContent = styled.ul`
  margin-left: ${theme.spacing('S24')};
`;

const Container = styled('div')`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 80px 20px;
  font-size: ${theme.fontSize('FS48')};
  font-weight: ${theme.fontWeight('FW700')};

  @media (max-width: 1020px) {
    & {
      font-size: ${theme.fontSize('FS24')};
    }
  }
`;

const ConfirmDialog = styled(Dialog)`
  button {
    color: #0069a5 !important;
  }
`;

const ButtonBar = styled.div`
  padding-bottom: ${theme.spacing('S16')};
`;

const AddIcon = styled(AddIconBase)`
  height: 1.6rem;
  width: 1.6rem;
  margin-right: ${theme.spacing('S8')};
  & > path {
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

export default {
  AddIcon,
  ButtonBar,
  ConfirmDialog,
  Container,
  DelegationContent,
  Title
};
