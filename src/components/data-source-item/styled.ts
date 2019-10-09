import styled from 'styled-components';

const DataSourceItem = styled.li`
  display: flex;
  align-items: center;
  padding-right: 15px;
  box-shadow: 0 0 0 2px #ccc;
  background: white;
  cursor: pointer;

  :nth-of-type(n + 2) {
    margin-top: 15px;
  }

  :hover {
    box-shadow: 0 0 0 2px #0069a5;
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

const DatasetItemControls = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 15px 0;

  & > button:nth-of-type(n + 2) {
    margin-left: 10px;
  }
`;

const DatasetItemGenericButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;
  border: none;
  border-radius: 5px;
  background: #0069a5;
  color: white;
  appearance: none;
  cursor: pointer;

  > svg {
    height: 70%;
    width: 70%;
  }
`;

const DatasetItemHarvestButton = styled(DatasetItemGenericButton)`
  background: #007d69;
`;

const DatasetItemEditButton = styled(DatasetItemGenericButton)`
  background: #ffbe3c;
`;

const DatasetItemRemoveButton = styled(DatasetItemGenericButton)`
  background: #d70a5a;
`;

export default {
  DataSourceItem,
  DataSourceType,
  DatasetItemControls,
  DatasetItemHarvestButton,
  DatasetItemEditButton,
  DatasetItemRemoveButton
};
