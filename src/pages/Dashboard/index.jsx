import PriceCard from "../../components/PriceCard";
import { CriptoSkeleton, DolarSkeleton, BtcSkeleton } from "./Skeletons";
import { Button } from "@mui/material";

import DolarSelect from "../../components/Select/DolarSelect";

import { useFetchCurrencies } from "../../hooks/useFetchCurrency";

import "./index.css";

const Dashboard = () => {
  const { data: prices, loading, fetchData, date } = useFetchCurrencies();

  return (
    <div>
      <div className="cotizaciones">
        <div>
          COIN TRACKER
          {date && (
            <div className="date">
              {loading ? "Uploading..." : `Last update: ${date}`}
            </div>
          )}
        </div>
        <Button
          onClick={fetchData}
          variant="outlined"
          disabled={loading}
          size="small"
          style={{ color: "white", borderColor: "white" }}
        >
          Refresh
        </Button>
      </div>
      <>
        <div className="flex-row justify-between">
          <div className="title">BTC</div>
        </div>
        {!loading ? (
          <div className="list">
            <PriceCard name="Binance BTC" value={prices["btc"]} />
          </div>
        ) : (
          <BtcSkeleton />
        )}
      </>
      <>
        <div className="flex-row justify-between">
          <div className="title">USDT</div>
        </div>
        {!loading ? (
          <div className="list">
            {prices["cripto"]?.map(({ name, value }, index) => (
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
          <DolarSelect />
        </div>
        {!loading ? (
          <div className="list">
            {prices["dolar"]?.map(({ name, value }, index) => (
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
