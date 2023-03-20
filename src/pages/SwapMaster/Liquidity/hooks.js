import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Utils
import { getLiquidityBalances } from "./utils";
import { getMaxCcdAmount } from "../Swap/utils";
import { getTokenRawAmount, getTokenUiAmount, toFixed } from "../../../utils/format";
import { getExchanges } from "../utils";

// Actions
import { setLiquidityActiveWindow } from "../../../store/reducers/SwapMaster/liquiditySlice";

// Constants
import { LIQUIDITY_FORM_FIELDS, LIQUIDITY_WINDOWS } from "./constants";
import { CCD_DECIMALS } from "../../../config";

export const useLiquidityDataUpdate = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector(s => !!s.connect.account);
  const liquidityTokenTo = useSelector(s => s.liquidity.tokenTo);

  useEffect(() => {
    if (!isConnected) return;

    dispatch(getLiquidityBalances());
  }, [dispatch, isConnected, liquidityTokenTo.address?.index, liquidityTokenTo.address?.subindex]);

  useEffect(() => {
    dispatch(setLiquidityActiveWindow(LIQUIDITY_WINDOWS.pools));
  }, [dispatch]);
};

export const useSwapInputsHandlers = ({
  isUnstakeMode,
  isFilledPool,
  toPerFromRawAmount,
  fromPerToRawAmount,
  tokenTo,
  exchangeData,
  balanceLp,
  balanceFrom,
  balanceTo,
  setValue,
}) => {
  const handleAddLiquidityAmount = (name, value) => {
    const isFromField = name === LIQUIDITY_FORM_FIELDS.from;
    const coef = isFromField ? toPerFromRawAmount : fromPerToRawAmount;
    const targetField = isFromField ? LIQUIDITY_FORM_FIELDS.to : LIQUIDITY_FORM_FIELDS.from;
    const decimals = isFromField ? CCD_DECIMALS : tokenTo.decimals;
    const targetAmount = toFixed(value * coef, decimals, isFromField ? "up" : "down");

    setValue(targetField, targetAmount, { shouldValidate: true });
  };

  const handleRemoveLiquidityAmount = value => {
    if (!exchangeData) return;

    const coef = getTokenRawAmount(value, CCD_DECIMALS) / exchangeData.lpTokensSupply;
    const tokenDecimals = tokenTo.decimals;
    const targetCcdAmount = getTokenUiAmount(exchangeData.ccdBalance * coef, CCD_DECIMALS);
    const targetTokenAmount = getTokenUiAmount(exchangeData.tokenBalance * coef, tokenDecimals);

    setValue(LIQUIDITY_FORM_FIELDS.from, targetCcdAmount);
    setValue(LIQUIDITY_FORM_FIELDS.to, targetTokenAmount, { shouldValidate: true });
  };

  const onAddLiquidityInput = event => {
    const value = event.target?.value?.trim();
    const name = event.target?.name;

    handleAddLiquidityAmount(name, value);
  };

  const onInputLp = event => {
    const value = event.target?.value?.trim();

    handleRemoveLiquidityAmount(value);
  };

  const onMaxLp = () => {
    setValue(LIQUIDITY_FORM_FIELDS.lp, balanceLp, { shouldValidate: true });
    handleRemoveLiquidityAmount(balanceLp);
  };

  const onMaxAddLiquidityInput = name => () => {
    const isFromField = name === LIQUIDITY_FORM_FIELDS.from;
    const balance = isFromField ? getMaxCcdAmount(balanceFrom) : balanceTo;
    setValue(name, balance, { shouldValidate: true });

    if (isFilledPool) handleAddLiquidityAmount(name, balance);
  };

  return {
    onInputTokenPair: isFilledPool && !isUnstakeMode ? onAddLiquidityInput : () => null,
    onMaxTokenPair: !isUnstakeMode ? onMaxAddLiquidityInput : () => null,
    onInputLp,
    onMaxLp,
  };
};
