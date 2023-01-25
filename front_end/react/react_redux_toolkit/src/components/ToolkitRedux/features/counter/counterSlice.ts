import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface CounterState {
  hasInit: boolean;
  value: number;
}

const initialState: CounterState = {
  hasInit: false,
  value: 0,
};

export const asyncInitCounter = createAsyncThunk<number>(
  'counter/initCounter',
  (params, thunksAPI) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(100);
      }, 1000);
    })
);

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented(state) { // immer
      state.value++; // state => { ...state, value: state.value++ }
      // state => state
    },
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    reset(state) {
      state.value = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncInitCounter.pending, (state, action) => {
        console.log(`asyncInitCounter pending`, state, action);
        state.hasInit = false;
      })
      .addCase(asyncInitCounter.fulfilled, (state, action) => {
        console.log(`asyncInitCounter fulfilled`, state, action);
        state.hasInit = true;
        state.value = action.payload;
      });
  },
});

export const { incremented, amountAdded } = counterSlice.actions;
export default counterSlice.reducer;
