export type ScanState = 'idle' | 'scanning' | 'found' | 'denied';

export interface QrScannerResult {
  hasPermission: boolean | null;
  state: ScanState;
  lastCode: string | null;
  handleScan: (e: { data: string }) => void;
  requestAgain: () => Promise<void>;
  reset: () => void;
}
