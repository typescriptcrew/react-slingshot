// TODO: Clean up this function
export function roundNumber(numberToRound = 0, numberOfDecimalPlaces = 0): number {
  if (numberToRound === null) {
    return 0;
  }

  return numberToRound === 0 ? 0 : Math.round(numberToRound * Math.pow(10, numberOfDecimalPlaces)) / Math.pow(10, numberOfDecimalPlaces);
}

