import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  Button,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';

import { canEditProject } from '../../../utils/can';
import parseTitle from '../../../utils/parseJSONi18n';

const styles = {
  tableHead: {
    background: 'linear-gradient(0deg, #F4F7FA 0%, #FFFFFF 100%)',
    border: '1px solid #E6EAEE'
  },
  titlesStyle: {
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#7f8fa4',
    border: '1px solid #E6EAEE',
    whiteSpace: 'unset',
    overflow: 'hidden',
    '@media screen and (max-width: 960px)': {
      fontSize: '10px',
      padding: '5px !important',
    }
  },
  labelsStyle: {
    height: '100%',
    padding: '0px 10px',
    whiteSpace: 'unset',
    overflow: 'hidden',
    textAlign: 'left',
    color: '#354052',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: '#FFFFFF !important',
    '@media screen and (max-width: 960px)': {
      fontSize: '10px',
      padding: '5px !important',
    }
  },
  headersStyle: {
    padding: '0px 10px',
    whiteSpace: 'unset',
    overflow: 'hidden',
    textAlign: 'left',
    color: '#7f8fa4',
    fontSize: '14px',
    fontWeight: '600',
    borderRight: '1px solid #dfe2e5',
    backgroundColor: '#fafbfc',
    '@media screen and (max-width: 960px)': {
      fontSize: '10px',
      padding: '5px !important',
    }
  },
  tableRowInput: {
    height: '100%',
    padding: '0px 10px',
    whiteSpace: 'unset',
    overflow: 'hidden',
    color: '#354052',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: '#FFFFFF !important',
    textAlign: 'center',
    '@media screen and (max-width: 960px)': {
      fontSize: '10px',
      padding: '5px !important',
    },
    '&:focus': {
      outline: 'none',
      border: '1px solid #4D90FE !important',
      boxShadow: ' 0px 0px 5px  #4D90FE !important'
    }
  },
  immutableTableRow: {
    padding: '0px !important',
    height: '100%',
    borderRight: '1px solid #dfe2e5',
  },
  addingButtonStyle: {
    padding: '0',
    float: 'left',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid #E7EAEE',
    backgroundColor: '#F8FAFC',
    marginTop: '6px',
    left: '-13px',
    top: '-29px'
  },
  tableStyle: {
    tableLayout: 'fixed'
  },
  prjTableInputField: {
    width: '100%',
    minHeight: '51px',
    maxHeight: '147px',
    border: '1px',
    textAlign: 'center',
    '&:focus': {
      outline: 'none',
      border: '1px solid #4D90FE !important',
      boxShadow: ' 0px 0px 5px  #4D90FE !important'
    }
  },
  prjTableFormComponent: {
    marginBottom: '60px',
  },
  tableUpdateButton: {
    float: 'right',
    position: 'relative',
    padding: '0px 30px',
    backgroundColor: '#ffeb3b',
    margin: '10px 0px 30px 0px',
    '&:hover': {
      backgroundColor: '#c7d117',
    },
  },
};

class EnergyTableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // Force re-render after update in the table.
  Rerender = () => {
    this.forceUpdate();
  }

  renderNames = (data, classes) => {
    return data.map((element, index) => {
      return (
        <TableCell className={classes.titlesStyle} key={index}>
          {parseTitle(element.name, this.props.user.language)}
        </TableCell>
      );
    });
  };

  renderHeaders = (data, classes) => {
    // We create an empty Matrix that we will need for the Headers
    const rows = [[], []];

    // First we iterate through the columns
    for (let colIndex = 0; colIndex < data[colIndex].headers.length; colIndex++) {
      // Then we iterate through the rows
      for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        // Add a Table Cell JSX element for every entry in the row in the matrix
        rows[colIndex].push(
          <TableCell className={classes.headersStyle} key={rowIndex}>
            {parseTitle(data[rowIndex].headers[colIndex], this.props.user.language)}
          </TableCell>
        );
      }
    }
    // Return the newly generated matrix of rows and columns for the headers.
    return rows;
  };

  renderBody = (data, classes) => {
    return (
      data[1].map((row, rowIndex) => {
        return (
          <TableRow key={rowIndex}>
            {row.map((element, elementIndex) => {
              return (
                (
                  elementIndex === 0
                    ?
                    <TableCell classes={{ root: classes.immutableTableRow }} key={elementIndex}>
                      <input
                        disabled
                        defaultValue={parseTitle(element, this.props.user.language)}
                        className={`${classes.labelsStyle} ${classes.prjTableInputField}`}
                      />
                    </TableCell>
                    :
                    <TableCell classes={{ root: classes.immutableTableRow }} key={elementIndex}>
                      <input
                        value={parseTitle(this.state.data[1][rowIndex][elementIndex], this.props.user.language)}
                        onChange={(e) => this.handleChange(e, data, rowIndex, elementIndex)}
                        type="text"
                        className={`${classes.tableRowInput} ${classes.prjTableInputField}`}
                      />
                    </TableCell>
                )
              );
            })}
          </TableRow>
        );
      })
    );
  };

  handleChange(e, data, rowIndex, elementIndex) {
    e.persist();

    const dataToSet = [...data];
    dataToSet[1][rowIndex][elementIndex] = e.target.value;

    this.setState(prevState => {
      return {
        ...prevState,
        data: { ...prevState.data, ...dataToSet }
      };
    });
  }

  render() {
    const {
      classes,
      data,
      singleProject,
      handleFormSubmit,
      user,
      disabled,
      t,
    } = this.props;
    const headers = data[0][0].headers;
    const handleFinish = (e, d, id) => {
      e.preventDefault();

      handleFormSubmit(d, id);
    };

    return (
      <div className={classes.prjTableFormComponent}>
        <form onSubmit={(e) => handleFinish(e, data, singleProject._id)}>
          <Table className={classes.tableStyle}>
            <TableHead classes={{ root: classes.tableHead }}>
              <TableRow>
                {this.renderNames(data[0], classes)}
              </TableRow>
              {headers && headers.map((_, index) => {
                return (
                  <TableRow key={index}>
                    {this.renderHeaders(data[0], classes)[index]}
                  </TableRow>
                );
              })}
            </TableHead>
            <TableBody>
              {this.renderBody(data, classes)}
            </TableBody>
          </Table>
          <Button
            variant='contained'
            type='submit'
            label='Save'
            className={classes.tableUpdateButton}
            fullWidth={false}
            disabled={!canEditProject(singleProject, user) || disabled}
          >
            {t('meetings.save')}
          </Button>
        </form>
      </div>
    );
  }
}

export default withTranslation('translations')(withStyles(styles)(connect(
  state => ({
    user: state.user
  }),
)(EnergyTableWrapper)));
