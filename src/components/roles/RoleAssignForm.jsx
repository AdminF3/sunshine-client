import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReactGA from 'react-ga';
import { Mutation } from '@apollo/react-components';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HowToRegIcon from '@material-ui/icons/HowToReg';

import InputWithValidation from '../organization/OrganizationInputWithValidation/OrganizationInputWithValidation';

const styles = {
  form: {
    width: '100%',
  },
  inputs: {
    '& > div > div': {
      marginLeft: 0,
      paddingLeft: '0 !important',
    },
  },
  buttons: {
    '& button': {
      marginTop: 16,
    },
  },
};

function RoleAssignForm(props) {
  const {
    role,
    type,
    searchUsers,
    foundUsers,
    clearResults,
    refetch,
    refetchLoading,
    mutation,
    mutationVariables,
    variablesResolver,
    classes,
    t,
  } = props;

  const [userID, setUserID] = useState(null);
  const [error, setError] = useState(null);

  return (
    <Mutation
      mutation={mutation}
      onCompleted={refetch}
      onError={() => setError(t('translations:errors.internal'))}
    >
      {(assignUser, { loading }) => {
        return (
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              if (!userID) {
                setError(t('translations:organizations.requiredUser'));
                return;
              }

              ReactGA.event({
                category: 'Super user',
                action: type,
                label: `Assign user with id ${userID} to role ${role}`,
              });

              assignUser({ variables: { ...mutationVariables, ...variablesResolver(userID) } });

            }}
            action={window.location}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={8} className={classes.inputs}>
                <InputWithValidation
                  className={classes.inputWithValidation}
                  name="userEmail"
                  type="email"
                  headline={t('translations:projects.searchUser')}
                  handleEmailInput={(error, u) => {
                    setUserID(u._id);
                    setError(error || null);
                  }}
                  searchUsers={searchUsers}
                  foundUsers={foundUsers}
                  clearResults={clearResults}
                />
              </Grid>
              <Grid item xs={4} className={classes.buttons}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className={classes.button}
                  disabled={loading || refetchLoading}
                  fullWidth
                >
                  {t('translations:projects.assign')}
                  <HowToRegIcon className={classes.buttonIcon} />
                </Button>
              </Grid>
            </Grid>

            {error && (
              <Typography color="error" className={classes.error}>{error}</Typography>
            )}
          </form>
        );
      }}
    </Mutation>
  );
}

RoleAssignForm.defaultProps = {
  mutationVariables: {},
  refetchLoading: false,
  variablesResolver: (userID) => ({ userID }),
};

RoleAssignForm.propTypes = {
  role: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['project', 'organization', 'user']).isRequired,
  searchUsers: PropTypes.func.isRequired,
  foundUsers: PropTypes.array.isRequired,
  clearResults: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  refetchLoading: PropTypes.bool.isRequired,
  mutation: PropTypes.object.isRequired,
  mutationVariables: PropTypes.object.isRequired,
  variablesResolver: PropTypes.func.isRequired,
};

export default withTranslation('translations')(withStyles(styles)(RoleAssignForm));
