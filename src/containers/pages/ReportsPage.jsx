import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core';
import {
  Domain as AssetIcon,
  BusinessCenter as OrganizationIcon,
  Equalizer as ProjectIcon,
  Person as UserIcon,
} from '@material-ui/icons';

import { access as hasAccess } from '../../utils/can';
import SnackbarNotification from '../smartcomponents/SnackbarNotification';
import NavContainer from '../smartcomponents/navcontainer';
import Tabbable from '../smartcomponents/Tabbable/Tabbable';
import MarkdownText from '../../components/utils/MarkdownText';
import {
  AssetsReport,
  OrganizationsReport,
  ProjectsReport,
  UsersReport,
} from '../../components/reports';

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

const tabs = [
  {
    hash: '#assets',
    icon: <AssetIcon />,
    labelKey: 'navigation.assets',
    component: AssetsReport,
  },
  {
    hash: '#organizations',
    icon: <OrganizationIcon />,
    labelKey: 'navigation.organizations',
    component: OrganizationsReport,
  },
  {
    hash: '#projects',
    icon: <ProjectIcon />,
    labelKey: 'navigation.projects',
    component: ProjectsReport,
  },
  {
    hash: '#users',
    icon: <UserIcon />,
    labelKey: 'navigation.users',
    component: UsersReport,
    authCheck: { admin: true, countryRole: ['country_admin', 'portfolio_director'] },
  },
];

function ReportsPage(props) {
  const {
    alerts,
    user,
  } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  let tabIndex = 0;
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].hash === window.location.hash) {
      tabIndex = i;
      break;
    }
  }

  const [currentTab, setCurrentTab] = useState(tabIndex);
  const Content = tabs[currentTab].component;

  return (
    <React.Fragment>
      <Helmet title="User Profile | SUNShINE" />
      <NavContainer />
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
              window.location.pathname + tabs[idx].hash,
            );

            setCurrentTab(idx);
          }}
          tabs={tabs.filter(t => !t.authCheck || hasAccess(user, t.authCheck))}
          tooltip={<MarkdownText text={t('tooltips:reports.info', { returnObjects: true })} />}
        >
          <Content />
        </Tabbable>
      </div>
    </React.Fragment>
  );
}

export default connect(
  state => ({
    user: state.user,
    alerts: state.alerts.pending,
  }),
)(ReportsPage);
