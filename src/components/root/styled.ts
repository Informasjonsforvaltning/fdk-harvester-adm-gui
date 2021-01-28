import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  height: calc(100% - 74px);
  margin-left: 220px;
  padding: 20px;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
  font-size: 130%;
  font-weight: 500;
`;

export default { Root, Heading };
