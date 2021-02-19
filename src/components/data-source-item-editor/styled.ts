import styled from 'styled-components';
import SelectBase from 'react-select';
import { theme, Colour } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';
import { ErrorMessage as ErrorMessageBase } from 'formik';

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
  display: flex;
  justify-content: space-between;
  font-size: 120%;
  font-weight: 500;
`;

const CloseButton = styled.button`
  width: 18px;
  height: 18px;
  cursor: pointer;
  background: none;
  border: none;
  & > svg {
    width: 100%;
  }
`;

const Modal = styled.div`
  position: relative;
  left: 50%;
  width: 920px;
  transform: translate3d(-50%, 0, 0);
  border-radius: 5px;
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  box-shadow: 0 0 100px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  margin-bottom: 50px;

  & > ${ModalHeading}, & > form > * {
    padding: 20px;
  }

  & > form {
    border-top: 1px solid #ccc;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > *:nth-of-type(n + 2) {
    margin-left: 10px;
  }
`;

const FieldHeader = styled.div`
  border-radius: 4px;
  padding: ${theme.spacing('S10')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  background: ${theme.colour(Colour.NEUTRAL, 'N20')};
  font-size: ${theme.fontSize('FS16')};

  & h2 {
    font-size: ${theme.fontSize('FS20')};
    display: inline-flex;
    margin-bottom: ${theme.spacing('S10')};
  }
`;

const FieldSet = styled.div`
  display: flex;
  flex-direction: column;

  & > input {
    width: 96%;
    margin-top: ${theme.spacing('S24')};
    margin-left: ${theme.spacing('S10')};
    padding: ${theme.spacing('S10')};
    border-radius: 4px;
    border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N50')};
  }

  & > input:focus {
    outline: none;
    box-shadow: 0 0 0 1px ${theme.colour(Colour.NEUTRAL, 'N70')};
  }

  & > *:nth-of-type(n + 2) {
    margin-top: 20px;
  }
`;

const FieldSetShort = styled.div`
  display: flex;
  flex-direction: column;

  & > *:nth-child(2) {
    width: 248px;
    max-width: 248px;
    margin-left: ${theme.spacing('S10')};
    margin-right: ${theme.spacing('S10')};
  }

  & > *:nth-of-type(n + 2) {
    margin-top: 20px;
  }

  & > input {
    padding: ${theme.spacing('S10')};
    border-radius: 4px;
    border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N50')};
    margin: ${theme.spacing('S24')} ${theme.spacing('S10')} 0
      ${theme.spacing('S10')};
  }

  & > input:focus {
    outline: none;
    box-shadow: 0 0 0 1px ${theme.colour(Colour.NEUTRAL, 'N70')};
  }
`;

const Select = styled(SelectBase)`
  margin-left: ${theme.spacing('S10')};
  margin-right: ${theme.spacing('S10')};

  & > div {
    border-color: ${theme.colour(Colour.NEUTRAL, 'N50')};
    padding: 3px;
  }

  & > span + div,
  & > span + div:hover {
    border-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    box-shadow: 0 0 0 1px ${theme.colour(Colour.NEUTRAL, 'N70')};
    cursor: pointer;
  }
`;

const DiscardButton = styled(ButtonBase)`
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};

  &:hover,
  &:focus {
    color: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }
`;

const RequiredLabel = styled.span`
  padding: 2px 8px;
  border-radius: 20px;
  font-size: ${theme.fontSize('FS14')};
  background: ${theme.colour(Colour.NEUTRAL, 'N60')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  margin-left: ${theme.spacing('S10')};
`;

const ErrorMessage = styled(ErrorMessageBase)`
  border-radius: 5px;
  border: none;
  display: flex;
  padding: 1em 1em;
  font-family: ${theme.fontFamily()};
  font-weight: ${theme.fontWeight('FW400')};
  text-decoration: none !important;
  background: ${theme.colour(Colour.RED, 'R20')};
  color: ${theme.colour(Colour.RED, 'R50')};
`;

export default {
  DataSourceItemEditor,
  Modal,
  ModalHeading,
  ModalActions,
  FieldSet,
  FieldSetShort,
  FieldHeader,
  Select,
  RequiredLabel,
  DiscardButton,
  CloseButton,
  ErrorMessage
};
