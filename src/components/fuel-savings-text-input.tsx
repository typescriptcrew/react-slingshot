/* tslint:disable:no-unused-variable */
import * as React from 'react';
import { Component } from 'react';
/* tslint:enable:no-unused-variable */
import { PropTypes } from 'react';

function buildHandleChange(props) {
  return function handleChange(e) {
    props.onChange(props.name, e.target.value);
  };
}

// TODO: get rid of any
const FuelSavingsTextInput: any = (props) => {
  const handleChange = buildHandleChange(props);

  return (
    <input className='small'
      type='text'
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChange} />
  );
};

FuelSavingsTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default FuelSavingsTextInput;
