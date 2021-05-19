import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';
import {
  GetApp as DownloadIcon,
} from '@material-ui/icons';

import { compile as compileCSV } from '../../utils/csv';
import { download } from '../../utils/browser';

const useStyles = makeStyles(theme => ({
  checkboxesWrapper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    marginBottom: theme.spacing(2),
  },
  exportButtonWrapper: {
    margin: `${theme.spacing(1)}px 0`,
  },
  contentList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  tableCell: {
    whiteSpace: 'pre'
  }
}));

function DataTable(props) {
  const {
    data,
    fields,
    fieldsEnabled,
    csvFilename,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  const [activeFields, setActiveFields] = useState(fieldsEnabled);
  const setFieldEnabled = (field, enabled) => {
    if (enabled) {
      setActiveFields(activeFields.concat([field]));
    } else {
      setActiveFields(activeFields.slice().filter(v => v !== field));
    }
  };

  const chunkSize = Math.ceil(fields.length / 4);
  const fieldsChunked = [].concat.apply([],
    fields.map(function(elem, i) {
      return i % chunkSize ? [] : [fields.slice(i, i + chunkSize)];
    })
  );

  const hasData = data.length > 0;

  return (
    <React.Fragment>
      <Grid
        container
        component={Paper}
        className={classes.checkboxesWrapper}
      >
        {fieldsChunked.map((chunk, i) => (
          <Grid item sm={3} xs={6} key={i}>
            <FormGroup>
              {chunk.map(f => (
                <FormControlLabel
                  key={f.key}
                  control={
                    <Checkbox
                      checked={activeFields.indexOf(f.key) !== -1}
                      color="primary"
                      onChange={(e) => setFieldEnabled(f.key, e.target.checked)}
                    />
                  }
                  label={t(f.titleKey)}
                />
              ))}
            </FormGroup>
          </Grid>
        ))}

        <Grid item xs={12} align="right" className={classes.exportButtonWrapper}>
          <DownloadButton
            data={data}
            fields={fields}
            activeFields={activeFields}
            csvFilename={csvFilename}
            disabled={!hasData}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {fields.map((f, i) => activeFields.indexOf(f.key) !== -1 && (
                <TableCell align={i === 0 ? 'left' : 'right'} key={f.key}>
                  {t(f.titleKey)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!hasData && (
              <TableRow >
                <TableCell colSpan={2}>{t('assets.noResultsFound')}</TableCell>
              </TableRow>
            )}
            {data.map(d => (
              <TableRow key={d.ID}>
                {fields.map((f, i) => activeFields.indexOf(f.key) !== -1 && (
                  <TableCell className={classes.tableCell} key={f.key} align={i === 0 ? 'left' : 'right'}>
                    <CellContent field={f.key}>{d[f.key]}</CellContent>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

function DownloadButton(props) {
  const {
    data,
    fields,
    activeFields,
    csvFilename,
    disabled,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');

  const [anchorEl, setAnchorEl] = useState(null);
  const closeMenu = () => setAnchorEl(null);

  const performDownload = (extension, mimeType) => {
    const csvHeaderFields = fields.map(
      f => activeFields.indexOf(f.key) > -1 ? { key: f.key, title: t(f.titleKey) } : null
    ).filter(v => Boolean(v));

    const csvString = compileCSV(csvHeaderFields, data);
    const filename = `${csvFilename}-${new Date().toLocaleDateString()}.${extension}`;
    download(csvString, { filename, type: mimeType });
    closeMenu();
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        className={classes.exportButton}
        onClick={e => setAnchorEl(e.target)}
        disabled={disabled}
      >
        {t('navigation.export')}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        keepMounted
      >
        <MenuItem
          component={Button}
          endIcon="xls"
          startIcon={<DownloadIcon />}
          onClick={() => performDownload('xls', 'application/vnd.ms-excel')}
        >
          <Typography variant="inherit">{t('utils.download')}</Typography>
        </MenuItem>
        <MenuItem
          component={Button}
          endIcon="csv"
          startIcon={<DownloadIcon />}
          onClick={() => performDownload('csv', 'text/csv')}
        >
          <Typography variant="inherit">{t('utils.download')}</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

DownloadButton.defaultProps = { disabled: false };

function CellContent(props) {
  const { field, children } = props;
  const classes = useStyles();

  if (Array.isArray(children)) {
    return (
      <ul className={classes.contentList}>
        {children.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    );
  }

  if (['registered', 'createdAt'].indexOf(field) > -1) {
    return new Date(children).toLocaleString().split(',')[0];
  }

  // If displaying `vat`, but this is field from Residents
  // Community organization - don't display the system
  // generated VAT.
  if (['vat', 'registrationNumber'].indexOf(field) > -1 && children.indexOf('RC_') === 0) {
    return '';
  }

  return children;
}

CellContent.defaultProps = { children: '' };

DataTable.defaultProps = {
  data: [],
  fields: [],
  fieldsEnabled: [],
  csvFilename: 'export',
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.string.isRequired,
  })).isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    titleKey: PropTypes.string.isRequired,
  })).isRequired,
  fieldsEnabled: PropTypes.arrayOf(PropTypes.string),
};

export default DataTable;
