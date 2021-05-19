import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from 'react-select';

import styles from './styles';

const selectComponentStyles = {
  input: (provided) => ({
    ...provided,
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: 30,
  }),
  option: (defaultStyles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...defaultStyles,
      backgroundColor: isDisabled
        ? null
        : isSelected ? 'yellow' : isFocused ? '#FAFFE5' : null,
      color: '#000000',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    };
  },
};

class InputWithValidation extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      error: '',
      dropDownOpen: false,
      searchWord: ''
    };
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  componentDidUpdate() {
    const { setInitialFocus } = this.props;
    if (setInitialFocus) {
      setInitialFocus();
    }
  }

  handleBlur(e) {
    this.handleChange(e);
  }

  validate(value) {
    const { handleEmailInput } = this.props;
    if (!value) {
      const error = 'Field is required!';
      handleEmailInput(error, value);
      this.setState({ error });
      return false;
    }
    this.setState({ error: '' });
    return true;
  }

  handleRequestClose(value) {
    const { handleEmailInput } = this.props;

    const newState = { dropDownOpen: true };
    if (value) {
      newState.value = value.element;
      handleEmailInput(this.state.error, value.element);
    }

    this.props.clearResults();
    this.setState(newState);
  }

  render() {
    const { classes, headline, searchUsers, foundUsers } = this.props;

    const values = foundUsers.map(({ _id, data }, index) => {
      return {
        value: index,
        label: `${data.name} (${data.email})`,
        element: { _id }
      };
    });

    return (
      <div className={`${classes.container} ${this.props.className || ''}`.trim()}>
        <div className={classes.prvAssignRoleTypeLabel}>{headline}</div>
          <div style={{ padding: '0px 20px' }}>
            <Select
              className={classes.selectMenu}
              isSearchable={true}
              styles={selectComponentStyles}
              classNamePrefix="select"
              name="filter"
              options={values}
              onChange={element => this.handleRequestClose(element)}
              onInputChange={element => element !== '' ? searchUsers(element) : ''}
            />
          </div>
      </div>
    );
  }
}

InputWithValidation.defaultProps = {
  foundUsers: [],
};

export default withStyles(styles)(InputWithValidation);
