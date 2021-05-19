import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import {
  SaveAlt as SaveIcon
} from '@material-ui/icons';

import { updateMaintenanceRows } from '../../../../actions/projects';
import Input from '../../../utils/Input';

const useStyles = makeStyles({
  row: {
    width: '100%',
  },
  table: {
    marginTop: 16,
    '& .MuiTableCell-sizeSmall': {
      padding: 2,

      '&:first-child': {
        paddingLeft: 0,
      },
      '&:last-child': {
        paddingRight: 0,
      },
    },
    '& .MuiTableBody-root': {
      '& .MuiTableCell-root': {
        position: 'relative',
        borderBottom: 0,
      },
      '& .MuiOutlinedInput-input': {
        padding: 6,
      }
    },
  },
  completedMarker: {
    position: 'absolute',
    left: -3,
    width: 3,
    top: 3,
    bottom: 3,
    backgroundColor: '#27ae60',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: 8,
  },
});

const columns = [
  { id: 'pd', title: 'Planned date', type: 'date' },
  { id: 'dd', title: 'Done date', type: 'date' },
  { id: 'c', title: 'Company responsible for execution' },
  { id: 's', title: 'Status', options: [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'in-progress', label: 'In progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'postponed', label: 'Postponed' },
  ]},
  { id: 'cm', title: 'Comments' },
];

function ActivityTableForm(props) {
  const {
    projectID,
    rows,
    buildingMaintenance,
    setData,
    saveData,
    disabled,
  } = props;

  const data = buildingMaintenance?.data || {};

  const classes = useStyles();
  const { t } = useTranslation('translations');

  return (
    <React.Fragment>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i} className={classes[`status-${data[`${r.id}-s`]}`]}>
              {columns.map((c, j) => {
                const id = `${r.id}-${c.id}`;
                const value = data[id] || '';

                return (
                  <TableCell key={c.id}>
                    {data[`${r.id}-s`] === 'completed' && j === 0 && (
                      <span className={classes.completedMarker} />
                    )}
                    <Input
                      type={c.type}
                      options={c.options}
                      required={false}
                      value={value}
                      onChange={e => setData({ [id]: e.target.value })}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.actionButtons}>
        <Button
          disabled={disabled}
          startIcon={<SaveIcon />}
          variant="contained"
          color="primary"
          onClick={() => saveData(projectID, buildingMaintenance.data)}
        >
          {t('meetings.save')}
        </Button>
      </div>
    </React.Fragment>
  );
}

export default connect(
  state => ({
    project: state.project,
    buildingMaintenance: state.buildingMaintenance,
  }),
  dispatch => ({
    setData: (data) => dispatch({ type: 'BUILDING_MAINTENANCE#SET_DATA', payload: data }),
    saveData: (projectID, data) => dispatch(updateMaintenanceRows(projectID, data)),
  }),
)(ActivityTableForm);
