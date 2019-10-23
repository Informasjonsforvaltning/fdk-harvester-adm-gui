import styled from 'styled-components';

const DataSourceItemEditor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 50px;
  background: rgba(0, 0, 0, 0.8);
  overflow-y: scroll;
  z-index: 1000;
`;

const ModalHeading = styled.h1`
  font-size: 120%;
  font-weight: 500;
`;

const Modal = styled.div`
  position: relative;
  left: 50%;
  width: 600px;
  transform: translate3d(-50%, 0, 0);
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 100px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  & > ${ModalHeading}, & > form > * {
    padding: 20px;
  }

  & > form,
  & > form > *:nth-child(n + 2) {
    border-top: 1px solid #ccc;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;

  & > *:nth-of-type(n + 2) {
    margin-left: 10px;
  }

  & > button[type='submit']:enabled {
    background: #0069a5 !important;
  }
`;

const Fieldset = styled.fieldset`
  & label.Mui-focused:not(.Mui-error),
  & label.Mui-focused > *:not(.Mui-error) {
    color: #0069a5 !important;
  }

  & .MuiInputBase-root.Mui-focused:not(.Mui-error) fieldset,
  & .MuiInputBase-root:not(.Mui-error):hover fieldset {
    border-color: #0069a5 !important;
  }

  & > *:nth-of-type(n + 2) {
    margin-top: 20px;
  }
`;

export default {
  DataSourceItemEditor,
  Modal,
  ModalHeading,
  ModalActions,
  Fieldset
};
