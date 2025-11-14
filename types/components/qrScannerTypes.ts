// src/types/components/ScanBox.ts

import type { ScanState } from '@/types/hooks/qrScannerTypes';

export type ScanEvent = {
  data: string;
};

export type ScanBoxProps = {
  showCamera: boolean;
  state: ScanState;
  onScan: (e: ScanEvent) => void;
  onClose: () => void;
  hasPermission: boolean | null;
};
