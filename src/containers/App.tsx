// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FuelSavingsApp from '../components/fuel-savings-app';
import * as FuelSavingsActions from '../actions/fuel-savings-actions';
import {IApplicationState} from '../reducers/fuel-savings';
import {IFuelSavingsAppProps} from '../components/fuel-savings-app';

export interface IActions {
  saveFuelSavings: (state: IApplicationState) => void;
  calculateFuelSavings: (props: IFuelSavingsAppProps, propPropertyName: string, value: string|number) => void;
}

export interface IAppProps {
  actions: IActions;
  fuelSavingsAppState: IApplicationState;
};

const App = (props: IAppProps): JSX.Element => {
  const { fuelSavingsAppState, actions } = props;

  return (
    <FuelSavingsApp fuelSavingsAppState={fuelSavingsAppState} actions={actions} />
  );
};

export default connect(
  (state: IAppProps) => ({ fuelSavingsAppState: state.fuelSavingsAppState }),
  (dispatch) => ({ actions: bindActionCreators(FuelSavingsActions, dispatch) })
)(App as any); // TODO: Get rid of this any.
