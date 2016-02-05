// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FuelSavingsApp from '../components/FuelSavingsApp';
import * as FuelSavingsActions from '../actions/fuelSavingsActions';

const App: any = (props) => {
  const { fuelSavingsAppState, actions } = props;

  return (
    <FuelSavingsApp fuelSavingsAppState={fuelSavingsAppState} actions={actions} />
  );
};

App.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavingsAppState: PropTypes.object.isRequired
};

export default connect(
  state => ({ fuelSavingsAppState: state.fuelSavingsAppState }),
  dispatch => ({ actions: bindActionCreators(FuelSavingsActions, dispatch) })
)(App);
