import { useState, useEffect } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

import {
  formatBtcPrice,
  formatDolarPrices,
  formatCriptoPrices,
} from "../functions";

export const useFetchCurrencies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { dolar: selectedDolar, cripto: selectedCripto } = useSelector(
    (state) => state.filter
  );

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
      setData({
        btc: formatBtcPrice(data1?.price),
        dolar: formatDolarPrices(data2, selectedDolar),
        cripto: formatCriptoPrices(data3, selectedCripto),
      });
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData };
};
