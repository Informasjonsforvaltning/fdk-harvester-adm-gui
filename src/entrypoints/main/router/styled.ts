import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    max-width: 720px;
    width: 100%;
  }

  @media (min-width: 992px) {
    max-width: 960px;
    width: 100%;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
    width: 100%;
  }
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

export default { Title, Container };
