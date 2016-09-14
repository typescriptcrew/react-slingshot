/* tslint:disable:no-unused-variable */
import * as React from 'react';
import { Component } from 'react';
/* tslint:enable:no-unused-variable */

export interface IFuelSavingsTextInputProps {
  name: string;
  onChange: (name: string, value: string|number) => void;
  placeholder: string;
  value: string|number;
}

function buildHandleChange(props: IFuelSavingsTextInputProps): (e: React.FormEvent) => void {
  return function handleChange(e: React.FormEvent) {
    props.onChange(props.name, (e.target as HTMLInputElement).value);
  };
}

const FuelSavingsTextInput = (props) => {
  const handleChange = buildHandleChange(props);

  return (
    <input className='small'
      type='text'
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChange} />
  );
};

export default FuelSavingsTextInput;
