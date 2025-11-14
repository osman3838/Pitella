// types/store/qrScanner.ts
import type { ScanState } from '@/types/hooks/qrScannerTypes';

export interface QrScannerState {
  visible: boolean;
  state: ScanState;
  lastResult: string | null;
}
