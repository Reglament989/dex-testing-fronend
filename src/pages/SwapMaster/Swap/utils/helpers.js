// Utils
import { toFixed } from "../../../../utils/format";

export const getFromPerToAmount = (values, decimals) => {
  const fromAmount = values.from;
  const toAmount = values.to;

  return toFixed(fromAmount / toAmount, decimals);
};

export const getToPerFromAmount = (values, decimals) => {
  const fromAmount = values.from;
  const toAmount = values.to;

  return toFixed(toAmount / fromAmount, decimals);
};
