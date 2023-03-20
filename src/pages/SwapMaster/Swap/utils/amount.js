// Utils
import { getTokenRawAmount, getTokenUiAmount, toFixed } from "../../../../utils/format";
import { invokeContract } from "../../../../models/ConcordiumContractClient";
import { PixpelSwapDeserializer } from "../../../../models/PixpelSwapDeserializer";

// constants
import {
  CCD_DECIMALS,
  PIXPEL_CONTRACT_ADDRESS,
  PIXPEL_SWAP_CONTRACT_INFO,
  PIXPEL_CONTRACT_METHODS,
  MAX_CCD_DELTA,
} from "../../../../config";

export const getTokenToCcdSwapAmount = async ({ tokenData, amount }) => {
  const { address, decimals, tokenId } = tokenData;

  const returnedValue = await invokeContract(
    null,
    PIXPEL_SWAP_CONTRACT_INFO,
    PIXPEL_CONTRACT_ADDRESS,
    PIXPEL_CONTRACT_METHODS.tokenToCcdAmount,
    {
      token: { address, id: tokenId },
      token_sold: String(getTokenRawAmount(amount, decimals)),
    },
  );

  const parsedRawAmount = new PixpelSwapDeserializer(returnedValue).readTokenToCcdAmount();

  return getTokenUiAmount(parsedRawAmount, CCD_DECIMALS);
};

export const getCcdToTokenSwapAmount = async ({ tokenData, amount }) => {
  const { address, tokenId, decimals } = tokenData;

  const returnedValue = await invokeContract(
    null,
    PIXPEL_SWAP_CONTRACT_INFO,
    PIXPEL_CONTRACT_ADDRESS,
    PIXPEL_CONTRACT_METHODS.ccdToTokenAmount,
    {
      token: { address, id: tokenId },
      ccd_sold: String(getTokenRawAmount(amount, CCD_DECIMALS)),
    },
  );
  const parsedRawAmount = new PixpelSwapDeserializer(returnedValue).readCcdToTokenAmount();

  return getTokenUiAmount(parsedRawAmount, decimals);
};

export const getTokenToTokenSwapAmount = async ({ tokenFrom, tokenTo, amount }) => {
  const returnedValue = await invokeContract(
    null,
    PIXPEL_SWAP_CONTRACT_INFO,
    PIXPEL_CONTRACT_ADDRESS,
    PIXPEL_CONTRACT_METHODS.tokenToTokenAmount,
    {
      token: { address: tokenFrom.address, id: tokenFrom.tokenId },
      purchased_token: { address: tokenTo.address, id: tokenTo.tokenId },
      token_sold: String(getTokenRawAmount(amount, tokenFrom.decimals)),
    },
  );
  const parsedRawAmount = new PixpelSwapDeserializer(returnedValue).readTokenToTokenAmount();

  return getTokenUiAmount(parsedRawAmount, tokenTo.decimals);
};

export const getAmount = amount => (dispatch, getState) => {
  const { tokenFrom, tokenTo } = getState().swap;

  switch (true) {
    case Boolean(tokenFrom.address && !tokenTo.address): {
      return getTokenToCcdSwapAmount({
        tokenData: tokenFrom,
        amount,
      });
    }

    case Boolean(!tokenFrom.address && tokenTo.address): {
      return getCcdToTokenSwapAmount({
        tokenData: tokenTo,
        amount,
      });
    }

    case Boolean(tokenFrom.address && tokenTo.address): {
      return getTokenToTokenSwapAmount({
        tokenFrom,
        tokenTo,
        amount,
      });
    }

    default:
      return 0;
  }
};

// max value for amount inputs, considering fee etc.
export const getMaxCcdAmount = ccdUiBalance =>
  ccdUiBalance >= MAX_CCD_DELTA ? toFixed(ccdUiBalance - MAX_CCD_DELTA, CCD_DECIMALS) : 0;
