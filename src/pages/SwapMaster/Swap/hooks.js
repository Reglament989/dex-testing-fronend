import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";

// Utils
import { getAmount, getFromPerToAmount, getSwapBalances, getToPerFromAmount } from "./utils";
import { parseTokenAddress } from "../../../utils/format";
import { setSwapTokens } from "../../../store/reducers/SwapMaster/swapSlice";

// Constants
import { SWAP_FORM_FIELDS } from "./constants";

export const useSwapDataUpdate = () => {
  const dispatch = useDispatch();
  const { setValue, watch, getValues, trigger } = useFormContext();

  const isAmountLoading = useRef(false);
  const isBalanceFirstLoading = useRef(true);
  const isConnected = useSelector(s => !!s.connect.account);
  const tokenList = useSelector(s => s.swapMaster.tokenList);
  const exchanges = useSelector(s => s.swapMaster.exchanges);
  const swapTokenFrom = useSelector(s => s.swap.tokenFrom);
  const swapTokenTo = useSelector(s => s.swap.tokenTo);
  const [fromPerToAmount, setFromPerToAmount] = useState(0);
  const [toPerFromAmount, setToPerFromAmount] = useState(0);

  const filteredTokenList = useMemo(
    () =>
      tokenList.filter(({ address }) => {
        const isCCD = !address;

        return (
          isCCD ||
          exchanges.some(exchange => {
            const { index, subindex } = parseTokenAddress(exchange.token.address);
            const isFilledPool = exchange.ccdBalance > 0 && exchange.tokenBalance > 0;

            return address.index === index && address.subindex === subindex && isFilledPool;
          })
        );
      }),
    [exchanges, tokenList],
  );

  useEffect(() => {
    if (filteredTokenList.length < 2) return;

    // set valid pair tokens
    dispatch(setSwapTokens({ tokenFrom: filteredTokenList[0], tokenTo: filteredTokenList[1] }));
  }, [dispatch, filteredTokenList]);

  const handleAmount = useCallback(
    async values => {
      try {
        const targetAmount = await dispatch(getAmount(values.from));
        isAmountLoading.current = false;
        setValue(SWAP_FORM_FIELDS.to, targetAmount, { shouldValidate: true });
      } catch {
        isAmountLoading.current = false;
      }
    },
    [dispatch, setValue],
  );

  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (type === "change") {
        isAmountLoading.current = true;
      }

      if (name === SWAP_FORM_FIELDS.from) {
        handleAmount(values);
      }

      if (!isAmountLoading.current) {
        setFromPerToAmount(getFromPerToAmount(values, swapTokenFrom.decimals));
        setToPerFromAmount(getToPerFromAmount(values, swapTokenTo.decimals));
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch, handleAmount, setValue, swapTokenFrom, swapTokenTo, watch]);

  useEffect(() => {
    // update values when direction changes
    handleAmount(getValues());
  }, [dispatch, getValues, handleAmount, swapTokenFrom, swapTokenTo]);

  useEffect(() => {
    if (!isConnected) return;

    dispatch(getSwapBalances()).then(() => {
      if (!isBalanceFirstLoading.current) {
        trigger();
      } else {
        isBalanceFirstLoading.current = false;
      }
    });
  }, [dispatch, isConnected, swapTokenFrom, swapTokenTo, trigger]);

  return {
    fromPerToAmount,
    toPerFromAmount,
    tokenList: filteredTokenList,
  };
};
