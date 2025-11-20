import { useNearbyStatus } from '@/hooks/useNearbyStatus';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';


import { useNearby } from '@/hooks/useNearby';
import type { NearbySiteDTO } from '@/types/dto/otomat';

import NearbyList from '@/components/common/lists/NearbyList';
import { RadiusMap } from '@/components/common/maps/RadiusMap';
import { useLocationLabels } from '@/hooks/useLocationLabels';
import type { RadiusMarker } from '@/types';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCzj-3xo-m1JYvyB63JTOcX1ZQi5iwWtf8';

const MIN_RADIUS_KM = 1;
const MAX_RADIUS_KM = 10;

export default function MapCard() {
  const { coords, maxKm, setMaxKm, data, isLoading, isFetching, error } =
    useNearby();

  const sites = (data ?? []) as NearbySiteDTO[];

  const { regionLabel, subRegionLabel } = useLocationLabels(coords, {
    apiKey: GOOGLE_MAPS_API_KEY,
    language: 'tr',
    fallbackLabel: 'Konumun çevresi',
  });

  const statusText = useNearbyStatus({
    coords,
    error,
    isLoading,
    isFetching,
    count: sites.length,
  });

  if (!coords) {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.card, styles.center]}>
          <ActivityIndicator size="large" />
          <Text style={styles.info}>{statusText}</Text>
        </View>
      </View>
    );
  }

  const markers: RadiusMarker[] = sites.map((s, index) => ({
    id: s.site_id,
    lat: parseFloat(s.lat),
    lng: parseFloat(s.lng),
    title: s.city ?? 'Otomat',
    description: s.address ?? undefined,
    isActive: index === 0,
  }));

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <RadiusMap
          coords={coords}
          radiusKm={maxKm}
          markers={markers}
          minRadiusKm={MIN_RADIUS_KM}
          maxRadiusKm={MAX_RADIUS_KM}
          onRadiusChange={setMaxKm}
        />

        <View style={styles.cityWrapper}>
          <Text style={styles.city}>{regionLabel}</Text>
          {subRegionLabel && (
            <Text style={styles.subCity}>{subRegionLabel}</Text>
          )}
        </View>

        <Text style={styles.status}>{statusText}</Text>
      </View>

      <NearbyList sites={sites} />
    </View>
  );
}

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
  },

  card: {
    // height: 0,  ← bunu yaparsan hiçbir şey göremezsin, kaldırıyoruz
    borderRadius: 16,
    marginBottom: 10,
    position: 'relative',
    backgroundColor: 'transparent', // arkaplanı kaldırdın
    overflow: 'visible',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    marginTop: 8,
    fontSize: 13,
    color: '#333',
  },

  cityWrapper: {
    position: 'absolute',
    top: 8,
    left: 8,
  },

  city: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000',
  },

  subCity: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '500',
    color: '#333',
  },

  status: {
    position: 'absolute',
    left: 0,
    bottom: 65,
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
