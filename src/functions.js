export const formatDolarPrices = (dolarPrices, defaultDolarFilters) => {
  let formatedDolarPrices = [];
  for (const [key, value] of Object.entries(dolarPrices)) {
    if (defaultDolarFilters && defaultDolarFilters.includes(key)) {
      formatedDolarPrices.push({
        name: key,
        value,
      });
    }
  }
  return formatedDolarPrices;
};

export const formatCriptoPrices = (criptoPrices, defaultCriptoFilters = []) => {
  const formatedCriptoPrices = [];
  for (const [key, values] of Object.entries(criptoPrices)) {
    if (defaultCriptoFilters && defaultCriptoFilters.includes(key)) {
      formatedCriptoPrices.push({ name: key, value: values.totalBid });
    }
  }
  return formatedCriptoPrices;
};

export const formatBtcPrice = (btcPrice) => parseFloat(btcPrice).toFixed(2);

export const getHourAndMinutes = (date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
