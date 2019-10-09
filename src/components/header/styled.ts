import styled from 'styled-components';

import FdkLogo from '../../images/fdk-admin-logo.svg';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 74px;
  width: 100%;
  padding: 10px 20px;
  background: white;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 0 10px -5px #ccc;
  z-index: 1000;
`;

const Logo = styled(FdkLogo)`
  height: 100%;
`;

export default { Header, Logo };
