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
  delegatees: state.DelegationsReducer.get('delegatees').toJS(),
  delegatee: state.OrganizationFinderReducer.get('delegatee')?.toJS() ?? null
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const delegateeSchema = Yup.object().shape({
  organizationNumber: Yup.string()
    .required('Organization number is required')
    .matches(/^\d{9}$/, 'Organization number must be a 9-digit value')
});

const OrganizationFinder: FC<Props> = ({
  delegatees,
  delegatee,
  onDiscard,
  onSave,
  actions: { findOneDelegateeRequested }
}) => {
  const [organizationNumber, setOrganizationNumber] = useState('');
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
    setOrganizationNumber(e.target.value);
    setErrorMessage(null);
    setFieldValue(name, e.target.value, false);
    setFieldTouched(name);
  };

  const existingDelegatee = delegatees.find(
    ({ id }) => id === organizationNumber
  );

  useEffect(() => {
    if (organizationNumber.length === 9) {
      findOneDelegateeRequested(organizationNumber, message =>
        setErrorMessage(message)
      );
    }

    if (isEasterEgg) {
      setInterval(() => {
        setX(Math.floor(Math.random() * (300 + 1)) - 150);
        setY(Math.floor(Math.random() * (300 + 1)) - 150);
      }, 400);
    }
  });

  return (
    <SC.OrganizationFinder>
      <SC.Modal>
        <SC.ModalHeading>Add delegation permission</SC.ModalHeading>
        <Formik
          initialValues={{
            organizationNumber,
            errorMessage,
            x,
            y,
            isEasterEgg
          }}
          validationSchema={delegateeSchema}
          onSubmit={() => {
            onSave(organizationNumber);
          }}
        >
          {({ errors, touched, setFieldValue, setFieldTouched, isValid }) => (
            <Form>
              <SC.Fieldset>
                <Field
                  type='text'
                  name='organizationNumber'
                  component={TextField}
                  variant='outlined'
                  label='Organization number'
                  fullWidth
                  inputProps={{
                    maxLength: 9
                  }}
                  error={
                    !!existingDelegatee ||
                    !!errorMessage ||
                    (errors.organizationNumber && touched.organizationNumber)
                  }
                  helperText={
                    touched.organizationNumber &&
                    (errors.organizationNumber ||
                      (existingDelegatee &&
                        'Organization already has delegation permission') ||
                      errorMessage)
                  }
                  onChange={(e: ChangeEvent<any>) =>
                    handleInputChange(
                      e,
                      'organizationNumber',
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
    </SC.OrganizationFinder>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  connect(mapStateToProps, mapDispatchToProps)
)(OrganizationFinder);
