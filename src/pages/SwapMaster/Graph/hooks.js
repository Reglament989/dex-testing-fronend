import { useCallback, useEffect, useMemo, useState } from "react";
import { getChartData } from "./utils/chartData";
import { toFixed } from "../../../utils/format";

export const useChartData = ({ tokenFrom, tokenTo, period }) => {
  const [chartData, setChartData] = useState([]);

  const handleChartDataUpdate = useCallback(async () => {
    const data = await getChartData({ tokenFrom, tokenTo, period: period.name });

    setChartData(data);
  }, [period, tokenFrom, tokenTo]);

  useEffect(() => {
    handleChartDataUpdate();
  }, [handleChartDataUpdate]);

  const percentDifference = useMemo(() => {
    if (chartData.length < 2) return 0;

    const firstItemRate = Number(chartData[0].exchangeRate);
    const lastItemRate = Number(chartData[chartData.length - 1].exchangeRate);

    return toFixed(((lastItemRate - firstItemRate) / firstItemRate) * 100, 2);
  }, [chartData]);

  return {
    chartData,
    percentDifference,
  };
};
