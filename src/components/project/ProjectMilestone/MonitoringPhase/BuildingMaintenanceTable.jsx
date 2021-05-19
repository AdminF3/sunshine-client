import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tab,
  Tabs,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

import { getMaintenanceRows } from '../../../../actions/projects';
import parseTitle from '../../../../utils/parseJSONi18n';
import { MaintenanceYear } from '../../utils';
import ActivityTableForm from './ActivityTableForm';
import { parseActivitiesRows, parseFrequency } from './utils';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  accordionDetails: {
    flexDirection: 'column',
  },
  actionButtons: {
    position: 'fixed',
    bottom: 10,
    zIndex: 2,
  },
  saveButton: {

  },
  tabs: {
    '& .MuiTab-root': {
      fontSize: '0.75rem',
      textTransform: 'none',
      minWidth: 30,

      '&.Mui-selected': {
        fontWeight: 600,
      },
    },
  },
  yearNumTitle: {
    textTransform: 'uppercase',
    marginRight: 8,
  },
});

function BuildingMaintenanceTable(props) {
  const {
    project,
    user,
    getData,
    disabled,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();
  const lang = user.language;

  const projectID = project?.singleProject?._id;

  useEffect(() => {
    getData(projectID);
  }, [projectID, getData]);

  const numYears = project.singleProject.data.contract_term;
  const periodicTable = [];
  const periodicActivities = (project.annexes.annex4.table1.rows || []).map(d => ({
    type: parseTitle(d[0], lang),
    freq: parseFrequency(d[1]),
  }));

  const midTermActivitiesRows = parseActivitiesRows(project.annexes.annex4.table2.rows || [], ['m'], numYears, lang);
  const longTermActivitiesRows = parseActivitiesRows(project.annexes.annex4.table3.rows || [], ['l'], numYears, lang);

  for (let i = 0; i < numYears; i++) {
    const yearRows = [];

    periodicActivities.forEach((activity, j) => {
      const activityRows = [];
      const keysMap = ['p', i, j];
      for (let k = 0; k < activity.freq.frequency; k++) {
        const id = [...keysMap, k].join('-');
        activityRows.push({ id });
      }

      yearRows.push({ title: activity.type, type: 'table', rows: activityRows });
    });

    periodicTable.push({
      title: <MaintenanceYear project={project.singleProject} year={i} />,
      rows: yearRows
    });
  }

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded className={classes.root}>
        <AccordionSummary>
          <Typography variant="h6">{t('projects.operationAndMaintenance.periodic')}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          {periodicTable.map(({ title, rows }, i) => (
            <Accordion TransitionProps={{ unmountOnExit: true }} key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{title}</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <MaintenanceTabs rows={rows} projectID={projectID} disabled={disabled} />
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h6">{t('projects.operationAndMaintenance.midTerm')}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <MaintenanceTabs
            rows={midTermActivitiesRows}
            projectID={projectID}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h6">{t('projects.operationAndMaintenance.longTerm')}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <MaintenanceTabs
            rows={longTermActivitiesRows}
            projectID={projectID}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function MaintenanceTabs(props) {
  const {
    rows,
    projectID,
    disabled
  } = props;

  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const selectTab = (_, v) => setActiveTab(v);

  return (
    <React.Fragment>
      <Tabs value={activeTab} onChange={selectTab} className={classes.tabs}>
        {rows.map((r, i) => (
          <Tab
            key={i}
            value={i}
            label={r.title}
            style={{ maxWidth: `${100 / rows.length}%` }}
          />
        ))}
      </Tabs>
      {rows.map((r, i) => i === activeTab && (
        <ActivityTableForm key={i} title={r.title} rows={r.rows} projectID={projectID} disabled={disabled} />
      ))}
    </React.Fragment>
  );

}

export default connect(
  state => ({
    project: state.project,
    user: state.user,
  }),
  dispatch => ({
    getData: (projectID) => dispatch(getMaintenanceRows(projectID)),
  })
)(BuildingMaintenanceTable);
