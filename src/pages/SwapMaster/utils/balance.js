// Utils
import { invokeContract } from "../../../models/ConcordiumContractClient";

// Constants
import { CIS2_CONTRACT_METHODS, CIS2_MULTI_CONTRACT_INFO } from "../../../config";
import { PixpelSwapDeserializer } from "../../../models/PixpelSwapDeserializer";

/**
 * Gets token balance of an account.
 *
 * @param tokenAddress - index, subindex as bigint
 * @param {string} tokenId Hex encoded Token Id.
 * @returns Balance of the {@link tokenId} Token in CIS2 contract {@link tokenAddress}
 */
export const getBalance =
  ({ tokenAddress, tokenId }) =>
  async (dispatch, getState) => {
    const { account, provider } = getState().connect;

    if (!account || !provider) return;

    const paramsJson = [
      {
        token_id: tokenId,
        address: { Account: [account] },
      },
    ];
    const returnedValue = await invokeContract(
      provider,
      CIS2_MULTI_CONTRACT_INFO,
      tokenAddress,
      CIS2_CONTRACT_METHODS.balanceOf,
      paramsJson,
    );

    return new PixpelSwapDeserializer(returnedValue).readBalanceOf();
  };

export const getCCDBalance = () => async (_, getState) => {
  const { account, provider } = getState().connect;

  if (!account || !provider) return;

  const client = provider.getJsonRpcClient();
  const blockHash = (await client.getConsensusStatus()).bestBlock;

  const accountInfo = await client.getAccountInfo(account, blockHash);

  return accountInfo.accountAmount;
};
