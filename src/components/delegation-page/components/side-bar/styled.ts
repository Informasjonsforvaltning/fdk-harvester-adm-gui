import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';
import SideMenuBase from '@fellesdatakatalog/side-menu';
import ExpansionPanelBase from '../../../expansion-panel';
import SearchFieldBase from '../../../search-field';

const SideBar = styled('div')`
  margin-left: ${theme.spacing('S16')};
`;

const SideMenu = styled(SideMenuBase)`
  min-width: 100px;
  width: 350px;
  margin-bottom: ${theme.spacing('S24')};
`;

const ExpansionPanel = styled(ExpansionPanelBase)`
  margin-top: ${theme.spacing('S24')};
`;

const SearchField = styled(SearchFieldBase)`
  display: none;
`;

const List = styled.ul`
  & > li:nth-of-type(n + 2) {
    padding-top: ${theme.spacing('S10')};
  }
`;

const ListItem = styled('li')`
  cursor: pointer;

  & > input {
    margin-right: ${theme.spacing('S4')};
  }
`;

export default {
  SideBar,
  SideMenu,
  SearchField,
  ExpansionPanel,
  List,
  ListItem
};
