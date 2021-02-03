import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const LoginPage = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h1 {
    margin-bottom: 20px;
    font-size: ${theme.fontSize('FS24')};
    font-weight: ${theme.fontWeight('FW700')};
  }

  & > p:nth-of-type(n + 2) {
    margin-top: 10px;
  }
`;

export default { LoginPage };
