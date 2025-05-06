import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  currencies: []
}

const currenciesSlice = createSlice({
  name: "Store_Currencies",
  initialState,
  reducers: {
    AddCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export const { AddCurrencies, setLoading } = currenciesSlice.actions;

export default currenciesSlice.reducer
