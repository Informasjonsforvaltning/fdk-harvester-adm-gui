import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import PublicServiceIconBase from '../../images/public-service-icon.svg';

const DataSourceItem = styled.li`
  display: flex;
  align-items: center;
  min-height: 170px;
  padding-right: 15px;
  box-shadow: 0 0 0 2px #ccc;
  background: white;

  :nth-of-type(n + 2) {
    margin-top: 15px;
  }
`;

const DataSourceType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  width: 140px;
  padding: 15px;
  margin-right: 15px;
  background: #ccc;
  font-size: 110%;
  font-weight: bold;
  text-align: center;

  & > svg {
    height: 50px;
    width: 50px;
    margin-bottom: 15px;
  }
`;

const DataSourceDetail = styled.div`
  display: flex;

  & > span:first-of-type {
    width: 120px;
    min-width: 120px;
    margin-right: 10px;
    font-weight: bold;
  }
`;

const DataSourceDetails = styled.div`
  margin-right: auto;
  padding: 20px 0;

  & > ${DataSourceDetail}:nth-of-type(n+2) {
    margin-top: 12px;
  }
`;

const DatasetItemControls = styled.div`
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

const DatasetItemGenericButton = styled(Button)`
  .MuiButton-label {
    display: flex;
    justify-content: flex-start;
  }
`;

const DatasetItemHarvestButton = styled(DatasetItemGenericButton)`
  background: #007d69 !important;
  color: white !important;
`;

const DatasetItemEditButton = styled(DatasetItemGenericButton)`
  background: #ffbe3c !important;
  color: white !important;
`;

const DatasetItemRemoveButton = styled(DatasetItemGenericButton)`
  background: #d70a5a !important;
  color: white !important;
`;

const PublicServiceIcon = styled(PublicServiceIconBase)`
  & > path {
    fill: #0069a5;
  }

  & > path:last-child {
    fill: #c4ebfa;
  }
`;

export default {
  DataSourceItem,
  DataSourceType,
  DataSourceDetail,
  DataSourceDetails,
  DatasetItemControls,
  DatasetItemHarvestButton,
  DatasetItemEditButton,
  DatasetItemRemoveButton,
  PublicServiceIcon
};
