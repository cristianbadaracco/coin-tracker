import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dolar: ["oficial", "blue", "mep", "ccl", "qatar"],
  cripto: ["buenbit", "lemoncash", "binance"],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    loadAllFilters(state, action) {
      const { values, type } = action.payload;
      state[type] = values;
    },
    clearFilters(state) {
      (state.dolar = []), (state.cripto = []);
    },
    tootleFilter(state, action) {
      const { filters, selectedFilter, type } = action.payload;
      let newFilter = filters;
      if (newFilter.includes(selectedFilter)) {
        newFilter = filters.filter((filter) => filter !== selectedFilter);
      } else {
        newFilter.push(selectedFilter);
      }
      state[type] = newFilter;
    },
  },
});

export const { loadAllFilters, clearFilters, addFilter, removeFilter } =
  filterSlice.actions;
export default filterSlice.reducer;
