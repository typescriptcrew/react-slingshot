/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import FuelSavingsResults from './fuel-savings-results';
import FuelSavingsTextInput from './fuel-savings-text-input';
import {IApplicationState} from '../reducers/fuel-savings';
import {IActions} from '../containers/App';

export interface IFuelSavingsAppProps {
  actions: IActions;
  fuelSavingsAppState: IApplicationState;
};

const FuelSavingsApp = (props: IFuelSavingsAppProps): JSX.Element => {
  const save = function () {
    props.actions.saveFuelSavings(props.fuelSavingsAppState);
  };

  const onTimeframeChange: React.EventHandler<React.FormEvent> = function (e: React.FormEvent): void {
    props.actions.calculateFuelSavings(props, 'milesDrivenTimeframe', (e.target as HTMLInputElement).value);
  };

  const fuelSavingsKeypress = function (name: string, value): void {
    props.actions.calculateFuelSavings(props, name, value);
  };

  const settings = props.fuelSavingsAppState;

  return (
    <div>
      <h2>Fuel Savings Analysis</h2>
      <table>
        <tbody>
        <tr>
          <td><label htmlFor='newMpg'>New Vehicle MPG</label></td>
          <td><FuelSavingsTextInput onChange={fuelSavingsKeypress} name='newMpg' value={settings.newMpg} /></td>
        </tr>
        <tr>
          <td><label htmlFor='tradeMpg'>Trade-in MPG</label></td>
          <td><FuelSavingsTextInput onChange={fuelSavingsKeypress} name='tradeMpg' value={settings.tradeMpg} /></td>
        </tr>
        <tr>
          <td><label htmlFor='newPpg'>New Vehicle price per gallon</label></td>
          <td><FuelSavingsTextInput onChange={fuelSavingsKeypress} name='newPpg' value={settings.newPpg} /></td>
        </tr>
        <tr>
          <td><label htmlFor='tradePpg'>Trade-in price per gallon</label></td>
          <td><FuelSavingsTextInput onChange={fuelSavingsKeypress} name='tradePpg' value={settings.tradePpg} /></td>
        </tr>
        <tr>
          <td><label htmlFor='milesDriven'>Miles Driven</label></td>
          <td>
            <FuelSavingsTextInput onChange={fuelSavingsKeypress} name='milesDriven' value={settings.milesDriven} /> miles per
            <select name='milesDrivenTimeframe' onChange={onTimeframeChange} value={settings.milesDrivenTimeframe}>
              <option value='week'>Week</option>
              <option value='month'>Month</option>
              <option value='year'>Year</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label>Date Modified</label></td>
          <td>{settings.dateModified}</td>
        </tr>
        </tbody>
      </table>

      <hr/>

      {settings.necessaryDataIsProvidedToCalculateSavings ? <FuelSavingsResults savings={settings.savings} /> : null}
      <input type='submit' value='Save' onClick={save} />
    </div>
  );
};

export default FuelSavingsApp;
