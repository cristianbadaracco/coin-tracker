const defaultDolarFilters = ["oficial", "blue", "mep", "ccl", "qatar"];
const defaultCriptoFilters = ["buenbit", "lemoncash", "binance"];

export const formatDolarPrices = (dolarPrices) => {
  let formatedDolarPrices = [];
  for (const [key, value] of Object.entries(dolarPrices)) {
    if (defaultDolarFilters.includes(key)) {
      formatedDolarPrices.push({
        name: key,
        value,
      });
    }
  }
  return formatedDolarPrices;
};

export const formatCriptoPrices = (criptoPrices) => {
  const formatedCriptoPrices = [];
  for (const [key, values] of Object.entries(criptoPrices)) {
    if (defaultCriptoFilters.includes(key)) {
      formatedCriptoPrices.push({ name: key, value: values.totalBid });
    }
  }
  return formatedCriptoPrices;
};
