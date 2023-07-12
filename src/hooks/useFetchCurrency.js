/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  formatBtcPrice,
  formatDolarPrices,
  formatCriptoPrices,
  getHourAndMinutes,
} from "../functions";

export const useFetchCurrencies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const { dolar: selectedDolar, cripto: selectedCripto } = useSelector(
    (state) => state.filter
  );

  const formatPrices = (btc, dolar, cripto) => {
    return {
      btc: formatBtcPrice(btc.price),
      dolar: formatDolarPrices(dolar, selectedDolar),
      cripto: formatCriptoPrices(cripto, selectedCripto),
    };
  };

  const fetchData = async () => {
    const urls = [
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT",
      "https://criptoya.com/api/dolar",
      "https://criptoya.com/api/usdt/ars/0.1",
    ];

    setLoading(true);
    const requests = urls.map(async (url) => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    });

    try {
      const [data1, data2, data3] = await Promise.all(requests);
      setDate(getHourAndMinutes(new Date()));
      setData(formatPrices(data1, data2, data3));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedDolar && selectedCripto) {
      fetchData();
    }
  }, [selectedDolar, selectedCripto]);

  return { data, loading, error, fetchData, date };
};
