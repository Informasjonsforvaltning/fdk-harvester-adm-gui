import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const LoginPage = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h1 {
    margin-bottom: 20px;
    font-size: 110%;
    font-weight: bold;
  }

  & > p:nth-of-type(n + 2) {
    margin-top: 10px;
  }
`;

const LoginButton = styled(Button)`
  margin-top: 20px !important;
  background: #0069a5 !important;
  color: white !important;
`;

export default { LoginPage, LoginButton };
