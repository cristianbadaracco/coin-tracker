import { formatCriptoPrices, formatDolarPrices } from "../functions";

export const fetchDolarPrices = async () => {
  try {
    const response = await fetch("https://criptoya.com/api/dolar");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const json = await response.json();
    return formatDolarPrices(json);
  } catch (error) {
    console.log("Fetch dolar price failed: " + error);
  }
};

export const fetchBtcPrice = async () => {
  try {
    const response = await fetch(
      "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const { price } = await response.json();
    return parseFloat(price).toFixed(2);
  } catch (error) {
    console.log("Fetch btc price failed: " + error);
  }
};

export const fetchCriptoPrices = async () => {
  try {
    const response = await fetch("https://criptoya.com/api/usdt/ars/0.1");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const json = await response.json();
    return formatCriptoPrices(json);
  } catch (error) {
    console.log("Fetch cripto price failed: " + error);
  }
};
