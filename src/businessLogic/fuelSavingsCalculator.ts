import { roundNumber } from './mathHelper';
import NumberFormatter from './numberFormatter';

// TODO: Add all the proper typings and return types.

function calculateMonthlyCost(milesDrivenPerMonth: number, ppg: number, mpg: number) {
  const gallonsUsedPerMonth = milesDrivenPerMonth / mpg;

  return gallonsUsedPerMonth * ppg;
};

// TODO: switch to enum for milesDrivenTimeframe
function calculateMilesDrivenPerMonth(milesDriven: number, milesDrivenTimeframe: string) {
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

function calculateSavings(settings) {
  const monthlySavings = this.calculateSavingsPerMonth(settings);

  return {
    annual: NumberFormatter.getCurrencyFormattedNumber(monthlySavings * 12),
    monthly: NumberFormatter.getCurrencyFormattedNumber(monthlySavings),
    threeYear: NumberFormatter.getCurrencyFormattedNumber(monthlySavings * 12 * 3)
  };
}

function calculateSavingsPerMonth(settings) {
  if (!settings.milesDriven) {
    return 0;
  }

  const milesDrivenPerMonth = this.calculateMilesDrivenPerMonth(settings.milesDriven, settings.milesDrivenTimeframe);
  const tradeFuelCostPerMonth = calculateMonthlyCost(milesDrivenPerMonth, settings.tradePpg, settings.tradeMpg);
  const newFuelCostPerMonth = calculateMonthlyCost(milesDrivenPerMonth, settings.newPpg, settings.newMpg);
  const savingsPerMonth = tradeFuelCostPerMonth - newFuelCostPerMonth;

  return roundNumber(savingsPerMonth, 2);
}

function necessaryDataIsProvidedToCalculateSavings(settings) {
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
