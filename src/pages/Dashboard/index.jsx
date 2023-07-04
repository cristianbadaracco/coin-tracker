/* eslint-disable react-hooks/exhaustive-deps */
import PriceCard from "../../components/PriceCard";

import {
  formatBtcPrice,
  formatDolarPrices,
  formatCriptoPrices,
} from "../../functions";

import { useFetch } from "../../hooks/useFetch";

import "./index.css";

const Dashboard = () => {
  const { data: btcPrice } = useFetch(
    "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
  );
  const { data: dolarPrices, loading: dolarLoading } = useFetch(
    "https://criptoya.com/api/dolar",
    formatDolarPrices
  );
  const { data: criptoPrices, loading: criptoLoading } = useFetch(
    "https://criptoya.com/api/usdt/ars/0.1",
    formatCriptoPrices
  );

  return (
    <div>
      <div className="cotizaciones">COTIZACIONES (USD)</div>
      {btcPrice ? (
        <>
          <div className="flex-row justify-between">
            <div className="title">BTC</div>
          </div>
          <div className="list">
            <PriceCard
              name="Binance BTC"
              value={formatBtcPrice(btcPrice.price)}
            />
          </div>
        </>
      ) : (
        <div>Loading BTC price...</div>
      )}
      {!criptoLoading ? (
        <>
          <div className="flex-row justify-between">
            <div className="title">USDT</div>
          </div>
          <div className="list">
            {criptoPrices.map(({ name, value }, index) => (
              <PriceCard key={index} name={name} value={value} />
            ))}
          </div>
        </>
      ) : (
        <div>Loading USDT price...</div>
      )}
      {!dolarLoading ? (
        <>
          <div className="flex-row justify-between">
            <div className="title">DOLAR</div>
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
