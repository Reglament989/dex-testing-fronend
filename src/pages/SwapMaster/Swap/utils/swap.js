// Utils
import { getTokenRawAmount } from "../../../../utils/format";
import { updateContract } from "../../../../models/ConcordiumContractClient";
import { updateOperator } from "../../utils";

// Actions
import { setSwapTokens } from "../../../../store/reducers/SwapMaster/swapSlice";

// Constants
import {
  CCD_DECIMALS,
  MAX_ENERGY,
  PIXPEL_CONTRACT_ADDRESS,
  PIXPEL_SWAP_CONTRACT_INFO,
  PIXPEL_CONTRACT_METHODS,
} from "../../../../config";

export const changeSwapDirection = () => async (dispatch, getState) => {
  const { tokenFrom, tokenTo } = getState().swap;

  dispatch(setSwapTokens({ tokenFrom: tokenTo, tokenTo: tokenFrom }));
};

const swapTokenToCcd = async ({ tokenData, amountFrom, amountTo, provider, account }) => {
  const { address, decimals, tokenId } = tokenData;

  await updateOperator({ provider, account, tokenAddress: address });

  return updateContract(
    provider,
    PIXPEL_SWAP_CONTRACT_INFO,
    {
      token: { address, id: tokenId },
      token_sold: String(getTokenRawAmount(amountFrom, decimals)),
      min_ccd_amount: String(getTokenRawAmount(amountTo, CCD_DECIMALS)),
    },
    account,
    PIXPEL_CONTRACT_ADDRESS,
    PIXPEL_CONTRACT_METHODS.tokenToCcdSwap,
    MAX_ENERGY,
  );
};

const swapCcdToToken = async ({ tokenData, amountFrom, amountTo, provider, account }) => {
  const { address, decimals, tokenId } = tokenData;

  return updateContract(
    provider,
    PIXPEL_SWAP_CONTRACT_INFO,
    {
      token: { address, id: tokenId },
      min_token_amount: String(getTokenRawAmount(amountTo, decimals)),
    },
    account,
    PIXPEL_CONTRACT_ADDRESS,
    PIXPEL_CONTRACT_METHODS.ccdToTokenSwap,
    MAX_ENERGY,
    amountFrom,
  );
};

const swapTokenToToken = async ({
  tokenFrom,
  tokenTo,
  amountFrom,
  amountTo,
  provider,
  account,
}) => {
  await updateOperator({ provider, account, tokenAddress: tokenFrom.address });

  return updateContract(
    provider,
    PIXPEL_SWAP_CONTRACT_INFO,
    {
      token: { address: tokenFrom.address, id: tokenFrom.tokenId },
      purchased_token: { address: tokenTo.address, id: tokenTo.tokenId },
      token_sold: String(getTokenRawAmount(amountFrom, tokenFrom.decimals)),
      min_purchased_token_amount: String(getTokenRawAmount(amountTo, tokenTo.decimals)),
    },
    account,
    PIXPEL_CONTRACT_ADDRESS,
    PIXPEL_CONTRACT_METHODS.tokenToTokenSwap,
    MAX_ENERGY,
  );
};

export const handleSwap =
  ({ amountFrom, amountTo }) =>
  (dispatch, getState) => {
    const account = getState().connect.account;
    const provider = getState().connect.provider;

    if (!account || !provider) return;

    const { tokenFrom, tokenTo } = getState().swap;

    switch (true) {
      case Boolean(tokenFrom.address && !tokenTo.address): {
        return swapTokenToCcd({
          tokenData: tokenFrom,
          amountFrom,
          amountTo,
          provider,
          account,
        });
      }

      case Boolean(!tokenFrom.address && tokenTo.address): {
        return swapCcdToToken({
          tokenData: tokenTo,
          amountFrom,
          amountTo,
          provider,
          account,
        });
      }

      case Boolean(tokenFrom.address && tokenTo.address): {
        return swapTokenToToken({
          tokenFrom,
          tokenTo,
          amountFrom,
          amountTo,
          provider,
          account,
        });
      }
    }
  };
