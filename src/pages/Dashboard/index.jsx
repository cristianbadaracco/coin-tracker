/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import PriceCard from "../../components/PriceCard";

import {
  fetchCriptoPrices,
  fetchDolarPrices,
  fetchBtcPrice,
} from "../../services/fetchData";

import "./index.css";
import "../../index.css";

const Dashboard = () => {
  const [dolarPrices, setDolarPrices] = useState([]);
  const [criptoPrices, setCriptoPrices] = useState([]);
  const [btcPrice, setBtcPrice] = useState(null);

  useEffect(() => {
    fetchDolarPrices().then((dolarPrices) => setDolarPrices(dolarPrices));
    fetchCriptoPrices().then((criptoPrices) => setCriptoPrices(criptoPrices));
    fetchBtcPrice().then((btcPrice) => setBtcPrice(btcPrice));
  }, []);

  return (
    <div>
      <h1>COTIZACIONES (USD)</h1>
      {btcPrice ? (
        <>
          <h2>BTC</h2>
          <div className="list">
            <PriceCard name="Binance BTC" value={btcPrice} />
          </div>
        </>
      ) : (
        <div>Loading BTC price...</div>
      )}
      {dolarPrices.length ? (
        <>
          <h2>USDT</h2>
          <div className="list">
            {criptoPrices.map(({ name, value }, index) => (
              <PriceCard key={index} name={name} value={value} />
            ))}
          </div>
        </>
      ) : (
        <div>Loading USDT price...</div>
      )}
      {criptoPrices.length ? (
        <>
          <div className="flex-row justify-between">
            <h2>DOLAR</h2>
          </div>
          <div className="list">
            {dolarPrices.map(({ name, value }, index) => (
              <PriceCard key={index} name={`dólar ${name}`} value={value} />
            ))}
          </div>
        </>
      ) : (
        <div>Loading Dolar price... </div>
      )}
    </div>
  );
};

export default Dashboard;
