// src/hooks/useQrScanner.ts
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  openScanner,
  setScanResult,
  setScanState
} from '@/redux/slices/qrScanner.slice';
import type { RootState } from '@/redux/store';
import { Camera } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';

type Opts = {
  cooldownMs?: number;
};

export function useQrScanner(opts: Opts = {}) {
  const { cooldownMs = 900 } = opts;

  const dispatch = useAppDispatch();
  const { visible, state, lastResult } = useAppSelector(
    (s: RootState) => s.qrScanner
  );

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [torchEnabled, setTorchEnabled] = useState(false);

  const lastScanAtRef = useRef<number>(0);

  const requestPermission = useCallback(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const granted = status === 'granted';
    setHasPermission(granted);

    if (granted) {
      dispatch(openScanner());
    } else {
      dispatch(setScanState('denied'));
    }

    return granted;
  }, [dispatch]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const handleScan = useCallback(
    ({ data }: { data: string }) => {
      if (state !== 'scanning') return;

      const now = Date.now();
      if (now - lastScanAtRef.current < cooldownMs) return;
      lastScanAtRef.current = now;

      dispatch(setScanResult(data));
    },
    [state, cooldownMs, dispatch]
  );

  const requestAgain = useCallback(async () => {
    await requestPermission();
  }, [requestPermission]);

  const reset = useCallback(() => {
    lastScanAtRef.current = 0;
    if (hasPermission) {
      dispatch(openScanner());
    } else {
      dispatch(setScanState('denied'));
    }
  }, [dispatch, hasPermission]);

  const pause = useCallback(() => {
    if (state === 'scanning') {
      dispatch(setScanState('idle'));
    }
  }, [dispatch, state]);

  const resume = useCallback(() => {
    if (hasPermission) {
      dispatch(setScanState('scanning'));
    }
  }, [dispatch, hasPermission]);

  const toggleTorch = useCallback(
    () => setTorchEnabled((v) => !v),
    []
  );

  const showCamera =
    hasPermission === true && visible && (state === 'scanning' || state === 'found');

  return {
    hasPermission,
    state,
    lastCode: lastResult,
    showCamera,
    handleScan,
    requestAgain,
    reset,
    torchEnabled,
    toggleTorch,
    pause,
    resume,
  };
}

export default useQrScanner;
