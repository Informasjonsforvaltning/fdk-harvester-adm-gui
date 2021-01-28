import React, { memo, ChangeEvent, FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

import * as actions from './redux/actions';

import SC from './styled';

import { Delegatee } from '../../types';

interface ExternalProps {
  onDiscard: () => void;
  onSave: (id: string) => void;
}

interface Props extends ExternalProps {
  delegatees: Delegatee[];
  delegatee: Delegatee | null;
  actions: typeof actions;
}

const mapStateToProps = (state: any) => ({
  delegatees: state.DelegationPageReducer.get('delegatees').toJS(),
  delegatee: state.OrganisationFinderReducer.get('delegatee')?.toJS() ?? null
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const delegateeSchema = Yup.object().shape({
  organisationNumber: Yup.string()
    .required('Organisation number is required')
    .matches(/^\d{9}$/, 'Organisation number must be a 9-digit value')
});

const OrganisationFinder: FC<Props> = ({
  delegatees,
  delegatee,
  onDiscard,
  onSave,
  actions: { findOneDelegateeRequested }
}) => {
  const [organisationNumber, setOrganisationNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isEasterEgg] = useState(Math.random() < 0.2);

  const handleInputChange = async (
    e: ChangeEvent<any>,
    name: string,
    setFieldValue: any,
    setFieldTouched: any
  ) => {
    e.persist();
    setOrganisationNumber(e.target.value);
    setErrorMessage(null);
    setFieldValue(name, e.target.value, false);
    setFieldTouched(name);
  };

  const existingDelegatee = delegatees.find(
    ({ id }) => id === organisationNumber
  );

  useEffect(() => {
    if (organisationNumber.length === 9) {
      findOneDelegateeRequested(organisationNumber, message =>
        setErrorMessage(message)
      );
    }

    if (isEasterEgg) {
      setInterval(() => {
        setX(Math.floor(Math.random() * (300 + 1)) - 150);
        setY(Math.floor(Math.random() * (300 + 1)) - 150);
      }, 400);
    }
  }, []);

  return (
    <SC.OrganisationFinder>
      <SC.Modal>
        <SC.ModalHeading>Add delegation permission</SC.ModalHeading>
        <Formik
          initialValues={{
            organisationNumber,
            errorMessage,
            x,
            y,
            isEasterEgg
          }}
          validationSchema={delegateeSchema}
          onSubmit={() => {
            onSave(organisationNumber);
          }}
        >
          {({ errors, touched, setFieldValue, setFieldTouched, isValid }) => (
            <Form>
              <SC.Fieldset>
                <Field
                  type='text'
                  name='organisationNumber'
                  component={TextField}
                  variant='outlined'
                  label='Organisation number'
                  fullWidth
                  inputProps={{
                    maxLength: 9
                  }}
                  error={
                    !!existingDelegatee ||
                    !!errorMessage ||
                    (errors.organisationNumber && touched.organisationNumber)
                  }
                  helperText={
                    touched.organisationNumber &&
                    (errors.organisationNumber ||
                      (existingDelegatee &&
                        'Organisation already has delegation permission') ||
                      errorMessage)
                  }
                  onChange={(e: ChangeEvent<any>) =>
                    handleInputChange(
                      e,
                      'organisationNumber',
                      setFieldValue,
                      setFieldTouched
                    )
                  }
                />
              </SC.Fieldset>
              {!existingDelegatee && !errorMessage && isValid && delegatee ? (
                <SC.SearchResults>
                  <SC.SearchResult>{`${delegatee.name} (${delegatee.id})`}</SC.SearchResult>
                </SC.SearchResults>
              ) : null}
              {isEasterEgg && delegatee ? (
                <SC.EasterEgg x={x} y={y}>
                  <span>{delegatee.name}</span>
                  <span>{delegatee.id}</span>
                  <Button
                    type='button'
                    variant='contained'
                    color='primary'
                    endIcon={<SaveIcon />}
                  >
                    Confirm
                  </Button>
                </SC.EasterEgg>
              ) : null}
              <SC.ModalActions>
                <Button onClick={onDiscard}>Discard</Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  endIcon={<SaveIcon />}
                  disabled={!isValid || !!existingDelegatee || !!errorMessage}
                >
                  Confirm
                </Button>
              </SC.ModalActions>
            </Form>
          )}
        </Formik>
      </SC.Modal>
    </SC.OrganisationFinder>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  connect(mapStateToProps, mapDispatchToProps)
)(OrganisationFinder);
