import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding: 0 20px 20px 20px;
  margin: 0 auto;

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

export default { Root };
