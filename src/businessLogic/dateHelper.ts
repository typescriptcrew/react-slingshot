// See tests for desired format.
function getFormattedDateTime(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:\
${this.padLeadingZero(date.getMinutes())}:${this.padLeadingZero(date.getSeconds())}`;
}

function padLeadingZero(value: number): string {
  return `${value > 9 ? value : '0' + value}`;
}

const dateHelper = {
  getFormattedDateTime,
  padLeadingZero
};

export default dateHelper;
