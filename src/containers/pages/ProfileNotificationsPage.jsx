import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core';
import {
  Subject as SubjectIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
} from '@material-ui/icons';

import SnackbarNotification from '../smartcomponents/SnackbarNotification';
import NavContainer from '../smartcomponents/navcontainer';
import Tabbable from '../smartcomponents/Tabbable/Tabbable';
import NotificationsList from '../../components/utils/Notifications/NotificationsList';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: 10,
    padding: 20,
    width: '100%',
    '& .MuiListItem-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&:last-child': {
        borderBottom: 0,
      },
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },
  },
}));

function ProfileNotificationsPage(props) {
  const { alerts } = props;
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(window.location.hash === '#seen' ? 1 : 0);
  const { t } = useTranslation('translations');

  return (
    <React.Fragment>
      <Helmet title='User Profile | SUNShINE' />
      <NavContainer formName='profileUpdate' />
      {alerts && alerts.map((a, index) => (
        <SnackbarNotification open alert={a} key={index} />
      ))}

      <div className={classes.root}>
        <Tabbable
          defaultTab={currentTab}
          onChange={idx => {
            window.history.pushState(
              '',
              window.document.title,
              window.location.pathname + (idx === 0 ? '' : '#seen'),
            );

            setCurrentTab(idx);
          }}
          tabs={[
            { label: t('notifications.titleUnread'), icon: <SubjectIcon /> },
            { label: t('notifications.titleRead'), icon: <PlaylistAddCheckIcon /> },
          ]}
        >
          <NotificationsList useWindowScroll seen={currentTab === 1} />
        </Tabbable>
      </div>
    </React.Fragment>
  );
}

export default connect(
  state => ({
    alerts: state.alerts.pending,
  }),
)(ProfileNotificationsPage);
