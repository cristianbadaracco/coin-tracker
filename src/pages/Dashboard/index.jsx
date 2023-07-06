import PriceCard from "../../components/PriceCard";
import { CriptoSkeleton, DolarSkeleton, BtcSkeleton } from "./Skeletons";
import { Button } from "@mui/material";

import { useFetchCurrencies } from "../../hooks/useFetchCurrency";

import "./index.css";

const Dashboard = () => {
  const {
    data: currencyPrices,
    loading: currencyLoading,
    fetchData,
  } = useFetchCurrencies();

  return (
    <div>
      <div className="cotizaciones">
        COTIZACIONES (USD){" "}
        <Button
          onClick={fetchData}
          variant="outlined"
          disabled={currencyLoading}
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
        {!currencyLoading ? (
          <div className="list">
            <PriceCard name="Binance BTC" value={currencyPrices["btc"]} />
          </div>
        ) : (
          <BtcSkeleton />
        )}
      </>
      <>
        <div className="flex-row justify-between">
          <div className="title">USDT</div>
        </div>
        {!currencyLoading ? (
          <div className="list">
            {currencyPrices["cripto"]?.map(({ name, value }, index) => (
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
        {!currencyLoading ? (
          <div className="list">
            {currencyPrices["dolar"]?.map(({ name, value }, index) => (
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
