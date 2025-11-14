import type { QrScannerState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: QrScannerState = {
  visible: false,
  state: 'idle',
  lastResult: null,
};

const qrScannerSlice = createSlice({
  name: 'qrScanner',
  initialState,
  reducers: {
    openScanner(state) {
      state.visible = true;
      state.state = 'scanning';
      state.lastResult = null;
    },
    setScanState(state, action: PayloadAction<QrScannerState['state']>) {
      state.state = action.payload;
    },
    closeScanner(state) {
      state.visible = false;
      state.state = 'idle';
    },
    setScanResult(state, action: PayloadAction<string>) {
      state.lastResult = action.payload;
      state.state = 'idle'; // veya 'done'
    },
  },
});

export const { openScanner, closeScanner, setScanResult, setScanState } =
  qrScannerSlice.actions;

export default qrScannerSlice.reducer;
