/* eslint-disable react-hooks/exhaustive-deps */
import PriceCard from "../../components/PriceCard";
import { CriptoSkeleton, DolarSkeleton, BtcSkeleton } from "./Skeletons";

import {
  formatBtcPrice,
  formatDolarPrices,
  formatCriptoPrices,
} from "../../functions";

import { useFetch } from "../../hooks/useFetch";

import "./index.css";

const Dashboard = () => {
  const { data: btcPrice, loading: btcLoading } = useFetch(
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
      <>
        <div className="flex-row justify-between">
          <div className="title">BTC</div>
        </div>
        {!btcLoading ? (
          <div className="list">
            <PriceCard
              name="Binance BTC"
              value={formatBtcPrice(btcPrice.price)}
            />
          </div>
        ) : (
          <BtcSkeleton />
        )}
      </>
      <>
        <div className="flex-row justify-between">
          <div className="title">USDT</div>
        </div>
        {!criptoLoading ? (
          <div className="list">
            {criptoPrices.map(({ name, value }, index) => (
              <PriceCard key={index} name={name} value={value} />
            ))}
          </div>
        ) : (
          <CriptoSkeleton />
        )}
      </>
      <>
        <div className="flex-row justify-between">
          <div className="title">DOLAR</div>
        </div>
        {!dolarLoading ? (
          <div className="list">
            {dolarPrices.map(({ name, value }, index) => (
              <PriceCard key={index} name={`dólar ${name}`} value={value} />
            ))}
          </div>
        ) : (
          <DolarSkeleton />
        )}
      </>
    </div>
  );
};

export default Dashboard;
