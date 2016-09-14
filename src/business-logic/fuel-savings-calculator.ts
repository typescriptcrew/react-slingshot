import {milesDrivenTimeframes} from '../reducers/fuel-savings';
import { roundNumber } from './math-helper';
import NumberFormatter from './number-formatter';

export interface ISavings {
  annual: string|number;
  monthly: string|number;
  threeYear: string|number;
}

export interface ISettings { // TODO: Better interface name
  // TODO: Get the right types here.
  milesDriven?: number;
  milesDrivenTimeframe?: string;
  tradePpg?: number;
  tradeMpg?: number;
  newPpg?: number;
  newMpg?: number;
}

function calculateMonthlyCost(milesDrivenPerMonth: number, ppg: number, mpg: number): number {
  const gallonsUsedPerMonth = milesDrivenPerMonth / mpg;

  return gallonsUsedPerMonth * ppg;
};

function calculateMilesDrivenPerMonth(milesDriven: number, milesDrivenTimeframe: milesDrivenTimeframes): number {
  const monthsPerYear = 12;
  const weeksPerYear = 52;

  switch (milesDrivenTimeframe) {
    case 'week':
      return (milesDriven * weeksPerYear) / monthsPerYear;

    case 'month':
      return milesDriven;

    case 'year':
      return milesDriven / monthsPerYear;

    default:
      throw 'Unknown milesDrivenTimeframe passed: ' + milesDrivenTimeframe;
  }
}

function calculateSavings(settings): ISavings {
  const monthlySavings = this.calculateSavingsPerMonth(settings);

  return {
    annual: NumberFormatter.getCurrencyFormattedNumber(monthlySavings * 12),
    monthly: NumberFormatter.getCurrencyFormattedNumber(monthlySavings),
    threeYear: NumberFormatter.getCurrencyFormattedNumber(monthlySavings * 12 * 3)
  };
}

function calculateSavingsPerMonth(settings: ISettings): number {
  if (!settings.milesDriven) {
    return 0;
  }

  const milesDrivenPerMonth = this.calculateMilesDrivenPerMonth(settings.milesDriven, settings.milesDrivenTimeframe);
  const tradeFuelCostPerMonth = calculateMonthlyCost(milesDrivenPerMonth, settings.tradePpg, settings.tradeMpg);
  const newFuelCostPerMonth = calculateMonthlyCost(milesDrivenPerMonth, settings.newPpg, settings.newMpg);
  const savingsPerMonth = tradeFuelCostPerMonth - newFuelCostPerMonth;

  return roundNumber(savingsPerMonth, 2);
}

function necessaryDataIsProvidedToCalculateSavings(settings: ISettings): boolean {
  return settings.newMpg > 0
    && settings.tradeMpg > 0
    && settings.newPpg > 0
    && settings.tradePpg > 0
    && settings.milesDriven > 0;
}

const fuelSavingsCalculator = {
  calculateMilesDrivenPerMonth,
  calculateSavings,
  calculateSavingsPerMonth,
  necessaryDataIsProvidedToCalculateSavings
};

export default fuelSavingsCalculator;
