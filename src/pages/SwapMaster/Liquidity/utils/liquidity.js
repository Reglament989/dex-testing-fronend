// Utils
import { updateContract } from "../../../../models/ConcordiumContractClient";
import {
  getTokenRawAmount,
  getTokenUiAmount,
  toBigIntContractAddress,
} from "../../../../utils/format";
import {
  getBalance,
  getCCDBalance,
  updateOperator,
  getCurrentExchange,
  getExchanges,
} from "../../utils";

// Actions
import { setLiquidityBalances } from "../../../../store/reducers/SwapMaster/liquiditySlice";

// Constants
import {
  MAX_ENERGY,
  PIXPEL_CONTRACT_ADDRESS,
  PIXPEL_CONTRACT_METHODS,
  PIXPEL_SWAP_CONTRACT_INFO,
} from "../../../../config";
import { CCD_DECIMALS } from "../../../../config";

export const addLiquidity =
  ({ values }) =>
  async (dispatch, getState) => {
    const account = getState().connect.account;
    const provider = getState().connect.provider;
    const tokenTo = getState().liquidity.tokenTo;

    await updateOperator({ provider, account, tokenAddress: tokenTo.address });

    await updateContract(
      provider,
      PIXPEL_SWAP_CONTRACT_INFO,
      {
        token: { address: tokenTo.address, id: tokenTo.tokenId },
        token_amount: String(getTokenRawAmount(values.to, tokenTo.decimals)),
      },
      account,
      PIXPEL_CONTRACT_ADDRESS,
      PIXPEL_CONTRACT_METHODS.addLiquidity,
      MAX_ENERGY,
      values.from,
    );

    await dispatch(getExchanges());

    const exchanges = getState().swapMaster.exchanges;
    const currentExchange = getCurrentExchange(exchanges, tokenTo);
    const lpBalance = currentExchange?.lpTokensHolderBalance;

    return lpBalance ? getTokenUiAmount(lpBalance, CCD_DECIMALS) : 0;
  };

export const removeLiquidity =
  ({ values }) =>
  async (dispatch, getState) => {
    const account = getState().connect.account;
    const provider = getState().connect.provider;
    const tokenTo = getState().liquidity.tokenTo;

    await updateContract(
      provider,
      PIXPEL_SWAP_CONTRACT_INFO,
      {
        token: { address: tokenTo.address, id: tokenTo.tokenId },
        lp_token_amount: String(getTokenRawAmount(values.lp, CCD_DECIMALS)),
      },
      account,
      PIXPEL_CONTRACT_ADDRESS,
      PIXPEL_CONTRACT_METHODS.removeLiquidity,
      MAX_ENERGY,
    );

    await dispatch(getExchanges());

    const exchanges = getState().swapMaster.exchanges;
    const currentExchange = getCurrentExchange(exchanges, tokenTo);
    const lpBalance = currentExchange?.lpTokensHolderBalance;

    return lpBalance ? getTokenUiAmount(lpBalance, CCD_DECIMALS) : 0;
  };

export const getLiquidityBalances = () => async (dispatch, getState) => {
  const tokenList = getState().swapMaster.tokenList;
  const tokenFrom = tokenList[0];
  const tokenTo = getState().liquidity.tokenTo;

  const tokenFromBalance = await dispatch(getCCDBalance());

  const tokenToBalance = await dispatch(
    getBalance({
      tokenAddress: toBigIntContractAddress(tokenTo.address),
      tokenId: tokenTo.tokenId,
    }),
  );

  dispatch(
    setLiquidityBalances({
      balanceFrom: getTokenUiAmount(tokenFromBalance?.toString(), tokenFrom.decimals),
      balanceTo: getTokenUiAmount(tokenToBalance?.toString(), tokenTo.decimals),
    }),
  );
};
