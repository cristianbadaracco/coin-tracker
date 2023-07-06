/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

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
    "https://criptoya.com/api/dolar"
  );
  const { data: criptoPrices, loading: criptoLoading } = useFetch(
    "https://criptoya.com/api/usdt/ars/0.1"
  );

  const [formatedDolar, setFormatedDolar] = useState([]);
  const [formatedCripto, setFormatedCripto] = useState([]);
  const [formatedBtc, setFormatedBtc] = useState("");
  const { dolar: selectedDolar, cripto: selectedCripto } = useSelector(
    (state) => state.filter
  );

  useEffect(() => {
    if (btcPrice) {
      setFormatedBtc(formatBtcPrice(btcPrice?.price));
    }
  }, [btcPrice]);

  useEffect(() => {
    if (dolarPrices) {
      setFormatedDolar(formatDolarPrices(dolarPrices, selectedDolar));
    }
  }, [dolarPrices]);

  useEffect(() => {
    if (criptoPrices) {
      setFormatedCripto(formatCriptoPrices(criptoPrices, selectedCripto));
    }
  }, [criptoPrices]);

  return (
    <div>
      <div className="cotizaciones">COTIZACIONES (USD)</div>
      <>
        <div className="flex-row justify-between">
          <div className="title">BTC</div>
        </div>
        {!btcLoading ? (
          <div className="list">
            <PriceCard name="Binance BTC" value={formatedBtc} />
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
            {formatedCripto?.map(({ name, value }, index) => (
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
            {formatedDolar?.map(({ name, value }, index) => (
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
