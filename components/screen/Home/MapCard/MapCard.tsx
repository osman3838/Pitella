// src/components/pages/automat/MapCard.tsx
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
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

  // ---------------------------------------------------------------------------
  // KONUM LABEL'LERİ (şehir / ilçe / mahalle)
  // ---------------------------------------------------------------------------
  const { regionLabel, subRegionLabel } = useLocationLabels(coords, {
    apiKey: GOOGLE_MAPS_API_KEY,
    language: 'tr',
    fallbackLabel: 'Konumun çevresi',
  });

  // ---------------------------------------------------------------------------
  // DURUM METNİ
  // ---------------------------------------------------------------------------
  const statusText = useMemo(() => {
    if (!coords) return 'Konum alınıyor…';
    if (error) return 'Bir hata oluştu.';
    if (isLoading || isFetching) return 'Otomatlar aranıyor…';
    if (sites.length > 0) return `${sites.length} otomat bulundu`;
    return 'Yakında otomat bulunamadı';
  }, [coords, error, isLoading, isFetching, sites.length]);

  // ---------------------------------------------------------------------------
  // SLIDER PROGRESS
  // ---------------------------------------------------------------------------
  const progress = useMemo(() => {
    const span = MAX_RADIUS_KM - MIN_RADIUS_KM;
    if (span <= 0) return 0;

    const p = (maxKm - MIN_RADIUS_KM) / span;
    return Math.min(Math.max(p, 0), 1);
  }, [maxKm]);

  // ---------------------------------------------------------------------------
  // LOADING STATE (KOORDİNAT YOKKEN)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // SLIDER CLICK EVENT
  // ---------------------------------------------------------------------------
  const handleTrackPress = (e: any) => {
    const { locationX, width } = e.nativeEvent;
    if (!width) return;

    const ratio = Math.min(Math.max(locationX / width, 0), 1);
    const nextKm = MIN_RADIUS_KM + ratio * (MAX_RADIUS_KM - MIN_RADIUS_KM);

    setMaxKm(Math.round(nextKm));
  };

  // ---------------------------------------------------------------------------
  // DATA → MARKERS
  // ---------------------------------------------------------------------------
  const markers: RadiusMarker[] = sites.map((s, index) => ({
    id: s.site_id,
    lat: parseFloat(s.lat),
    lng: parseFloat(s.lng),
    title: s.city ?? 'Otomat',
    description: s.address ?? undefined,
    isActive: index === 0,
  }));

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <View style={styles.wrapper}>
      {/* HARİTA KARTI --------------------------------------------------------- */}
      <View style={styles.card}>
        <RadiusMap
          coords={coords}
          radiusKm={maxKm}
          markers={markers}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.cityWrapper}>
          <Text style={styles.city}>{regionLabel}</Text>
          {subRegionLabel && (
            <Text style={styles.subCity}>{subRegionLabel}</Text>
          )}
        </View>

        <Text style={styles.status}>{statusText}</Text>
      </View>

      {/* SLIDER -------------------------------------------------------------- */}
      <View style={styles.progressRow}>
        <Text style={styles.kmLabel}>{MIN_RADIUS_KM} km</Text>

        <View style={styles.progressBox}>
          <Pressable style={styles.track} onPress={handleTrackPress}>
            <View style={[styles.trackFill, { flex: progress }]} />
            <View style={{ flex: 1 - progress }} />
          </Pressable>

          <Text style={styles.progressText}>{maxKm} km</Text>
        </View>

        <Text style={styles.kmLabel}>{MAX_RADIUS_KM} km</Text>
      </View>

      {/* LİSTE --------------------------------------------------------------- */}
      <ScrollView style={styles.list} contentContainerStyle={{ gap: 6 }}>
        <NearbyList sites={sites} />
      </ScrollView>
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
    height: 180,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 10,
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
    bottom: 8,
    left: 8,
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  kmLabel: {
    width: 40,
    textAlign: 'center',
    fontSize: 12,
    color: '#444',
  },

  progressBox: { flex: 1 },

  track: {
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  trackFill: {
    backgroundColor: '#FF6B00',
  },

  progressText: {
    marginTop: 4,
    fontSize: 11,
    textAlign: 'center',
  },

  list: { maxHeight: 220 },
});
