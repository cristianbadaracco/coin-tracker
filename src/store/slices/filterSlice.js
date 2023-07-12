import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  dolar: ["oficial", "blue", "mep", "ccl", "qatar"],
  cripto: ["buenbit", "lemoncash", "binance"],
  allTypesOfDolars: [
    "oficial",
    "solidario",
    "blue",
    "ccb",
    "mep",
    "ccl",
    "mepgd30",
    "cclgd30",
    "blue_bid",
    "qatar",
    "mep_var",
    "ccl_var",
    "ccb_var",
    "blue_var",
    "time",
  ],
  allTypesOfCriptos: [
    "argenbtc",
    "buenbit",
    "ripio",
    "ripioexchange",
    "satoshitango",
    "cryptomkt",
    "decrypto",
    "latamex",
    "bitso",
    "letsbit",
    "fiwind",
    "lemoncash",
    "bitmonedero",
    "belo",
    "tiendacrypto",
    "saldo",
    "kriptonmarket",
    "calypso",
    "bybit",
    "binance",
  ],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    loadData(state, { payload }) {
      state.data = payload;
    },
    loadAllFilters(state, { payload }) {
      const { values, type } = payload;
      state[type] = values;
    },
    clearFilters(state) {
      (state.dolar = []), (state.cripto = []);
    },
    toogleFilter(state, action) {
      const { selectedFilter, type } = action.payload;
      state[type] = selectedFilter;
    },
  },
});

export const { loadAllFilters, clearFilters, toogleFilter, loadData } =
  filterSlice.actions;
export default filterSlice.reducer;
