import { Constants } from "./Constants";

export const NumberUtils = {
  formatNumber: _formatNumber,
  ceilingNumberByDecimal: _ceilingNumberByDecimal,
  isNumberExist: _isNumberExist,
  removeDecimal: _removeDecimal,
  formatNumberWithoutComma: _formatNumberWithoutComma,
  convertToNumber: _convertToNumber,
};

/**
 * Format number
 *
 * @param nb number need to format
 * @param decimal number decimal after comma character
 * @param removeZeroDecimal clear zero number after comma character
 * @param unit unit of number
 */
function _formatNumber(
  nb: number,
  decimal: number = 2,
  removeZeroDecimal: boolean = true,
  unit: string = ""
) {
  // removeZeroDecimal = removeZeroDecimal || false;
  // decimal = decimal === undefined || decimal === null ? 2 : decimal;

  if (_isNumberExist(nb)) {
    let decimalNumberRemove = ".";
    for (let i = 0; i < decimal; i++) {
      decimalNumberRemove += "0";
    }

    return (
      nb
        .toFixed(decimal)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        .replace(removeZeroDecimal ? decimalNumberRemove : "", "") + unit
    );
  } else {
    return Constants.EMPTY_VALUE_DEFAULT;
  }
}

function _formatNumberWithoutComma(
  nb: number,
  decimal: number = 2,
  removeZeroDecimal: boolean = true,
  unit: string = "",
) {
  // removeZeroDecimal = removeZeroDecimal || false;
  // decimal = decimal === undefined || decimal === null ? 2 : decimal;

  if (_isNumberExist(nb)) {
    let decimalNumberRemove = ".";
    for (let i = 0; i < decimal; i++) {
      decimalNumberRemove += "0";
    }

    return (
      nb
        .toFixed(decimal)
        .toString()
        .replace(removeZeroDecimal ? decimalNumberRemove : "", "") + unit
    );
  } else {
    return Constants.EMPTY_VALUE_DEFAULT;
  }
}

function _ceilingNumberByDecimal(maxValue: number): number {
  let numberToRound = 1;
  let currentMax = maxValue;
  while (currentMax / 10 > 10) {
    numberToRound++;
    currentMax = currentMax / 10;
  }
  const numToRoundTo = 10 ** numberToRound;
  return Math.ceil(maxValue / numToRoundTo) * numToRoundTo;
}

function _isNumberExist(value: any): boolean {
  return typeof value === "number" && !isNaN(+value);
}

function _removeDecimal(value: any): any {
  if (typeof value === "number") {
    return Math.round(value);
  }
  return value;
}
function _convertToNumber(value: any) {
  if (typeof value === "string") {
    return value.length ? +value : null;
  } else if (typeof value === "number") {
    return value;
  }
  return null;
}
