import { useDispatch, useSelector } from "react-redux";

// Components
import { MainButton } from "../../../components/Button/MainButton";

// Utils
import { getTokenUiAmount, parseTokenAddress } from "../../../utils/format";

// Actions
import { setLiquidityTokenTo } from "../../../store/reducers/SwapMaster/liquiditySlice";

// Constants
import { CCD_DECIMALS } from "../../../config";

const LiquidityPools = ({ openLiquidityForm }) => {
  const tokenList = useSelector(s => s.swapMaster.tokenList);
  const exchanges = useSelector(s => s.swapMaster.exchanges);
  const dispatch = useDispatch();

  const handleOpenForm =
    (tokenToData, isUnstakeMode = false) =>
    () => {
      if (tokenToData) dispatch(setLiquidityTokenTo(tokenToData));

      openLiquidityForm({ isUnstakeMode });
    };

  const handleCreateLiquidity = () => {
    const newExchangeTokenToData = tokenList.find(
      ({ address }) =>
        address &&
        exchanges.length &&
        exchanges.every(exchange => {
          const { index, subindex } = parseTokenAddress(exchange.token.address);

          return address.index !== index || address.subindex !== subindex;
        }),
    );

    handleOpenForm(newExchangeTokenToData)();
  };

  const exchangesTable = (
    <div className="flex flex-col mb-5">
      <div className="hidden md1:flex">
        <div className="w-1/3 text-gray-500 text-sm md:text-base">Pair</div>
        <div className="w-1/3 text-gray-500 text-sm md:text-base text-center">LP</div>
      </div>
      {exchanges.map(({ token, lpTokensHolderBalance }, i) => {
        const tokenFrom = tokenList[0];
        const tokenTo = tokenList.find(({ address }) => {
          const { index, subindex } = parseTokenAddress(token.address);

          return address && address.index === index && address.subindex === subindex;
        });

        return (
          <div
            key={i}
            className="flex text-lg border-b-2 border-gray-500 py-4 items-center flex-col md1:flex-row"
          >
            <div className="flex md1:w-1/3 gap-2">
              <img className="h-6" src={tokenFrom.url} alt={tokenFrom.title} />
              <p>{tokenFrom.title}</p>
              <span>/</span>
              <img className="h-6" src={tokenTo.url} alt={tokenTo.title} style={tokenTo.style} />
              <p>{tokenTo.title}</p>
            </div>
            <div className="md1:w-1/3 text-center">
              {getTokenUiAmount(lpTokensHolderBalance, CCD_DECIMALS)}
            </div>
            <div className="flex md1:w-1/3 justify-end">
              <MainButton className="w-28 h-14 bg-app-green mr-8" onClick={handleOpenForm(tokenTo)}>
                Stake
              </MainButton>
              <MainButton className="w-28 h-14 bg-app-red" onClick={handleOpenForm(tokenTo, true)}>
                Unstake
              </MainButton>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col mx-auto my-0 w-184">
      <div className="flex justify-center md1:justify-end">
        <MainButton className="w-28 h-14 bg-app-green" onClick={handleCreateLiquidity}>
          Create
        </MainButton>
      </div>
      {exchanges.length ? exchangesTable : <div className="text-center">No exchanges found</div>}
    </div>
  );
};

export default LiquidityPools;
