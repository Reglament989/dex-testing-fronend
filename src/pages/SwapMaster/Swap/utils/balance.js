// Utils
import { getBalance, getCCDBalance } from "../../utils";
import { getTokenUiAmount, toBigIntContractAddress } from "../../../../utils/format";

// Actions
import { setSwapBalances } from "../../../../store/reducers/SwapMaster/swapSlice";

const getBalanceHelper = ({ tokenAddress, tokenId }) => {
  const isCCD = !tokenAddress;

  return isCCD ? getCCDBalance() : getBalance({ tokenAddress, tokenId });
};

export const getSwapBalances = () => async (dispatch, getState) => {
  const tokenFrom = getState().swap.tokenFrom;
  const tokenTo = getState().swap.tokenTo;

  const tokenFromBalance = await dispatch(
    getBalanceHelper({
      tokenAddress: tokenFrom.address && toBigIntContractAddress(tokenFrom.address),
      tokenId: tokenFrom.tokenId,
    }),
  );

  const tokenToBalance = await dispatch(
    getBalanceHelper({
      tokenAddress: tokenTo.address && toBigIntContractAddress(tokenTo.address),
      tokenId: tokenTo.tokenId,
    }),
  );

  dispatch(
    setSwapBalances({
      balanceFrom: getTokenUiAmount(tokenFromBalance?.toString(), tokenFrom.decimals),
      balanceTo: getTokenUiAmount(tokenToBalance?.toString(), tokenTo.decimals),
    }),
  );
};
