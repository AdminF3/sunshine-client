import React, { Component } from 'react';
import Select from 'react-select';

class CustomSelect extends Component {
  customStyles = {
    input: (provided) => ({
      ...provided,
      display: 'none',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: this.props.backgroundColor || 'initial'
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '30px',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: this.props.backgroundColor ? 14 : 'initial',
      color: this.props.backgroundColor ? 'darkgrey' : 'initial',
    }),
    menuList: (provided) => ({
      ...provided,
      textAlign: 'start',
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? 'null'
          : isSelected ? null : isFocused ? '#FAFFE5' : null,
        color: '#000000',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      };
    },
  }
  render() {
    const {
      className,
      options,
      value,
      handleChange,
      defaultValue,
      isSearchable,
      styles,
      refs,
      placeholder,
    } = this.props;
    return (
      <Select
        isSearchable={isSearchable}
        className={className}
        styles={styles ? styles : this.customStyles}
        classNamePrefix="select"
        defaultValue={defaultValue}
        name="filter"
        options={options}
        value={value}
        onChange={handleChange}
        ref={refs}
        placeholder={placeholder ? placeholder : 'Select...'}
      />
    );
  }
}

CustomSelect.defaultProps = {
  disabled: false,
};

export default CustomSelect;
