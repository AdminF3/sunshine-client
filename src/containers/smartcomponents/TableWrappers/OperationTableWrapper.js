import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';

import UploadFile from '../UploadFile/UploadFile';

import { canEditProject } from '../../../utils/can';

const styles = {
  tableHead: {
    background: 'linear-gradient(0deg, #F4F7FA 0%, #FFFFFF 100%)',
  },
  titlesStyle: {
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#7f8fa4',
    border: '1px solid #E6EAEE',
    whiteSpace: 'unset',
    overflow: 'hidden',
    padding: 0,
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
    backgroundColor: '#fafbfc'
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
    resize: 'vertical',
    '&:focus': {
      outline: 'none',
      border: '1px solid #4D90FE !important',
      boxShadow: ' 0px 0px 5px  #4D90FE !important'
    }
    // borderRight: '1px solid #dfe2e5',
  },
  immutableTableRow: {
    padding: '0px 10px',
    height: '100%',
    borderRight: '1px solid #dfe2e5',
    backgroundColor: '#fafbfc',
    whiteSpace: 'unset',
    overflow: 'hidden',
    textAlign: 'left',
    color: '#354052',
    fontSize: '14px',
    fontWeight: '600',
  },
  mutableTableRow: {
    height: '100%',
    padding: '0px !important',
    borderRight: '1px solid #dfe2e5',
    backgroundColor: '#FFFFFF !important',
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
    tableLayout: 'auto'
  },
  addAdditionalRowStyle: {
    padding: '0',
    float: 'left',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid #E7EAEE',
    backgroundColor: '#F8FAFC',
    marginTop: '6px',
    left: '-13px',
    top: '-29px',
  },
  actionButtonsCell: {
    width: '50px',
    backgroundColor: '#FAFBFC',
    padding: 0,
    borderLeft: '1px solid #E7EAEE',
    borderRight: '1px solid #E7EAEE',
  },
  iconButtonRoot: {
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'yellow'
    },
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
  tooltipBableAddRow: {
    display: 'block',
    padding: 0,
  },
};

class OperationTableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      activeRow: null
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
          {element.name}
        </TableCell>
      );
    });
  };

  renderHeaders = (data, classes) => {
    // We create an empty Matrix that we will need for the Headers
    const rows = [[], []];

    // First we iterate through the columns
    for (let colIndex = 0; colIndex < data[colIndex].headers.length; colIndex++) {
      rows[colIndex].push(<TableCell className={classes.headersStyle} key={98}></TableCell>);
      rows[colIndex].push(<TableCell className={classes.headersStyle} key={99}></TableCell>);
      // Then we iterate through the rows
      for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        // Add a Table Cell JSX element for every entry in the row in the matrix
        rows[colIndex].push(<TableCell className={classes.headersStyle} key={rowIndex}>{data[rowIndex].headers[colIndex]}</TableCell>);
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
            <TableCell classes={{ root: classes.actionButtonsCell }}>
              <IconButton
                variant='contained'
                onClick={() => this.handleDisabled(rowIndex)}
                classes={{ root: classes.iconButtonRoot }}
              >
                <Edit />
              </IconButton>
            </TableCell>
            <TableCell classes={{ root: classes.actionButtonsCell }}>
              <IconButton
                variant='contained'
                onClick={() => data[1].length === 1 ? null : this.deleteRow(rowIndex)}
                classes={{ root: classes.iconButtonRoot }}
              >
                <Delete />
              </IconButton>
            </TableCell>
            {row.map((element, elementIndex) => {
              return (
                (
                  elementIndex === 0
                    ?
                    (
                      this.state.activeRow === rowIndex
                        ?
                        <TableCell style={{ width: `calc(100%/${row.length})` }} classes={{ root: classes.mutableTableRow }} key={elementIndex}>
                          <input
                            type='text'
                            value={this.state.data[1][rowIndex][elementIndex]}
                            onChange={(e) => this.handleChange(e, data, rowIndex, elementIndex)}
                            className={`${classes.tableRowInput} ${classes.prjTableInputField}`}
                          />
                        </TableCell>
                        :
                        <TableCell style={{ width: `calc(100%/${row.length})` }} classes={{ root: classes.immutableTableRow }} key={elementIndex}>
                          {element}
                        </TableCell>
                    )
                    :
                    <TableCell style={{ width: `calc(100%/${row.length})` }} classes={{ root: classes.mutableTableRow }} key={elementIndex}>
                      <textarea
                        type='text'
                        value={this.state.data[1][rowIndex][elementIndex]}
                        onChange={(e) => this.handleChange(e, data, rowIndex, elementIndex)}
                        className={`${classes.tableRowInput} ${classes.prjTableInputField}`}
                      />
                    </TableCell>
                )
              );
            })}
            {this.props.upload &&
              <TableCell style={{ border: 'none' }}>
                <UploadFile
                  table
                  canUpload={true}
                  entity={{
                    id: this.props.singleProject._id,
                    attachments: Object.values(this.props.singleProject._attachments || {}).filter(file => file.comment === row[0]),
                    type: 'project',
                    comment: row[0],
                    uploadType: 'building maintenance milestone'
                  }}
                  onSuccess={this.props.refetch}
                />
              </TableCell>
            }
          </TableRow>
        );
      })
    );
  };

  addAdditionalRow = () => {
    // Create empty array for the new row.
    const newRowTemplate = [];

    // Assign the initial data that we will update
    const dataWithAdditionalRow = this.state.data;

    // Add empty elements in the row
    dataWithAdditionalRow[1][0].forEach(() => newRowTemplate.push(''));

    // Add the new row in the array of rows
    dataWithAdditionalRow[1].push(newRowTemplate);

    this.setState(prevState => {
      return {
        ...prevState,
        data: { ...prevState, ...dataWithAdditionalRow }
      };
    });
  }

  deleteRow = (index) => {
    // Assign the initial data that we will update
    const dataWithDeletedRow = this.state.data;

    // Remove the element coresponding to the index
    dataWithDeletedRow[1].splice(index, 1);

    this.setState(prevState => {
      return {
        ...prevState,
        data: { ...prevState, ...dataWithDeletedRow }
      };
    });
  }

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

  handleDisabled(rowIndex) {
    const activeRow = this.state.activeRow;

    if (activeRow === rowIndex) {
      this.setState({
        activeRow: null
      });
    } else {
      this.setState({
        activeRow: rowIndex
      });
    }
  }

  render() {
    const { classes, data, loggedUserRole, singleProject, handleFormSubmit, user } = this.props;
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
                <TableCell className={classes.titlesStyle}>Edit</TableCell>
                <TableCell className={classes.titlesStyle}>Delete</TableCell>
                {this.renderNames(data[0], classes)}
              </TableRow>
              {headers && headers.map((element, index) => {
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
          {loggedUserRole === 'teme'
            ? null
            : <Button
                variant='contained'
                type='submit'
                label='Save'
                className={classes.tableUpdateButton}
                fullWidth={false}
                disabled={!canEditProject(singleProject, user)}
              >
                Save
              </Button>
          }
        </form>
        <Tooltip className={classes.tooltipBableAddRow} title='Add new row' placement='bottom'>
          <IconButton
            className={classes.addAdditionalRowStyle}
            onClick={this.addAdditionalRow}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(styles)(connect(
  state => ({
    user: state.user,
    singleProject: state.project.singleProject
  }),
)(OperationTableWrapper));
