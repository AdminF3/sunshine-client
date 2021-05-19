import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Paper,
  Tabs,
  Tab,
  makeStyles,
} from '@material-ui/core';
import {
  Info as InfoIcon,
} from '@material-ui/icons';

import UserTooltip from '../../../components/utils/UserTooltip';
import styles from './styles';

const useStyles = makeStyles(styles);

function Tabbable(props) {
  const {
    defaultTab,
    tabs,
    onChange,
    secondaryHeader,
    tooltip,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(defaultTab);

  return (
    <Paper
      square
      className={classes.paper}
    >
      {tooltip && (
        <UserTooltip
          title={tooltip}
          icon={<InfoIcon />}
          placement="top"
          action="click"
        />
      )}
      <div className={classes.tabsWrapper}>
        <Tabs
          value={currentTab}
          onChange={(_, idx) => {
            setCurrentTab(idx);
            onChange(idx);
          }}
          className={classes.navTabs}
        >
          {tabs.map((tab, i) => (
            <Tab
              icon={tab.icon}
              label={tab.labelKey ? t(tab.labelKey) : tab.label}
              key={i}
            />
          ))}
        </Tabs>
      </div>
      {secondaryHeader && (
        <div className={classes.secondaryHeader}>
          {secondaryHeader}
        </div>
      )}
      {props.children}
    </Paper>
  );
}

Tabbable.propTypes = {
  defaultTab: PropTypes.number.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    label: PropTypes.node,
    labelKey: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

Tabbable.defaultProps = {
  defaultTab: 0,
  tabs: [],
  onChange: () => { },
};

export default Tabbable;
