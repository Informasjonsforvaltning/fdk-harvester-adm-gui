import styled from 'styled-components';
import Button from '@material-ui/core/Button';

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

const UserAvatar = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    fill: #0069a5;
  }
`;

const UserName = styled.span`
  margin-left: 5px;
  text-transform: capitalize;
`;

const LogoutButton = styled(Button)`
  margin-left: 10px !important;
`;

export default { Header, Logo, UserAvatar, UserName, LogoutButton };
