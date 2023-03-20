import { CCD_DECIMALS } from "../config";

// parse from string like '<3677,0>'
export const parseTokenAddress = addressString => {
  const [, index, subindex] = addressString.match(/<(\d+),(\d+)>/);

  return {
    index: Number(index),
    subindex: Number(subindex),
  };
};

export const checkIfValidNumber = number => !isNaN(number) && isFinite(number);

const fixWithControlledRounding = (value, decimals, rounding) => {
  const factor = 10 ** decimals;
  const method = rounding === "up" ? "ceil" : "floor";

  return Math[method](value * factor) / factor;
};

export const toFixed = (value, decimals = CCD_DECIMALS, rounding) => {
  const formattedValue = rounding
    ? fixWithControlledRounding(value, decimals, rounding)
    : Number(value.toFixed(decimals));

  return checkIfValidNumber(formattedValue) ? formattedValue : 0;
};

export const getTokenRawAmount = (uiAmount, decimals = 6) => uiAmount * 10 ** decimals;

export const getTokenUiAmount = (rawAmount, decimals = 6) =>
  toFixed(rawAmount / 10 ** decimals, decimals);

// from BigInt to params format (string)
export const toParamContractAddress = contractAddress => ({
  index: parseInt(contractAddress.index.toString()),
  subindex: parseInt(contractAddress.subindex.toString()),
});

// from params string to BigInt
export const toBigIntContractAddress = contractAddress => ({
  index: BigInt(contractAddress.index),
  subindex: BigInt(contractAddress.subindex),
});
