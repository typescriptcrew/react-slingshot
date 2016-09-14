import objectAssign = require('object-assign');
import {SAVE_FUEL_SAVINGS, CALCULATE_FUEL_SAVINGS} from '../constants/action-types';
import calculator from '../business-logic/fuel-savings-calculator';
import dateHelper from '../business-logic/date-helper';
import {ISavings} from '../business-logic/fuel-savings-calculator';

export type milesDrivenTimeframes = 'week'|'month'|'year';

export interface IApplicationState {
  dateModified: Date;
  displayResults: boolean;
  milesDriven: number;
  milesDrivenTimeframe: milesDrivenTimeframes;
  necessaryDataIsProvidedToCalculateSavings: boolean;
  newMpg: number;
  newPpg: number;
  savings: ISavings;
  tradeMpg: number;
  tradePpg: number;
}

export interface IAction {
  type: string;
  fieldName?: string;
  value: string|number;
}

const initialState: IApplicationState = {
  dateModified: null,
  displayResults: false,
  milesDriven: null,
  milesDrivenTimeframe: 'week',
  necessaryDataIsProvidedToCalculateSavings: false,
  newMpg: null,
  newPpg: null,
  savings: {
    annual: 0,
    monthly: 0,
    threeYear: 0
  },
  tradeMpg: null,
  tradePpg: null
};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function fuelSavingsAppState(state = initialState, action: IAction) {
  switch (action.type) {
    case SAVE_FUEL_SAVINGS:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, { dateModified: dateHelper.getFormattedDateTime(new Date()) });

    case CALCULATE_FUEL_SAVINGS:
      const newState = objectAssign({}, state);

      newState[action.fieldName] = action.value;
      newState.necessaryDataIsProvidedToCalculateSavings = calculator.necessaryDataIsProvidedToCalculateSavings(newState);
      newState.dateModified = dateHelper.getFormattedDateTime(new Date());

      if (newState.necessaryDataIsProvidedToCalculateSavings) {
        newState.savings = calculator.calculateSavings(newState);
      }

      return newState;

    default:
      return state;
  }
}
