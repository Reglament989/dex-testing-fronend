// Utils
import { checkIfValidNumber, getTokenRawAmount, toFixed } from "../../../../utils/format";

// Constants
import { CCD_DECIMALS } from "../../../../config";

export const getFromPerToAmount = (values, exchangeData) => {
  const fromAmount = exchangeData ? exchangeData.ccdBalance : values.from;
  const toAmount = exchangeData ? exchangeData.tokenBalance : values.to;
  const result = fromAmount / toAmount;

  return checkIfValidNumber(result) ? result : 0;
};

export const getToPerFromAmount = (values, exchangeData) => {
  const fromAmount = exchangeData ? exchangeData.ccdBalance : values.from;
  const toAmount = exchangeData ? exchangeData.tokenBalance : values.to;
  const result = toAmount / fromAmount;

  return checkIfValidNumber(result) ? result : 0;
};

export const getPoolShare = (values, exchangeData) => {
  // first liquidity provider
  if (!exchangeData) return 100;

  const rawInputCcd = getTokenRawAmount(values.from, CCD_DECIMALS);
  const exchangeCcdBalance = Number(exchangeData.ccdBalance);

  return toFixed((100 * rawInputCcd) / (rawInputCcd + exchangeCcdBalance), 6);
};
