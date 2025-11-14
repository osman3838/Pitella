// src/hooks/useNearby.ts
import { useGetNearbySitesQuery } from '@/redux/api/otomat.api';
import * as Location from 'expo-location';
import { useEffect, useMemo, useState } from 'react';

export function useNearby(initialMaxKm = 5) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [maxKm, setMaxKm] = useState(initialMaxKm);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      setCoords({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    })();
  }, []);

  const params = useMemo(
    () =>
      coords
        ? { lat: coords.lat, lng: coords.lng, min_distance: 0, max_distance: maxKm }
        : undefined,
    [coords, maxKm]
  );

  const query = useGetNearbySitesQuery(params!, { skip: !params });

  return {
    coords,
    maxKm,
    setMaxKm,
    ...query,
  };
}
