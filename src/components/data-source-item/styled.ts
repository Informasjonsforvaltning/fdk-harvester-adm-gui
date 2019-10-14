import styled from 'styled-components';

const DataSourceItem = styled.li`
  display: flex;
  align-items: center;
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
  min-width: 120px;
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
  margin-left: 20px;
  padding: 15px 0;

  & > button:nth-of-type(n + 2) {
    margin-top: 10px;
  }
`;

const DatasetItemGenericButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background: #ddd;
  appearance: none;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  > svg {
    margin-right: 10px;
  }
`;

const DatasetItemHarvestButton = styled(DatasetItemGenericButton)`
  :hover,
  :focus {
    background: #007d69;
    color: white;
  }
`;

const DatasetItemEditButton = styled(DatasetItemGenericButton)`
  :hover,
  :focus {
    background: #ffbe3c;
    color: white;
  }
`;

const DatasetItemRemoveButton = styled(DatasetItemGenericButton)`
  :hover,
  :focus {
    background: #d70a5a;
    color: white;
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
  DatasetItemRemoveButton
};
