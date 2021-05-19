import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import {
  NotInterested as NotInterestedIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

import TooltipWrapper from '../utils/TooltipWrapper';
import UserAvatar from '../utils/UserAvatar';
import Widget from '../utils/Widget';
import RoleAssignForm from './RoleAssignForm';
import RoleDeleteForm from './RoleDeleteForm';

const useStyles = makeStyles({
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& > *': {
      margin: '0 3px',
    },
    '& > :first-child': {
      marginLeft: 0,
    },
    '& > :last-child': {
      marginRight: 0,
    },
  },
  avatarsNoPadding: {
    '&:last-child': {
      paddingRight: 0,
    },
  },
  viewOnly: {
    cursor: 'default !important',
  },
  role: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  applyButton: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  locked: {
    cursor: 'default',
    '& > .MuiButtonBase-root': {
      cursor: 'default',
      '&:hover': {
        cursor: 'default',
      },
    },
  },
});

function RolesManager(props) {
  const {
    type,
    title,
    titleButton,
    hint,
    tooltip,
    roles,
    searchUsers,
    foundUsers,
    clearResults,
    refetch,
    refetchLoading,
    viewOnly,
    avatarSize,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  const expandedIndex = roles.findIndex((r) => r.required && r.assigned.length === 0);
  const [expanded, setExpanded] = React.useState(expandedIndex);

  if (viewOnly) {
    return (
      <Widget
        title={title}
        titleButton={titleButton}
        hint={hint}
        tooltip={tooltip}
      >
        {roles.map((role) => (
          <Accordion
            square
            key={role.title}
            expanded={false}
            className={classes.viewOnly}
          >
            <AccordionSummary className={classes.viewOnly}>
              <React.Fragment>
                <div className={classes.role}>
                  <Typography variant="subtitle2">{role.title} </Typography>
                  <AssignedUsersLabel
                    users={role.assigned}
                    multiple={role.multiple}
                    t={t}
                  />
                </div>
                <Avatars
                  users={role.assigned}
                  required={role.required}
                  className={`${classes.avatars} ${classes.avatarsNoPadding}`}
                  size={avatarSize}
                />
              </React.Fragment>
            </AccordionSummary>
          </Accordion>
        ))}
      </Widget>
    );
  }

  return (
    <Widget
      title={title}
      titleButton={titleButton}
      hint={hint}
      tooltip={tooltip}
    >
      {roles.map((role, i) => {
        const onChange = role.locked ? null : () => setExpanded(i !== expanded ? i : null);

        return (
          <TooltipWrapper
            title={role.tooltip}
            key={role.title}
            placement="top"
            disabled={!role.tooltip}
            size="large"
          >
            <Accordion
              square
              key={role.title}
              disabled={role.disabled}
              expanded={expanded === i}
              onChange={onChange}
              className={clsx({ [classes.locked]: role.locked })}
            >
              <AccordionSummary expandIcon={!role.locked && <ExpandMoreIcon />}>
                <React.Fragment>
                  <div className={classes.role}>
                    <Typography variant="subtitle2">{role.title} </Typography>
                    <AssignedUsersLabel
                      users={role.assigned}
                      multiple={role.multiple}
                      t={t}
                    />
                  </div>
                  <Avatars users={role.assigned} required={role.required} className={classes.avatars} />
                </React.Fragment>
              </AccordionSummary>
              <AccordionDetails>
                {expanded === i && role.multiple && (
                  <RoleDeleteForm
                    role={role.title}
                    type={type}
                    users={role.assigned}
                    refetch={refetch}
                    refetchLoading={refetchLoading}
                    mutation={role.deleteMutation}
                    mutationVariables={role.deleteMutationVariables}
                  />
                )}
                <RoleAssignForm
                  role={role.title}
                  type={type}
                  searchUsers={searchUsers}
                  foundUsers={foundUsers}
                  clearResults={clearResults}
                  refetch={refetch}
                  refetchLoading={refetchLoading}
                  mutation={role.assignMutation}
                  mutationVariables={role.assignMutationVariables}
                  variablesResolver={role.assignVariablesResolver}
                />
              </AccordionDetails>
            </Accordion>
          </TooltipWrapper>
        );
      })}
    </Widget>
  );
}

function AssignedUsersLabel({ users, multiple, t }) {
  if (users.length === 0 && !multiple) {
    return (
      <Typography color="error" variant="caption">
        {t('translations:roles.singleAssigned', { count: users.length })}
      </Typography>
    );
  }

  if (users.length === 1) {
    return (
      <Typography variant="caption">
        {users[0].name}
      </Typography>
    );
  }

  return (
    <Typography variant="caption">
      {t('translations:roles.usersAssigned', { count: users.length })}
    </Typography>
  );
}

function Avatars(props) {
  const { users, required, size, className } = props;

  if (!users || users.length === 0) {
    if (required) {
      return (
        <div className={className}>
          <UserAvatar size={size} defaultIcon={NotInterestedIcon} />
        </div>
      );
    }

    return null;
  }

  return (
    <div className={className}>
      {users.map(user => (
        <UserAvatar key={user.ID} size={size} user={user} />
      ))}
    </div>
  );
}

const Accordion = withStyles({
  root: {
    borderTop: '1px solid rgba(0, 0, 0, .12)',
    borderRadius: '0 !important',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    padding: '0 18px 0 18px',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expandIcon: {
    right: 0,
  }
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    padding: '8px 18px 24px 18px',
    flexDirection: 'column',
  },
})(MuiAccordionDetails);

RolesManager.defaultProps = {
  hint: null,
  foundUsers: [],
  viewOnly: false,
  refetchLoading: false,
};

RolesManager.propTypes = {
  type: PropTypes.oneOf(['project', 'organization', 'user']),
  title: PropTypes.node,
  hint: PropTypes.node,
  tooltip: PropTypes.node,
  foundUsers: PropTypes.array.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      required: PropTypes.bool,
      disabled: PropTypes.bool,
      locked: PropTypes.bool,
      multiple: PropTypes.bool,
      assigned: PropTypes.arrayOf(PropTypes.shape({
        ID: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })),
    })
  ),
  refetch: PropTypes.func,
  refetchLoading: PropTypes.bool.isRequired,
  viewOnly: PropTypes.bool.isRequired,
  avatarSize: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default RolesManager;
