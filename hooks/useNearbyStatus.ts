import { useMemo } from 'react';

type StatusArgs = {
  coords: { lat: number; lng: number } | null;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  count: number;
};

export function useNearbyStatus({
  coords,
  error,
  isLoading,
  isFetching,
  count,
}: StatusArgs) {
  return useMemo(() => {
    if (!coords) return 'Konum alınıyor…';
    if (error) return 'Bir hata oluştu.';
    if (isLoading || isFetching) return 'Otomatlar aranıyor…';
    if (count > 0) return `${count} otomat bulundu`;
    return 'Yakında otomat bulunamadı';
  }, [coords, error, isLoading, isFetching, count]);
}
