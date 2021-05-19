import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import ReactGA from 'react-ga';
import { Mutation } from '@apollo/react-components';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { addAlert } from '../../actions/alerts';
import UserAvatar from '../utils/UserAvatar';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 20,
    '& > *': {
      margin: 5,
    },
    '& > :first-child': {
      marginLeft: 0,
    }
  },
  avatar: {
    marginLeft: '3px !important',
  },
};

const initialState = {
  performFn: null,
  alertText: null,
};

function reducer(state = initialState, payload) {
  switch (payload.type) {
    case 'confirm#show':
      return { performFn: payload.performFn, alertText: payload.alertText };
    case 'confirm#close':
      return { performFn: null, alertText: null };
    default:
      return state;
  }
}

function RoleDeleteForm(props) {
  const {
    role,
    users,
    type,
    mutation,
    mutationVariables,
    refetch,
    refetchLoading,
    showAlert,
    classes,
    t,
  } = props;

  const [{ performFn, alertText }, dispatch] = useReducer(reducer, initialState);

  return (
    <React.Fragment>
      <Mutation
        mutation={mutation}
        onCompleted={refetch}
        onError={() => showAlert(t('translations:errors.internal'))}
      >
        {(removeRole, { loading }) => {
          return (
            <div className={classes.root}>
              {users.map(user => (
                <Chip
                  className="outlinedSecondary"
                  disabled={loading || refetchLoading}
                  key={user.ID}
                  avatar={<UserAvatar size="small" user={user} className={classes.avatar} />}
                  label={user.name}
                  onDelete={() => dispatch({
                    type: 'confirm#show',
                    performFn: () => {
                      ReactGA.event({
                        category: 'Super user',
                        action: type,
                        label: `Remove user with id ${user.ID} from role ${role}`,
                      });

                      removeRole({ variables: { ...mutationVariables, userID: user.ID } });
                    },
                    alertText: t('translations:roles.confirmUnassignUser', { user: user.name, role }),
                  })}
                  variant="outlined"
                />
              ))}
            </div>
          );
        }}
      </Mutation>

      <Dialog
        open={Boolean(performFn)}
        onClose={() => dispatch({ type: 'confirm#close' })}
      >
        <DialogTitle>
          {t('translations:roles.confirmUnassignUserTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => dispatch({ type: 'confirm#close' })}
          >
            {t('translations:utils.confirmDialogCancel')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              performFn();
              dispatch({ type: 'confirm#close' });
            }}
          >
            {t('translations:utils.confirmDialogОК')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

RoleDeleteForm.defaultProps = {
  refetchLoading: false,
};

RoleDeleteForm.propTypes = {
  role: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['project', 'organization', 'user']).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  refetch: PropTypes.func.isRequired,
  refetchLoading: PropTypes.bool.isRequired,
  mutation: PropTypes.object.isRequired,
  mutationVariables: PropTypes.object.isRequired,
};

export default connect(
  null,
  dispatch => ({
    showAlert: message => dispatch(addAlert({ text: message })),
  })
)(withTranslation('translations')(withStyles(styles)(RoleDeleteForm)));
