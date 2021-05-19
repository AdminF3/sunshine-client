import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Divider,
  IconButton,
  InputBase,
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
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@material-ui/icons';

import get from '../../../utils/get';
import set from '../../../utils/set';
import parseTitle from '../../../utils/parseJSONi18n';
import parseSpecialSymbols from '../../../utils/parseSpecialSymbols';
import { countriesCountryCodes } from '../../../constants/countries';
import { updateAnnexTable } from '../../../actions/annex';
import Input from '../../utils/Input';
import tables from './tables';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: `${theme.spacing(1)}px 0`,
    display: 'flex',
    flexDirection: 'column',

    '& .control': {
      diplay: 'flex',
      flexDirection: 'row',
    },
    '& .actions': {
      display: 'flex',
      flexDirection: 'row-reverse',
    }
  },
  root: {
    overflow: 'visible',
    '& .MuiTableCell-sizeSmall': {
      padding: 0,
    },
    '& .MuiTableCell-root': {
      border: '1px solid rgba(224, 224, 224, 1)',
      position: 'relative',

      '& > span': {
        display: 'table-cell',
        padding: theme.spacing(0.5),
      },

      '& .MuiInputBase-root': {
        '& input': {
          padding: `0 ${theme.spacing(0.5)}px`
        },

        '& .MuiTypography-root': {
          paddingRight: theme.spacing(0.5),
        },
      },
    },
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root': {
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  },
  removeRowIcon: {
    position: 'absolute',
    right: -theme.spacing(2.8),
    top: theme.spacing(0.5),
    bottom: theme.spacing(0.5),
    width: theme.spacing(3),
    background: '#fff',
    borderRadius: '10%',
    border: `1px solid ${theme.palette.divider}`,

    '&:hover': {
      backgroundColor: '#fafafa',
    },
  },
  hint: {
    fontWeight: 600,
    fontStyle: 'italic',
  },
  sentencize: {
    '&:first-letter': {
      textTransform: 'capitalize',
    },
  },
}));

const kindsInputs = {
  2: {
    inputProps: { type: 'number', min: 0, step: 'any' },
  },
  3: {
    adornment: <Typography color="textSecondary" key="euro" component="span">€</Typography>,
    inputProps: { type: 'number', min: 0, step: 'any' },
  },
  4: {
    adornment: <Typography color="textSecondary" key="m3" component="span">°C</Typography>,
    inputProps: { type: 'number', min: 0, step: 'any' },
  },
  5: {
    inputProps: { type: 'number', min: 0, step: 'any' },
  },
  6: {
    adornment: <Typography color="textSecondary" key="m3" component="span">m³</Typography>,
    inputProps: { type: 'number', min: 0, step: 'any' },
  },
  7: {
    adornment: <Typography color="textSecondary" key="mwh" component="span">MWh</Typography>,
    inputProps: { type: 'number', min: 0, step: 'any' },
  },
  8: {
    adornment: <Typography color="textSecondary" key="m2" component="span">㎡</Typography>,
    inputProps: { type: 'number', min: 0, step: 'any' },
  },
};

const specialSymbolRe = /[_|^|$]\{?(.*?)\}?\$?/;

function ContractTable(props) {
  const {
    project,
    table,
  } = props;

  if (!project) {
    return null;
  }

  const config = tables[table];
  if (!config) {
    return null;
  }

  if (Array.isArray(config)) {
    return config.map((c, i) => <I18nTable {...props} config={c} key={i} />);
  }

  return <I18nTable {...props} config={config} />;
}

ContractTable.propTypes = {
  table: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  component: PropTypes.elementType,
};

ContractTable.defaultProps = {
  component: Paper,
};

function I18nTable(props) {
  const {
    project,
    language,
    update,
    config,
    disabled,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation('translations');
  const [rowsData, setRowsData] = useState(null);
  const formRef = useRef();

  const keyParts = config.key.split('.');
  const data = get(project.annexes, keyParts);

  if (!data || Object.keys(data).length < 1) {
    return null;
  }

  if (rowsData === null || JSON.stringify(data.rows) !== JSON.stringify(rowsData)) {
    setRowsData(data.rows);
  }

  if (!rowsData) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const entries = formData.entries();
    const d = { rows: rowsData.slice() };
    for (const [idxs, value] of entries) {
      const idxParts = idxs.split('-');
      if (idxParts[1].match(/^title[0-9]+$/)) {
        if (!d.title) {
          d.title = value;
          continue;
        }
        d.title = `${d.title} ${value}`;
        continue;
      }

      set(d.rows, idxParts, value);
    }

    update({
      projectID: project.singleProject._id,
      path: config.path,
      storeAnnexKey: keyParts[0],
      storeAnnexTableKey: keyParts[1],
      data: d,
    });
  };

  const addRow = () => {
    const nd = rowsData.slice().concat([(new Array(config.legend.length).fill('')) ]);
    setRowsData(nd);
  };

  const removeRow = (i) => {
    const nd = rowsData.slice();
    nd.splice(i, 1);
    setRowsData(nd);
  };

  const country = language === 'english' ? 'England' : project?.singleProject?.data.country;
  const loc = country in countriesCountryCodes ? countriesCountryCodes[country].toLowerCase() : 'en';
  const headersLength = data.columns.find(c => Boolean(c.headers))?.headers.length;
  return (
    <TableContainer component={props.component} className={classes.root}>
      <form
        action={window.location.href}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Title
          config={config}
          data={data}
          annexesData={project.annexes}
        />

        <Table size="small">
          <TableHead>
            <TableRow>
              {data.columns && data.columns.map((c, i) => {
                return (
                  <TableCell key={i}>
                    <CellTitle title={c.name} loc={loc} />
                  </TableCell>
                );
              })}
            </TableRow>
            {headersLength && data.columns && (new Array(headersLength)).fill(null).map((_, i) => (
              <TableRow key={i}>
                {data.columns && data.columns.map((c, j) => {
                  return (
                    <TableCell key={j}>
                      <CellTitle title={c.headers?.[i] || ''} loc={loc} />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rowsData.map((r, i) => {
              const canEditRow = config.fixedRowsNum <= i;
              const disabledInputs = config.disabledInputRows?.indexOf(i) > -1;

              return (
                <TableRow key={i}>
                  {r.map((c, j) => {
                    const canEditCell = config.legend[j] === '\\' || (!disabledInputs && (
                      config.legend[j] === '/' || (config.legend[j] === '//' && canEditRow)
                    ));
                    const endAdornments = [];
                    let inputProps;
                    if (j + 1 === r.length && canEditRow) {
                      endAdornments.push(
                        <IconButton
                          key="del"
                          size="small"
                          className={classes.removeRowIcon}
                          onClick={() => removeRow(i)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      );
                    }
                    if (data.columns[j]?.kind in kindsInputs) {
                      if (kindsInputs[data.columns[j].kind].adornment) {
                        endAdornments.push(kindsInputs[data.columns[j].kind].adornment);
                      }
                      if (kindsInputs[data.columns[j].kind].inputProps) {
                        inputProps = kindsInputs[data.columns[j].kind].inputProps;
                      }
                    }

                    const inputID = `${i}-${j}`;
                    return (
                      <TableCell key={inputID}>
                        <CellWrapper
                          value={c}
                          loc={loc}
                          withInput={canEditCell}
                          endAdornment={<React.Fragment>{endAdornments}</React.Fragment>}
                          inputProps={{ ...inputProps, name: inputID, id: inputID }}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className={classes.footer}>
          {config.addRows && (
            <div className="control">
              <Button size="small"
                startIcon={<AddIcon />}
                variant="outlined"
                disableElevation
                onClick={addRow}
                disabled={disabled}
              >
                {t('utils.addRow')}
              </Button>
            </div>
          )}
          <div className="actions">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={disabled}
            >
              {t('meetings.save')}
            </Button>
          </div>
        </div>
      </form>
    </TableContainer>
  );
}

const useCellWrapperStyles = makeStyles({
  noInputWrapper: {
    display: 'flex !important',
    justifyContent: 'space-between',
    '& > span:first-child': {
      minWidth: 16,
    },
  },
});

function CellWrapper(props) {
  const {
    value,
    loc,
    withInput,
    endAdornment,
    inputProps,
  } = props;

  const classes = useCellWrapperStyles();

  let v = parseTitle(value, loc);
  if (!withInput) {
    if (v.match(specialSymbolRe)) {
      v = parseSpecialSymbols(v);
    }
    return (
      <span className={classes.noInputWrapper}>
        <span dangerouslySetInnerHTML={{ __html: v }} />
        {endAdornment}
      </span>
    );
  }

  return (
    <InputBase
      defaultValue={value}
      endAdornment={endAdornment}
      inputProps={inputProps}
      onKeyDown={(e) => {
        if (inputProps.type !== 'number') {
          return;
        }
        // e.keyCode 69 is the "e" key on the keyboard, which
        // is valid as number input can accept floating-point numbers,
        // including negative symbols and the e or E character.
        if (e.keyCode === 69) {
          e.preventDefault();
        }
      }}
      fullWidth
    />
  );
}

CellWrapper.propTypes = {
  endAdornment: PropTypes.node,
};

CellWrapper.defaultProps = {
  endAdornment: null,
};

function CellTitle(props) {
  const { title, headers, loc } = props;

  let n = parseTitle(title, loc);
  if (n.match(specialSymbolRe)) {
    n = parseSpecialSymbols(n);
  }

  if (!headers) {
    return <span dangerouslySetInnerHTML={{ __html: n }} />;
  }
  return (
    <span>
      <span dangerouslySetInnerHTML={{ __html: n }} />
      <Divider />
      {headers.map((h, i) => {
        let ct = parseTitle(h, loc);
        if (ct.match(specialSymbolRe)) {
          ct = parseSpecialSymbols(ct);
        }
        return (
          <React.Fragment key={i}>
            <span dangerouslySetInnerHTML={{ __html: ct }} />
            <br />
          </React.Fragment>
        );
      })}
    </span>
  );
}

function Title(props) {
  const {
    config,
    data,
    annexesData,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation('translations');

  let subtitle = null;
  if (config.titleStoreKey) {
    subtitle = get(annexesData, config.titleStoreKey.split('.'));
  }

  return (
    <React.Fragment>
      {config.title && (
        <Typography variant="h5" gutterBottom className={classes.sentencize}>
          {t(...(typeof config.title === 'string' ? [config.title] : config.title))}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="subtitle2" component="p" gutterBottom>
          {subtitle}
        </Typography>
      )}
      {config.hint && (
        <Typography variant="caption" component="p" gutterBottom className={classes.hint}>
          {t(config.hint)}
        </Typography>
      )}
      {config.titleInput && (
        <Input
          {...config.titleInput.inputProps}
          value={data[config.titleInput.key]}
        />
      )}
    </React.Fragment>
  );
}

export default connect(
  (state) => ({
    project: state.project,
  }),
  (dispatch) => ({
    update: (params) => dispatch(updateAnnexTable(params)),
  })
)(ContractTable);
