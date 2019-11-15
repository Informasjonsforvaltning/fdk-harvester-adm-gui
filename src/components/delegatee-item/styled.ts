import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const DelegateeItem = styled.li`
  display: flex;
  align-items: center;
  min-height: 130px;
  padding-right: 15px;
  box-shadow: 0 0 0 2px #ccc;
  background: white;

  :nth-of-type(n + 2) {
    margin-top: 15px;
  }
`;

const DelegateeType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  min-width: 140px;
  padding: 15px;
  margin-right: 15px;
  background: #ccc;
  font-size: 110%;
  font-weight: bold;

  & > svg {
    height: 50px;
    width: 50px;
    margin-bottom: 15px;
  }
`;

const DelegateeName = styled.h2`
  margin-bottom: 12px;
  font-size: 110%;
  font-weight: bold;
`;

const DelegateeDetail = styled.div`
  display: flex;

  & > span:first-of-type {
    margin-right: 10px;
    font-weight: bold;
    white-space: nowrap;
  }
`;

const DelegateeDetails = styled.div`
  margin-right: auto;
  padding: 20px 0;

  & > ${DelegateeDetail}:nth-of-type(n+2) {
    margin-top: 12px;
  }
`;

const DelegateeControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 130px;
  margin-left: 20px;
  padding: 15px 0;

  & > button:nth-of-type(n + 2) {
    margin-top: 10px;
  }
`;

const DelegateeGenericButton = styled(Button)`
  .MuiButton-label {
    display: flex;
    justify-content: flex-start;
  }
`;

const DelegateeRemoveButton = styled(DelegateeGenericButton)`
  background: #d70a5a !important;
  color: white !important;
`;

export default {
  DelegateeItem,
  DelegateeType,
  DelegateeName,
  DelegateeDetail,
  DelegateeDetails,
  DelegateeControls,
  DelegateeRemoveButton
};
