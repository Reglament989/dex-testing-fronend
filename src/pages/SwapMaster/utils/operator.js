// Utils
import { invokeContract, updateContract } from "../../../models/ConcordiumContractClient";
import { toBigIntContractAddress, toParamContractAddress } from "../../../utils/format";
import { PixpelSwapDeserializer } from "../../../models/PixpelSwapDeserializer";

// Constants
import {
  CIS2_CONTRACT_METHODS,
  CIS2_MULTI_CONTRACT_INFO,
  PIXPEL_CONTRACT_ADDRESS,
  PIXPEL_CONTRACT_METHODS,
} from "../../../config";

/**
 *
 * @param provider Provider
 * @param {string} account
 * @param {Object} tokenAddress Token Address.
 * @param  {number}  tokenAddress.index    Token Address index
 * @param  {number}  tokenAddress.subindex    Token Address subindex
 * @param {Object} contractAddress Contract Address.
 * @param  {bigint}  contractAddress.index    Contract Address index
 * @param  {bigint}  contractAddress.subindex    Contract Address subindex
 */
export const updateOperator = async ({
  provider,
  account,
  tokenAddress,
  contractAddress = PIXPEL_CONTRACT_ADDRESS,
}) => {
  const returnedValue = await invokeContract(
    provider,
    CIS2_MULTI_CONTRACT_INFO,
    toBigIntContractAddress(tokenAddress),
    PIXPEL_CONTRACT_METHODS.operatorOf,
    [
      {
        owner: {
          Account: [account],
        },
        address: {
          Contract: [toParamContractAddress(contractAddress)],
        },
      },
    ],
  );

  const isOperator = new PixpelSwapDeserializer(returnedValue).readOperatorOf();

  if (isOperator) return;

  await updateContract(
    provider,
    CIS2_MULTI_CONTRACT_INFO,
    [
      {
        operator: {
          Contract: [toParamContractAddress(contractAddress)],
        },
        update: { Add: [] },
      },
    ],
    account,
    toBigIntContractAddress(tokenAddress),
    CIS2_CONTRACT_METHODS.updateOperator,
  );
};
