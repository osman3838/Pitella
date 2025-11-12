// src/hooks/useQrScanner.ts
import type { ScanState } from '@/types';
import { Camera } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';

type Opts = {
  cooldownMs?: number;   // aynı kodun tekrar tetiklenmesini engellemek için
};

export function useQrScanner(opts: Opts = {}) {
  const { cooldownMs = 900 } = opts;

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [state, setState] = useState<ScanState>('idle');
  const [lastCode, setLastCode] = useState<string | null>(null);

  // opsiyonel: torch kontrolü (CameraView'de kullanacaksın)
  const [torchEnabled, setTorchEnabled] = useState(false);

  // debounce için zaman damgası
  const lastScanAtRef = useRef<number>(0);

  // izin iste
  const requestPermission = useCallback(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const granted = status === 'granted';
    setHasPermission(granted);
    setState(granted ? 'scanning' : 'denied');
    return granted;
  }, []);

  useEffect(() => {
    // ilk açılışta izin iste
    requestPermission();
  }, [requestPermission]);

  // pay.tsx / ScanBox -> onBarcodeScanned: ({ data }) => handleScan({ data })
  const handleScan = useCallback(
    ({ data }: { data: string }) => {
      if (state !== 'scanning') return;

      const now = Date.now();
      if (now - lastScanAtRef.current < cooldownMs) return;
      lastScanAtRef.current = now;

      setLastCode(data);
      setState('found'); // burada navigate / API çağrını yap
    },
    [state, cooldownMs]
  );

  // kullanıcı tekrar izin vermek isterse
  const requestAgain = useCallback(async () => {
    await requestPermission();
  }, [requestPermission]);

  // taramayı yeniden başlat
  const reset = useCallback(() => {
    setLastCode(null);
    setState(hasPermission ? 'scanning' : 'denied');
    lastScanAtRef.current = 0;
  }, [hasPermission]);

  // manuel kontrol: durdur/başlat
  const pause = useCallback(() => setState(prev => (prev === 'scanning' ? 'idle' : prev)), []);
  const resume = useCallback(() => setState(prev => (hasPermission ? 'scanning' : prev)), [hasPermission]);

  // torch toggler
  const toggleTorch = useCallback(() => setTorchEnabled(v => !v), []);

  return {
    // mevcut dönenler
    hasPermission,
    state,
    lastCode,
    handleScan,
    requestAgain,
    reset,

    // ek kontroller
    torchEnabled,
    toggleTorch,
    pause,
    resume,
  };
}

export default useQrScanner;
