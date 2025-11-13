// components/Home/MapCard/MapCard.tsx
import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { useNearby } from '@/hooks/useNearby';
import type { NearbySiteDTO } from '@/types/dto/otomat';

export default function MapCard() {
  const { status, coords, radiusKm, sites, isLoading } = useNearby();

  if (status === 'denied') {
    return (
      <View style={[styles.card, styles.center]}>
        <Text style={styles.info}>Konum izni verilmedi.</Text>
      </View>
    );
  }

  if (!coords) {
    return (
      <View style={[styles.card, styles.center]}>
        <ActivityIndicator />
        <Text style={styles.info}>Konum alınıyor...</Text>
      </View>
    );
  }

  const region = useMemo(
    () => ({
      latitude: coords.lat,
      longitude: coords.lng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }),
    [coords]
  );

  const radiusMeters = radiusKm * 1000;

  return (
    <View style={styles.card}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={region}
        initialRegion={region}
      >
        {/* Daire */}
        <Circle
          center={{ latitude: coords.lat, longitude: coords.lng }}
          radius={radiusMeters}
          strokeColor="#FF6B00"
          fillColor="rgba(255,107,0,0.08)"
          strokeWidth={2}
        />

        {/* Kullanıcı noktası */}
        <Marker
          coordinate={{ latitude: coords.lat, longitude: coords.lng }}
          pinColor="#00AEEF"
          title="Sen"
        />

        {/* Yakın otomatlar */}
        {sites.map((s: NearbySiteDTO, idx) => (
          <Marker
            key={s.site_id}
            coordinate={{
              latitude: parseFloat(s.lat),
              longitude: parseFloat(s.lng),
            }}
            pinColor={idx === 0 ? '#FF6B00' : '#A0A0A0'}
            title={s.city ?? 'Otomat'}
            description={s.address}
          />
        ))}
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.title}>
          {sites[0]?.city ?? 'Yakındaki otomatlar'}
        </Text>
        <Text style={styles.status}>
          {isLoading ? 'Otomatlar aranıyor…' : `${sites.length} otomat bulundu`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
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
  overlay: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  status: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
});
