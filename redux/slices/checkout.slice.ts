import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
  name: string;
  price: number;
};

type CheckoutState = {
  code: string;
  product: Product | null;
  loadingPay: boolean;
  loadingTopUp: boolean;
};

const initialState: CheckoutState = {
  code: '',
  product: null,
  loadingPay: false,
  loadingTopUp: false,
};

export const payWithCode = createAsyncThunk(
  'checkout/payWithCode',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { checkout: CheckoutState };
    const { code, product } = state.checkout;

    if (!product) {
      return rejectWithValue('Ürün bulunamadı');
    }

    await new Promise((res) => setTimeout(res, 1000));

    return { success: true };
  }
);

export const topUpBalance = createAsyncThunk(
  'checkout/topUpBalance',
  async () => {
    await new Promise((res) => setTimeout(res, 1000));
    return { success: true };
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },
    setProduct(state, action: PayloadAction<Product | null>) {
      state.product = action.payload;
    },
    resetCheckout(state) {
      state.code = '';
      state.product = null;
      state.loadingPay = false;
      state.loadingTopUp = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(payWithCode.pending, (state) => {
        state.loadingPay = true;
      })
      .addCase(payWithCode.fulfilled, (state) => {
        state.loadingPay = false;
      })
      .addCase(payWithCode.rejected, (state) => {
        state.loadingPay = false;
      })
      .addCase(topUpBalance.pending, (state) => {
        state.loadingTopUp = true;
      })
      .addCase(topUpBalance.fulfilled, (state) => {
        state.loadingTopUp = false;
      })
      .addCase(topUpBalance.rejected, (state) => {
        state.loadingTopUp = false;
      });
  },
});

export const { setCode, setProduct, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
