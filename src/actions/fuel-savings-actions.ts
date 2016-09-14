import * as types from '../constants/action-types';
import {ISettings} from '../business-logic/fuel-savings-calculator';

interface ICalculateFuelSavings {
  type: string;
  settings: ISettings;
  fieldName: string;
  value: string;
}

export function saveFuelSavings(settings: ISettings) {
  return { type: types.SAVE_FUEL_SAVINGS, settings };
}

export function calculateFuelSavings(settings: ISettings, fieldName: string, value: string): ICalculateFuelSavings {
  return { type: types.CALCULATE_FUEL_SAVINGS, settings, fieldName, value };
}
