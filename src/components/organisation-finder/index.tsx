import React, { ChangeEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

import * as actions from './redux/actions';

import SC from './styled';

import { Delegatee } from '../../types';

interface Props {
  delegatees: Delegatee[];
  delegatee: Delegatee | null;
  onDiscard: () => void;
  onSave: (id: string) => void;
  actions: typeof actions;
}

interface State {
  organisationNumber: string;
  errorMessage: string | null;
  x: number;
  y: number;
  isEasterEgg: boolean;
}

const delegateeSchema = Yup.object().shape({
  organisationNumber: Yup.string()
    .required('Organisation number is required')
    .matches(/^\d{9}$/, 'Organisation number must be a 9-digit value')
});

class OrganisationFinder extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      organisationNumber: '',
      errorMessage: null,
      x: 0,
      y: 0,
      isEasterEgg: Math.random() < 0.2
    };

    this.saveDelegatee = this.saveDelegatee.bind(this);
    this.changeErrorMessage = this.changeErrorMessage.bind(this); // plz
  }

  public componentDidMount(): void {
    const { isEasterEgg } = this.state;
    if (isEasterEgg) {
      setInterval(() => {
        this.setState({
          x: Math.floor(Math.random() * (300 + 1)) - 150,
          y: Math.floor(Math.random() * (300 + 1)) - 150
        });
      }, 400);
    }
  }

  public componentDidUpdate(_: Props, prevState: State): void {
    const {
      actions: { findOneDelegateeRequested }
    } = this.props;
    const { organisationNumber } = this.state;
    const { organisationNumber: prevOrganisationNumber } = prevState;
    if (
      organisationNumber.length === 9 &&
      organisationNumber !== prevOrganisationNumber
    ) {
      findOneDelegateeRequested(organisationNumber, this.changeErrorMessage);
    }
  }

  private changeErrorMessage(errorMessage: string | null): void {
    this.setState({ errorMessage });
  }

  private saveDelegatee(): void {
    const { onSave } = this.props;
    const { organisationNumber } = this.state;
    onSave(organisationNumber);
  }

  private renderSearchResults(): JSX.Element | null {
    const { delegatee } = this.props;
    return delegatee ? (
      <SC.SearchResults>
        <SC.SearchResult>{`${delegatee.name} (${delegatee.id})`}</SC.SearchResult>
      </SC.SearchResults>
    ) : null;
  }

  private renderEasterEgg(): JSX.Element | null {
    const { delegatee } = this.props;
    const { x, y, isEasterEgg } = this.state;
    return isEasterEgg && delegatee ? (
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
    ) : null;
  }

  public render(): JSX.Element {
    const { onDiscard, delegatees } = this.props;
    const { organisationNumber, errorMessage } = this.state;
    const handleInputChange = async (
      e: ChangeEvent<any>,
      name: string,
      setFieldValue: any,
      setFieldTouched: any
    ) => {
      e.persist();
      this.setState({ organisationNumber: e.target.value, errorMessage: null });
      setFieldValue(name, e.target.value, false);
      setFieldTouched(name);
    };
    const existingDelegatee = delegatees.find(
      ({ id }) => id === organisationNumber
    );
    return (
      <SC.OrganisationFinder>
        <SC.Modal>
          <SC.ModalHeading>Add delegation permission</SC.ModalHeading>
          <Formik
            initialValues={this.state}
            validationSchema={delegateeSchema}
            onSubmit={this.saveDelegatee}
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
                {!existingDelegatee &&
                  !errorMessage &&
                  isValid &&
                  this.renderSearchResults()}
                {this.renderEasterEgg()}
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
  }
}

const mapStateToProps = (state: any) => ({
  delegatees: state.DelegationPageReducer.get('delegatees').toJS(),
  delegatee: state.OrganisationFinderReducer.get('delegatee')
    ? state.OrganisationFinderReducer.get('delegatee').toJS()
    : null
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationFinder);
