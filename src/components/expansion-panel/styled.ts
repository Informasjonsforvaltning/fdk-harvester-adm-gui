import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const Panel = styled('div')`
  background: ${theme.colour(Colour.NEUTRAL, 'N30')};
  border-radius: 5px;
  margin-bottom: ${theme.spacing('S10')};
  padding-top: 10px;
`;

const Header = styled('div')`
  font-weight: ${theme.fontWeight('FW700')};
  font-size: ${theme.fontSize('FS20')};
  padding: 5px 20px;

  &:hover {
    cursor: pointer;
  }
`;

const Content = styled('div')`
  padding: ${theme.spacing('S16')} ${theme.spacing('S16')};
`;

export default { Panel, Header, Content };
